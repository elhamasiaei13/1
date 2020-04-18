import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import Avatar from 'components/common/Avatar';
import {Steps, Row} from 'antd';

@autobind
/**
 *
 */
export default class Stepper extends React.PureComponent {
  static propTypes = {
    current: PropTypes.number,
    status: PropTypes.string,
    size: PropTypes.string,
    direction: PropTypes.string,
    progressDot: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.node,
    ]),
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    priorityKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
    avatarKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
    titleKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
    statusKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
    descriptionKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
    iconKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
    iconLeftKey: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    iconRightKey: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    iconStatusKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
    iconSize: PropTypes.string,
  };

  static defaultProps = {
    current: 0,
    status: 'process',
    size: 'default',
    direction: 'horizontal',
    progressDot: false,
    items: [],
    iconSize: 'tiny',
    priorityKey: '',
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   *
   * @param {string} primaryText
   * @param {string} _text
   * @return {String}
   * @private
   */
  _renderAvatar(primaryText, _text = '') {
    let _avatar = '';

    if (app._.isString(primaryText)) {
      let _texts = primaryText.split(' ');
      _texts.map((_text) => _avatar += (_text.substr(0, 1) + '‌'));
    } else {
      if (_text !== '') {
        _text += ' ';
        _avatar += (_text.substr(0, 1) + '‌');
      }
    }

    return _avatar;
  }

  /**
   *
   * @param {object} item
   * @param {string} key
   * @return {boolean|*}
   * @private
   */
  _renderValue(item, key) {
    if (key) {
      if (Array.isArray(key)) {
        let _return = [];
        for (let i = 0; i < key.length; i++) {
          let _key = key[i].split('.');
          let _item = item;

          _key.map((__key) => {
            if (_item[__key]) {
              _item = _item[__key];
            }
          });

          _return.push((!app._.isObject(_item) || _item['$$typeof']) && _item);
        }
        return _return;
      } else {
        let _key = key.split('.');
        let _item = item;

        _key.map((__key) => {
          if (_item[__key]) {
            _item = _item[__key];
          }
        });

        return (!app._.isObject(_item) || _item['$$typeof']) && _item;
      }
    }
    return '';
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _steps() {
    const {items, priorityKey, avatarKey, titleKey, descriptionKey, iconRightKey, iconKey, iconStatusKey, iconLeftKey, statusKey, iconSize} = this.props;
    let _items = [];
    let __items = [];
    let __conter = [];
    let _title = '';
    let priorityCounter = 0;
    let _priority = '';
    let _iconStatus = '';

    items.map((item) => {
      priorityCounter++;
      _priority = this._renderValue(item, priorityKey);
      if (!_priority) {
        _priority = priorityCounter;
      }
      if (!__items[_priority]) {
        __items[_priority] = [];
      }
      if (__conter[_priority]) {
        __conter[_priority]++;
      } else {
        __conter[_priority] = 1;
      }

      _title = this._renderValue(item, titleKey);
      _iconStatus = this._renderValue(item, iconStatusKey);
      __items[_priority].push(
        <Row
          style={{display: 'flex'}}
          key={`${_title} ${priorityCounter} ${Math.random()}`}
        >
          {
            app._.isString(iconLeftKey) ?
              <Avatar
                src={this._renderValue(item, avatarKey)}
                text={this._renderAvatar(_title, __conter[_priority])}
              /> : this._renderValue(item, iconLeftKey)
          }
          <span
            style={{
              padding: '0px 10px',
            }}
          >
              {titleKey && _title}
            <hr
              style={{
                border: '0px solid #ccc',
                borderBottom: '1px solid #ccc',
              }}
            />
            {descriptionKey && this._renderValue(item, descriptionKey)}
          </span>
          {this._renderValue(item, iconRightKey)}
          {iconStatusKey &&
          <MaterialIcon
            name={
              _iconStatus === 'accepted' ||
              _iconStatus === 'finish' ?
                'check-circle' :
                _iconStatus === 'error' ||
                _iconStatus === 'rejected' ?
                  'close-circle' :
                  'information'
            }
            style={{
              fontSize: '12px', color: (
                _iconStatus === 'accepted' ||
                _iconStatus === 'finish' ?
                  '#00bd1a' : (
                    _iconStatus === 'error' ||
                    _iconStatus === 'rejected' ?
                      '#cc0000' :
                      (_iconStatus === 'process' ?
                        '#ffaa00' :
                        '#cccccc' ))),
            }}/>
          }
        </Row>,
      );
    });
    __items.forEach((element) => {
      _items.push(
        <Steps.Step
          key={`${_title} ${Math.random()}`}
          status={statusKey && this._renderValue(item, statusKey)}
          title={element}
          icon={iconKey && this._renderValue(item, iconKey) && <MaterialIcon name={this._renderValue(item, iconKey)} size={iconSize}/>}
        />,
      );
    });

    return _items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {current, status, size, direction, progressDot} = this.props;

    return (
      <Steps
        className="request-steper"
        current={current}
        status={status}
        size={size}
        direction={direction}
        progressDot={progressDot}
      >
        {this._steps()}
      </Steps>
    );
  }
}
