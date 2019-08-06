let Ajv = require('ajv');
let ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
  jsonPointers: true,
});

module.exports = ajv;
