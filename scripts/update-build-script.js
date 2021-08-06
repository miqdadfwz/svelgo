#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

(function updateBuildScript() {
  try {
    const pkgJsonPath = path.resolve(__dirname, '../package.json');
    const pkgJsonRaw = fs.readFileSync(pkgJsonPath, 'utf-8');
    const pkgJson = JSON.parse(pkgJsonRaw);
    const command = process.argv[2];

    pkgJson.scripts.build = `rimraf dist && ${command} run build:client && ${command} run build:server`;

    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson));
    process.exitCode = 0;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
})();
