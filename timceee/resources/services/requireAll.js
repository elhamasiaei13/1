import _ from 'lodash';

/**
 *
 * @param {*} requireContext
 * @return {{path: String, data: *}}
 * @example
 * let modules = requireAll(require.context('./../lang/', true, /\.json$/));
 * console.log(modules);
 */
export default (requireContext) => {
  return _.sortBy(requireContext.keys().map((key) => ({
    path: key,
    data: requireContext(key),
  })), (o) => o.path.split('/').length);
};
