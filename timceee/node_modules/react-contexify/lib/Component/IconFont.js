'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _cssClasses = require('./../cssClasses');

var _cssClasses2 = _interopRequireDefault(_cssClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconFont = function (_PureComponent) {
  _inherits(IconFont, _PureComponent);

  function IconFont() {
    _classCallCheck(this, IconFont);

    return _possibleConstructorReturn(this, (IconFont.__proto__ || Object.getPrototypeOf(IconFont)).apply(this, arguments));
  }

  _createClass(IconFont, [{
    key: 'render',
    value: function render() {
      var className = (0, _classnames2.default)(_cssClasses2.default.ITEM_ICON, this.props.className);
      var attributes = Object.assign({ className: className }, Object.keys(this.props.style).length > 0 ? { style: this.props.style } : {});

      return _react2.default.createElement(
        'i',
        attributes,
        this.props.children
      );
    }
  }]);

  return IconFont;
}(_react.PureComponent);

IconFont.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.node
};
IconFont.defaultProps = {
  className: '',
  style: {},
  children: ''
};
exports.default = IconFont;