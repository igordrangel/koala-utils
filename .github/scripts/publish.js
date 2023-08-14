const fs = require("fs");
const { execSync } = require("child_process");

execSync(`tsc`, { stdio: "inherit" });

fs.writeFileSync(
  "dist/package.json",
  fs.readFileSync("package.json", { encoding: "utf8" }).toString(),
  "utf8"
);
fs.writeFileSync(
  "dist/README.md",
  fs.readFileSync("README.md").toString(),
  "utf8"
);
fs.writeFileSync("dist/LICENSE", fs.readFileSync("LICENSE").toString(), "utf8");

console.log("Build completed");
