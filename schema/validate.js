// everything's better with a lodash of salt
import _ from 'lodash';

// logging stuff
import StackTrace from 'stacktrace-js';
import Bunyan from 'bunyan';

const Ajv = require('ajv');
const ajv = new Ajv()

function _validate_type(type, data) {
  let v = _.partial(
    ajv.validate,
    (typeof type === 'object')
      ? type
      : { '$ref': 'http://aotds.babyl.ca/schema.json#' + type }
  );

  let res = v(data);

  if (!v(data)) {
    StackTrace.get().then(trace => {
      // first 2 stack items are for
      // _validate_type and validate_type, so
      // not really interesting
      trace.splice(0, 2);

      // filter out library stuff to cut on the noise
      trace = trace.filter(t => ! /node_modules/.test(t.fileName));

      console.log(trace);

      console.log(ajv.errors)
    }
    )
  };

  return data;
}

export default
  function validate_type(type) {

  return input => {
    if (typeof input === 'function') {
      return (...args) =>
        _validate_type(type, input.apply(null, args));
    }

    return _validate_type(type, input);
  };
}
