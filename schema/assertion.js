

var meta = require('../meta.json');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-ajv-json-schema'))
chai.ajv = require('../myProject/customAjvValidator')

describe("Look we can test against a schema", function(){
  it("checks that doAllTheThings() does all the things.", function(){
    const schemasNames = meta.methods.doAllTheThings.resultSchemas;
    const results = doAllTheThings();
    expect(results).to.validWithSchema(schemasNames);
  })
})
