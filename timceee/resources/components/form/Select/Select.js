import React from 'react';
import PropTypes from 'prop-types';
import {Input, Select as SelectInput} from 'antd';

@autobind
/**
 *
 */
export default class Select extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    onChangeSelect: PropTypes.func,
    onChange: PropTypes.func,
    addonAfter: PropTypes.node,
    multiple: PropTypes.bool,
    mode: PropTypes.oneOf([
      'multiple', 'tags', 'combobox',
    ]),
  };
  static defaultProps = {
    onChangeSelect: () => {
    },
    onChange: () => {
    },
  };

  /**
   *
   * @return {String}
   * @private
   */
  get _mode() {
    const {multiple, mode} = this.props;
    let _mode;

    if (mode) {
      _mode = mode;
    } else if (multiple) {
      _mode = 'multiple';
    }

    return _mode;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {name, children, addonAfter, onChangeSelect, onChange, ...rest} = this.props;

    return (
      <div
        id={name}
      >

        <Input.Group compact>

          <SelectInput
            {...rest}
            className="left"
            style={{
              width: 'calc(100% - 50px)',
            }}
            name={name}
            mode={this._mode}
            getPopupContainer={() => document.getElementById(name)}
            onChange={(value) => {
              onChangeSelect(value);
              onChange(value);
            }}
          >
            {children}
          </SelectInput>

          <span
            className="ant-input-group-addon right"
            style={{
              width: 50,
              lineHeight: '19px',
            }}
          >
          {addonAfter}
        </span>

        </Input.Group>

      </div>
    );
  }
}
