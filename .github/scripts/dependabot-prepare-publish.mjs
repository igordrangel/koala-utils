#!/usr/bin/env bun
/**
 * Prepara PRs do Dependabot para publish:
 * - alinha ranges do package.json com versões resolvidas no bun.lock (increase)
 * - espelha peerDependencies.date-holidays com devDependencies
 * - sobe patch acima de BASE_VERSION e do latest no npm (evita colisão entre PRs)
 * - sincroniza APP_VERSION via doc:manifest
 *
 * Env:
 *   BASE_VERSION — versão em main (ex.: 5.0.3). Se ausente, usa só npm/current.
 *   SKIP_VERSION_BUMP — se "1", não altera package.json#version.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const packageJsonPath = path.join(root, "package.json");
const lockPath = path.join(root, "bun.lock");

function parseSemver(version) {
  const match = String(version).match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function cmpSemver(a, b) {
  const left = parseSemver(a);
  const right = parseSemver(b);
  if (!left || !right) return 0;
  if (left.major !== right.major) return left.major - right.major;
  if (left.minor !== right.minor) return left.minor - right.minor;
  return left.patch - right.patch;
}

function resolvedVersionFromLock(lockText, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `"${escaped}":\\s*\\[\\s*"${escaped}@([^"]+)"`,
    "m",
  );
  const match = lockText.match(re);
  return match?.[1] ?? null;
}

function increaseRange(resolved) {
  return `^${resolved}`;
}

function syncSection(section, lockText) {
  if (!section) return false;
  let changed = false;
  for (const name of Object.keys(section)) {
    const resolved = resolvedVersionFromLock(lockText, name);
    if (!resolved) continue;
    const next = increaseRange(resolved);
    if (section[name] !== next) {
      section[name] = next;
      changed = true;
    }
  }
  return changed;
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const lockText = fs.readFileSync(lockPath, "utf8");

let changed = false;
changed =
  syncSection(packageJson.dependencies, lockText) || changed;
changed =
  syncSection(packageJson.devDependencies, lockText) || changed;
changed =
  syncSection(packageJson.peerDependencies, lockText) || changed;

const devHolidays = packageJson.devDependencies?.["date-holidays"];
if (
  packageJson.peerDependencies &&
  typeof devHolidays === "string" &&
  packageJson.peerDependencies["date-holidays"] !== devHolidays
) {
  packageJson.peerDependencies["date-holidays"] = devHolidays;
  changed = true;
}

const skipBump = process.env.SKIP_VERSION_BUMP === "1";
const baseVersion = process.env.BASE_VERSION || null;
const currentVersion = packageJson.version;

async function npmLatestVersion(name) {
  try {
    const url = `https://registry.npmjs.org/${encodeURIComponent(name)}`;
    const response = await fetch(url, {
      headers: { accept: "application/vnd.npm.install-v1+json" },
    });
    if (!response.ok) return null;
    const body = await response.json();
    const version = body?.["dist-tags"]?.latest;
    return parseSemver(version) ? version : null;
  } catch {
    return null;
  }
}

function nextPatchAbove(...versions) {
  let best = null;
  for (const version of versions) {
    if (!version || !parseSemver(version)) continue;
    if (best == null || cmpSemver(version, best) > 0) best = version;
  }
  if (!best) {
    throw new Error("Não foi possível determinar a próxima versão patch");
  }
  const parsed = parseSemver(best);
  return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
}

async function main() {
  if (!skipBump) {
    const npmLatest = await npmLatestVersion(packageJson.name);
    const floorVersions = [baseVersion, npmLatest].filter(Boolean);
    const alreadyAheadOfFloor =
      floorVersions.length > 0 &&
      floorVersions.every((floor) => cmpSemver(currentVersion, floor) > 0);

    if (!alreadyAheadOfFloor) {
      packageJson.version = nextPatchAbove(currentVersion, ...floorVersions);
      changed = true;
      const context = [
        baseVersion ? `base ${baseVersion}` : null,
        npmLatest ? `npm ${npmLatest}` : null,
      ]
        .filter(Boolean)
        .join(", ");
      console.log(
        `version: ${currentVersion} → ${packageJson.version}` +
          (context ? ` (${context})` : ""),
      );
    } else {
      console.log(
        `version: ${currentVersion} já à frente de` +
          (baseVersion ? ` base ${baseVersion}` : "") +
          (npmLatest ? ` npm ${npmLatest}` : "") +
          "; sem novo patch",
      );
    }
  }

  if (changed) {
    fs.writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
      "utf8",
    );
    console.log("package.json atualizado");
  } else {
    console.log("package.json já alinhado");
  }

  const manifest = spawnSync("bun", ["run", "doc:manifest"], {
    cwd: root,
    stdio: "inherit",
  });
  if (manifest.status !== 0) {
    process.exit(manifest.status ?? 1);
  }

  console.log("dependabot-prepare-publish: ok");
}

await main();
