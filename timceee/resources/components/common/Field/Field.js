import React from 'react';
import {Form} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'components/common/MaterialIcon';

@connect((state) => ({
  forms: state.Forms,
}), {}, null, {withRef: true})
@autobind
/**
 *
 * @extends React.PureComponent
 */
export default class Field extends React.PureComponent {
  static propTypes = {
    hint: PropTypes.node,
    label: PropTypes.node,
    forms: PropTypes.object,
    onSubmit: PropTypes.func,
    validate: PropTypes.func,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    component: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    masked: PropTypes.bool,
    children: PropTypes.node,
    parser: PropTypes.func,
  };

  static contextTypes = {
    _form: PropTypes.object,
  };

  static defaultProps = {
    validate: () => true,
    parser: (value) => value,
    editing: false,
    disabled: false,
    required: false,
    masked: false,
  };

  /**
   *
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context) {
    super(props, context);

    if (!context._form) {
      throw new Error('Field must be inside a component decorated with form()');
    }

    this.state = {
      editing: false,
      hovered: false,
      values: {},
      value: props.forms[context._form.name][props.name],
    };
  }

  /**
   *
   */
  componentDidMount() {
    document.addEventListener('click', this._onOutsideClick, false);
  }

  /**
   *
   * @param {Object} nextProps
   * @param {Object} nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
    if (!app._.isEqual(nextProps.forms[nextContext._form.name], this.props.forms[nextContext._form.name])) {
      this.setState({
        values: nextProps.forms[nextContext._form.name],
        value: nextProps.forms[nextContext._form.name][nextProps.name],
      });
    }
  }

  /**
   *
   */
  componentWillUpdate() {
    document.removeEventListener('click', this._onOutsideClick, false);
  }

  /**
   *
   */
  componentDidUpdate() {
    document.addEventListener('click', this._onOutsideClick, false);
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    document.removeEventListener('click', this._onOutsideClick, false);
  }

  /**
   *
   * @param {*} e
   * @private
   */
  _onOutsideClick(e) {
    if (this.state.editing && this._node && !this._node.contains(e.target)) {
      this._onSubmit();
    }
  }

  /**
   *
   * @private
   */
  _onEdit() {
    const {disabled, defaultValue} = this.props;

    if (!this.context._form.disabled && !disabled) {
      this.setState((prevState) => ({
        editing: true,
        hovered: false,
        value: app._.isEmpty(prevState.value) ? defaultValue : prevState.value,
      }));
    }
  }

  /**
   *
   * @param {*} event
   * @private
   */
  _onChange(event) {
    let value;

    try {
      value = event.target.value;
    } catch (err) {
      value = event;
    }

    this.setState({
      value,
    });
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      value: this.state.values[this.props.name],
      editing: false,
    });
  }

  /**
   *
   * @private
   */
  _onSubmit() {
    const {value, values} = this.state;
    const {onSubmit, name} = this.props;
    const {_form} = this.context;
    if (this._valid) {
      if ((!value && !values[name]) || app._.isEqual(value, values[name])) {
        this.setState({
          editing: false,
        });
      } else {
        if (onSubmit) {
          onSubmit(value, (err) => !err && this.setState({editing: false}, () => _form.afterSubmit(name, value)));
        } else {
          _form.onSubmit(name, value, (err) => !err && this.setState({editing: false}, () => _form.afterSubmit(name, value)));
          if (name === 'provinceId') {
            _form.onSubmit('cityId', 0, (err) => !err && this.setState({editing: false}, () => _form.afterSubmit(name, value)));
          }
        }
      }
    }
  }

  /**
   *
   * @return {Boolean}
   * @private
   */
  get _valid() {
    const {value, values, editing} = this.state;
    const {required, validate} = this.props;
    let _valid = true;

    if (editing) {
      if (!value || app._.isEmpty(value)) {
        if (required) {
          _valid = false;
        }
      } else {
        let _validate = validate(value, values);

        if (!(_validate === true || _validate === undefined)) {
          _valid = false;
        }
      }
    }

    return _valid;
  }

  /**
   *
   * @return {String|undefined}
   * @private
   */
  get _error() {
    const {value, values, editing} = this.state;
    const {required, validate} = this.props;
    let _error = undefined;

    if (editing) {
      if (!value || app._.isEmpty(value)) {
        if (required) {
          _error = app.translate('main.required');
        }
      } else {
        _error = validate(value, values);
      }
    }

    return _error;
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _renderEdit() {
    const {value} = this.state;
    const {name, children, ...rest} = this.props;
    const Component = this.props.component;

    return (
      <div
        ref={(input) => this._node = input}
      >
        <Component
          {...app._.omit(rest, ['component', 'validate', 'forms', 'parser', 'editing', 'masked'])}
          name={name}
          value={value}
          onPressEnter={this._onSubmit}
          onChange={this._onChange}
          addonAfter={
            <span>
              <Icon
                name="close"
                size="tiny"
                tooltip={app.translate('main.Cancel')}
                onClick={this._onCancel}
                style={{color: '#f44336'}}
              />
              &nbsp;
              <Icon
                name="content-save"
                size="tiny"
                tooltip={app.translate('main.Submit')}
                onClick={this._onSubmit}
                disabled={!this._valid}
                style={{color: '#009688'}}
              />
            </span>
          }
        >
          {children}
        </Component>
      </div>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _renderView() {
    const {value, hovered} = this.state;
    const {parser, masked, disabled} = this.props;

    return (
      <div
        ref={(input) => this._node = input}
        onMouseOver={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
        onClick={this._onEdit}
        className="ant-form-text"
        style={{
          lineHeight: '20px',
          cursor: this.context._form.disabled || disabled ? 'default' : 'pointer',
        }}
      >

        {this.context._form.masked || masked ? '******' : (!app._.isNumber(value) && app._.isEmpty(value) ? '-' : parser(value))}

        &nbsp;&nbsp;

        {
          hovered && (!this.context._form.disabled && !disabled) &&
          <Icon
            name="pencil"
            tooltip={app.translate('main.Edit')}
            onClick={this._onEdit}
            style={{color: '#2196f3'}}
          />
        }

      </div>
    );
  }

  /**
   *
   * @return {*}
   * @private
   */
  get _validateStatus() {
    const {editing, value} = this.state;
    const {required} = this.props;
    let _status = undefined;

    if (editing) {
      if (!this._valid) {
        _status = 'error';
      } else if (!required && app._.isEmpty(value)) {
        _status = 'warning';
      } else {
        _status = 'success';
      }
    }

    return _status;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {hint, label} = this.props;

    return (
      <Form.Item
        // {...app._.omit(this.props, ['component', 'validate', 'required', 'children'])}
        label={hint ? <span>{label} {hint}</span> : label}
        className="form-item-input"
        required={this.state.editing && this.props.required}
        hasFeedback
        help={this._error}
        validateStatus={this._validateStatus}
        labelCol={{span: 6}}
        wrapperCol={{span: label ? 18 : 24}}
        style={{display: 'flex'}}
      >
        {this.state.editing ? this._renderEdit : this._renderView}
      </Form.Item>
    );
  }
}
