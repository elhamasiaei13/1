'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

function withRequired(fn) {
  fn.isRequired = function (props, propName, componentName) {
    var prop = props[propName];

    if (typeof prop === 'undefined') {
      return new Error('The prop ' + propName + ' is marked as required in \n      ' + componentName + ', but its value is undefined.');
    }

    fn(props, propName, componentName);
  };
  return fn;
}

var childrenOfType = function childrenOfType(type) {
  return withRequired(function (props, propName, componentName) {
    var prop = props[propName];
    var check = null;

    _react.Children.forEach(prop, function (child) {
      // Allow null for conditional rendering: condition && <item>foo</item>
      if (child !== null && child.type !== type) {
        check = new Error(componentName + ' expect children to be of type ' + type);
      }
    });

    return check;
  });
};

exports.default = childrenOfType;