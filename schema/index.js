import Ajv from 'ajv';

const schema = {
  "definitions": {
    "fooSchema": {
      "properties": {
        "foo1": { "type": "number" },
        "foo2": { "type": "boolean" }
      },
      "patternProperties": {
        "foo[A-Z][a-z0-9]*": { "type": "string" }
      }
    },
    "barSchema": {
      "properties": {
        "bar1": { "type": "null" },
        "bar2": { "type": "integer" }
      }
    }
  },
  "allOf": [
    { "$ref": "#/definitions/fooSchema" },
    { "$ref": "#/definitions/barSchema" },
    // {
    //   "properties": {
    //     "foo1": true,
    //     "foo2": true,
    //     "bar1": true,
    //     "bar2": true
    //   },
    //   "patternProperties": {
    //     "foo[A-Z][a-z0-9]*": true
    //   },
    //   "additionalProperties": false
    // }
  ]
}

const ajv = new Ajv();

ajv.addSchema(schema);

module.exports = {
  validateFooBar(obj) {
    if (ajv.validate(obj)) {
      return [];
    }
    return ajv.errors;
  }
}
