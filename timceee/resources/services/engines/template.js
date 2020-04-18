import requireAll from 'services/requireAll';
import _ from 'lodash';

let templates = {};

requireAll(require.context('./../../templates', true, /.+\.template$/)).map((module) => {
  let _templates = templates;

  let _keys = module.path.replace(/(^\.\/|\.template$)/g, '');

  _keys = _keys.split('/');
  _keys = _keys.map((_key) => _.kebabCase(_key));

  let _length = _keys.length;

  _keys.map((_key, index) => {
    if (!_templates[_key]) {
      if (index === _length - 1) {
        _templates[_key] = module.data;
      } else {
        _templates[_key] = {};
      }
    }

    _templates = _templates[_key];
  });
});

const keys = (key) => {
  let result = templates;
  let keys = key.split('.');

  try {
    keys.map((k) => {
      result = result[k];
    });
  } catch (t) {
    result = undefined;
  }

  return result;
};

const params = (string, params) => {
  _.mapKeys(params, (value, key) => {
    string = string.replace(new RegExp('\{\{' + key + '\}\}', 'g'), value);
  });

  return string;
};

const render = (template, values = {}) => {
  let result = keys(template);

  if (result === undefined) {
    return template;
  }

  result = params(result, values);

  return result;
};

export default render;
