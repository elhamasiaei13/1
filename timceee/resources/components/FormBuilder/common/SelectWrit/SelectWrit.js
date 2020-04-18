import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getRequestWrits, emptyRequestWrits} from './Module';
import {Form, Select as SelectInput} from 'antd';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';

@connect((state) => ({
  writs: state.FormBuilder.Common.SelectWrit.writs,
}), {
  getRequestWrits,
  emptyRequestWrits,
})
@autobind
/**
 *
 */
export default class SelectWrit extends React.PureComponent {
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
    inline: PropTypes.bool,
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
    defaultValue: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    positionId: PropTypes.string,
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    style: PropTypes.object,
    getRequestWrits: PropTypes.func,
    emptyRequestWrits: PropTypes.func,
  };

  static defaultProps = {
    inline: false,
    label: undefined,
    validateStatus: undefined,
    required: false,
    input: {
      value: undefined,
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
    defaultActiveFirstOption: true,
    getPopupContainer: () => document.body,
    labelInValue: false,
    notFoundContent: app.translate('main.Not Found'),
    style: {
      width: '100%',
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      writs: [],
    };
  }

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
   */
  componentDidMount() {
    const {getRequestWrits} = this.props;
    getRequestWrits(this.props.positionId, {includes: ['type']}, (r) => {
      this.setState({writs: r});
    });
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.positionId, this.props.positionId)) {
      np.getRequestWrits(np.positionId, {includes: ['type']}, (r) => {
        this.setState({writs: r});
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.emptyRequestWrits();
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
      input, disabled, size, tags, optionFilterProp,
      optionLabelProp, showSearch, defaultActiveFirstOption, dropdownStyle,
      dropdownClassName, getPopupContainer, labelInValue, tokenSeparators,
      combobox, allowClear, key, title, dropdownMatchSelectWidth, placeholder,
      notFoundContent, filterOption, children, defaultValue, style, label,
      required, validateStatus, mode, meta, ...rest
    } = this.props;

    let selectWrites = [];
    app._.map(this.props.writs, (_writs) => {
      //  if (requestUserPosition.user && requestUserPosition.user.profile && positionId.indexOf(requestUserPosition.id) === -1) {
      selectWrites.push(
        <SelectInput.Option
          key={`${uuidv1()}`}
          value={`${_writs && _writs.id}`}
          style={{
            borderBottom: '1px solid #f6f6f6',
          }}
        >
          {_writs.key} - {_writs.type && _writs.type.name} -
          <span dir="ltr">{jMoment(_writs.dateFrom).format('jYYYY-jMM-jDD')} / {jMoment(_writs.dateTo).format('jYYYY-jMM-jDD')}</span>

        </SelectInput.Option>,
      );
      //  }
    });


    return (<Form.Item
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
          mode && (mode === 'multiple' || mode === 'tags') && !Array.isArray(defaultValue) ? [defaultValue] : defaultValue :
          mode && (mode === 'multiple' || mode === 'tags') && !Array.isArray(input.value) ? [input.value] : input.value
        }
        value={mode && (mode === 'multiple' || mode === 'tags') && !Array.isArray(input.value) ? [input.value] : input.value}
        placeholder={placeholder}
        onChange={input.onChange}
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
        {selectWrites}
      </SelectInput>
    </Form.Item>);
  }
}
