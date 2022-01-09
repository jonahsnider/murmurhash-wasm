const fs = require('fs');
const path = require('path');

module.exports = Uint8Array.from(fs.readFileSync(path.join(__dirname, '..', 'wasm', 'mod.wasm')));
