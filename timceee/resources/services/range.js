/**
 *
 * @param {Number} [start=0]
 * @param {Number} [stop=null]
 * @param {Number} [step=1]
 * @return {Array}
 */
export default (start = 0, stop = null, step = 1) => {
  if (!stop) {
    stop = start;
  }

  let length = Math.max(Math.ceil((stop - start) / step), 0);
  let range = [];

  for (let i = 0; i < length; i++, start += step) {
    range.push(start);
  }

  return range;
};
