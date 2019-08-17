const Ajv = require('ajv')

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
  jsonPointers: true
})

require('ajv-errors')(ajv)

module.exports = ajv
