const fs = require("fs");
const { execSync } = require("child_process");
const packageJson = require("../../package.json");

execSync(`tsc`, { stdio: "inherit" });

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.jest;

fs.writeFileSync(
  "dist/package.json",
  JSON.stringify(packageJson, null, 2),
  "utf8"
);
fs.writeFileSync(
  "dist/README.md",
  fs.readFileSync("README.md").toString(),
  "utf8"
);
fs.writeFileSync("dist/LICENSE", fs.readFileSync("LICENSE").toString(), "utf8");

console.log("Build completed");
