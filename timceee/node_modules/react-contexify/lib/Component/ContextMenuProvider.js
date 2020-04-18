'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _eventManager = require('./../util/eventManager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenuProvider = function (_PureComponent) {
  _inherits(ContextMenuProvider, _PureComponent);

  function ContextMenuProvider(props) {
    _classCallCheck(this, ContextMenuProvider);

    var _this = _possibleConstructorReturn(this, (ContextMenuProvider.__proto__ || Object.getPrototypeOf(ContextMenuProvider)).call(this, props));

    _this.handleEvent = function (e) {
      e.preventDefault();
      _eventManager2.default.emit('display::' + _this.props.id, e.nativeEvent, _this.childrenRefs.length === 1 ? _this.childrenRefs[0] : _this.childrenRefs);
    };

    _this.childrenRefs = [];
    return _this;
  }

  _createClass(ContextMenuProvider, [{
    key: 'getChildren',
    value: function getChildren() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          renderTag = _props.renderTag,
          event = _props.event,
          children = _props.children,
          className = _props.className,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ['id', 'renderTag', 'event', 'children', 'className', 'style']);

      // reset refs


      this.childrenRefs = [];
      // use a new ref callback function each time, so that it is guaranteed to be called on each render
      var setChildRef = function setChildRef(ref) {
        return ref === null || _this2.childrenRefs.push(ref);
      };

      return _react.Children.map(this.props.children, function (child) {
        return (0, _react.isValidElement)(child) ? (0, _react.cloneElement)(child, _extends({}, rest, { ref: setChildRef })) : child;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _Object$assign;

      var _props2 = this.props,
          renderTag = _props2.renderTag,
          event = _props2.event,
          className = _props2.className,
          style = _props2.style;

      var attributes = Object.assign({}, (_Object$assign = {}, _defineProperty(_Object$assign, event, this.handleEvent), _defineProperty(_Object$assign, 'className', className), _defineProperty(_Object$assign, 'style', style), _Object$assign));

      return (0, _react.createElement)(renderTag, attributes, this.getChildren());
    }
  }]);

  return ContextMenuProvider;
}(_react.PureComponent);

ContextMenuProvider.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
  renderTag: _propTypes2.default.node,
  event: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
ContextMenuProvider.defaultProps = {
  renderTag: 'div',
  event: 'onContextMenu',
  className: '',
  style: {}
};
exports.default = ContextMenuProvider;