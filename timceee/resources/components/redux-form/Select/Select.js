import React from 'react';
import {Select as SelectInput, Form} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Select extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    required: PropTypes.bool,
    meta: PropTypes.object,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.string,
      PropTypes.node,
    ]),
    size: PropTypes.oneOf([
      'small', 'default', 'large',
    ]),
    disabled: PropTypes.bool,
    mode: PropTypes.oneOf([
      'multiple', 'tags', 'combobox',
    ]),
    multiple: PropTypes.bool,
    tags: PropTypes.bool,
    optionFilterProp: PropTypes.string,
    optionLabelProp: PropTypes.string,
    showSearch: PropTypes.bool,
    defaultActiveFirstOption: PropTypes.bool,
    dropdownStyle: PropTypes.object,
    dropdownClassName: PropTypes.string,
    getPopupContainer: PropTypes.func,
    labelInValue: PropTypes.bool,
    tokenSeparators: PropTypes.array,
    combobox: PropTypes.bool,
    allowClear: PropTypes.bool,
    inline: PropTypes.bool,
    key: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func,
    dropdownMatchSelectWidth: PropTypes.bool,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    notFoundContent: PropTypes.string,
    filterOption: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onSearch: PropTypes.func,
    onChangeSelect: PropTypes.func,
    defaultValue: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    style: PropTypes.object,
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
    input: {
      value: undefined,
    },
    onChangeSelect: () => {
    },
    disabled: false,
    multiple: false,
    tags: false,
    combobox: false,
    allowClear: false,
    filterOption: false,
    dropdownMatchSelectWidth: true,
    optionFilterProp: 'value',
    optionLabelProp: 'children',
    size: 'default',
    showSearch: false,
    inline: false,
    defaultActiveFirstOption: true,
    getPopupContainer: () => document.body,
    labelInValue: false,
    notFoundContent: app.translate('main.Not Found'),
    style: {
      width: '100%',
    },
    onChangeSelect: () => {
    },
  };

  /**
   *
   */
  componentWillMount() {
    super.componentWillMount();

    const {input, defaultValue} = this.props;

    input.onChange(defaultValue);
  }

  /**
   *
   * @return {String}
   * @private
   */
  _getMode() {
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
   * @return {String}
   * @private
   */
  _validateStatus() {
    const {disabled, required, validateStatus, input, meta} = this.props;
    let _status = validateStatus;

    if (!disabled) {
      if (meta.asyncValidating) {
        _status = 'validating';
      } else if (meta.touched) {
        if (meta.error) {
          _status = 'error';
        } else {
          if (!required && app._.isEmpty(input.value)) {
            _status = 'warning';
          } else if (meta.valid) {
            _status = 'success';
          }
        }
      }
    }

    return _status;
  }
  /**
   *
   * @return {Object}
   * @private
   */
  _inline() {
    const {inline} = this.props;

    if (inline) {
      return {
        labelCol: {span: 6},
        wrapperCol: {span: 18},
      };
    }

    return {};
  }
  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, disabled, size, tags, optionFilterProp, onChangeSelect,
      optionLabelProp, showSearch, defaultActiveFirstOption, dropdownStyle,
      dropdownClassName, getPopupContainer, labelInValue, tokenSeparators,
      combobox, allowClear, key, title, dropdownMatchSelectWidth, placeholder,
      notFoundContent, filterOption, children, defaultValue, style, label,
      required, validateStatus, mode, meta, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
        {...this._inline()}
      >
        <SelectInput
          id={input.name}
          name={input.name}
          mode={this._getMode()}
          defaultValue={defaultValue ?
            mode && (mode === 'multiple' || mode === 'tags') && !Array.isArray(defaultValue) ? [defaultValue.toString()] : defaultValue.toString():
            mode && (mode === 'multiple' || mode === 'tags') && !Array.isArray(input.value) ? [input.value.toString()] : input.value.toString()
          }
          value={mode && (mode === 'multiple' || mode === 'tags') && !Array.isArray(input.value) ? [input.value.toString()] : input.value.toString()}
          placeholder={placeholder}
          onChange={(v) => {
            input.onChange(v);
            onChangeSelect(v);
          }}
          optionFilterProp={optionFilterProp}
          optionLabelProp={optionLabelProp}
          defaultActiveFirstOption={defaultActiveFirstOption}
          dropdownStyle={dropdownStyle}
          dropdownClassName={dropdownClassName}
          getPopupContainer={getPopupContainer}
          combobox={combobox}
          filterOption={filterOption}
          notFoundContent={notFoundContent}
          title={title}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
          key={key}
          allowClear={allowClear}
          tokenSeparators={tokenSeparators}
          labelInValue={labelInValue}
          showSearch={showSearch}
          tags={tags}
          disabled={disabled}
          size={size}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          style={style}
          {...rest}
        >
          {children}
        </SelectInput>
      </Form.Item>
    );
  }
}
