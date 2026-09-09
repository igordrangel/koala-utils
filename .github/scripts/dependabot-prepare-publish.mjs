#!/usr/bin/env bun
/**
 * Prepara PRs do Dependabot para publish:
 * - alinha ranges do package.json com versões resolvidas no bun.lock (increase)
 * - espelha peerDependencies.date-holidays com devDependencies
 * - sobe patch se a versão ainda não estiver à frente de BASE_VERSION
 * - sincroniza APP_VERSION via doc:manifest
 *
 * Env:
 *   BASE_VERSION — versão em main (ex.: 5.0.3). Se ausente, sempre sobe patch.
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
const alreadyAhead =
  baseVersion != null && cmpSemver(currentVersion, baseVersion) > 0;

if (!skipBump && !alreadyAhead) {
  const parsed = parseSemver(currentVersion);
  if (!parsed) {
    throw new Error(`Versão inválida em package.json: ${currentVersion}`);
  }
  packageJson.version = `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  changed = true;
  console.log(
    `version: ${currentVersion} → ${packageJson.version}` +
      (baseVersion ? ` (base ${baseVersion})` : ""),
  );
} else if (alreadyAhead) {
  console.log(
    `version: ${currentVersion} já à frente de ${baseVersion}; sem novo patch`,
  );
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
