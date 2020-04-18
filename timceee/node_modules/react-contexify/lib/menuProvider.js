'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (id) {
  return function (TargetComponent) {
    var renderTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'onContextMenu';
    var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    return function (props) {
      return _react2.default.createElement(
        _ContextMenuProvider2.default,
        {
          id: id,
          renderTag: renderTag,
          event: event,
          className: className,
          style: style
        },
        (0, _react.createElement)(TargetComponent, props)
      );
    };
  };
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContextMenuProvider = require('./Component/ContextMenuProvider');

var _ContextMenuProvider2 = _interopRequireDefault(_ContextMenuProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }