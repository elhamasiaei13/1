/**
 *
 * @param {Array} fields
 * @param {Object} values
 * @param {Object} errors
 * @param {RegExp} reg
 * @param {String} errorText
 */
export default (fields, values, errors, reg, errorText) => {
  fields.map((field) => {
    if (values && field && values[field] && !reg.test(values[field])) {
      errors[field] = errorText;
    }
  });
};
