const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const packageJson = require("../../package.json");

execSync(`bunx tsc`, { stdio: "inherit" });

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.jest;

fs.writeFileSync(
  "dist/package.json",
  JSON.stringify(packageJson, null, 2),
  "utf8",
);
fs.writeFileSync(
  "dist/README.md",
  fs.readFileSync("README.md").toString(),
  "utf8",
);
fs.writeFileSync("dist/LICENSE", fs.readFileSync("LICENSE").toString(), "utf8");

const docsSrc = path.join(__dirname, "../../docs");
const docsDest = path.join(__dirname, "../../dist/docs");
if (fs.existsSync(docsSrc)) {
  fs.mkdirSync(docsDest, { recursive: true });
  for (const file of fs.readdirSync(docsSrc)) {
    fs.copyFileSync(path.join(docsSrc, file), path.join(docsDest, file));
  }
}

console.log("Build completed");
