const fs = require('fs-extra');
const path = require('path');

const aliasRoot = [
  'enums', 'operators'
]

aliasRoot.map((alias) => path.resolve(__dirname, `../${alias}`)).forEach((alias) => {
  if (fs.existsSync(alias)) {
    fs.removeSync(alias);
  }
  fs.ensureDirSync(alias);
});

aliasRoot.forEach((alias) => {
  const pkgManifest = {
    "name": `@koalarx/utils/${alias}`,
    "types": `../dist/types/${alias}/index.d.ts`,
    "main": `../dist/cjs/${alias}/index.js`,
    "module": `../dist/esm5/${alias}/index.js`,
    "es2015": `../dist/esm/${alias}/index.js`,
    "sideEffects": false
  };

  fs.writeJSON(path.resolve(__dirname, `../${alias}/package.json`), pkgManifest, { spaces: 2 });
});