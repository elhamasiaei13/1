import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getFamilies, emptyFamilies} from './Module';
import {Form, Col, Row, Radio, Checkbox, Select as SelectInput} from 'antd';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';
import Spin from 'components/common/Spin';

@connect((state) => ({
  position: state.FormBuilder.Common.FamiliesNameModule.position,
}), {
  getFamilies,
  emptyFamilies,
})
@autobind
/**
 *
 */
export default class FamiliesName extends React.PureComponent {
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
        PropTypes.arrayOf(PropTypes.object),
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
    position: PropTypes.object,
    getFamilies: PropTypes.func,
    emptyFamilies: PropTypes.func,
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
      position: {},
      values: props.input && props.input.value && (typeof props.input.value) === 'string' ? JSON.parse(props.input.value) : [],
      enable: this._getEnable(props.input && props.input.value && (typeof props.input.value) === 'string' ? JSON.parse(props.input.value) : []),
      spinning: true,
    };
  }

  /**
   *
   */
  componentWillMount() {
    super.componentWillMount();
  }

  /**
   *
   */
  componentDidMount() {
    const {getFamilies, defaultValue, input} = this.props;
    this.setState({spinning: true}, () => {
      getFamilies(this.props.positionId, {includes: ['user.profile', 'user.families']}, (r) => {
        this.setState({position: r, spinning: false});

        let values = [];

        if (input && input.values && !app._.isEmpty(input.values)) {
          let _values = JSON.parse(input.values);
          let enable = this._getEnable(_values);
          this.setState({values: _values, spinning: false, enable});
          this.props.input.onChange(_values);
        } else {
          if (defaultValue && !app._.isEmpty(defaultValue)) {
            let enable = this._getEnable(defaultValue);
            this.setState({values: defaultValue, spinning: false, enable});
            this.props.input.onChange(defaultValue);
          } else {
            if (r && r.data && r.data.position && app._.isEmpty(this.state.values)) {
              values.push({userId: r.data.position.user.id, familiesId: null, accepted: false});

              if (r.data.position.user && r.data.position.user.families) {
                r.data.position.user.families.map((family) => {
                  values.push({userId: null, familiesId: family.id, accepted: false});
                });
              }
              this.setState({values, enable: false, spinning: false});
              this.props.input.onChange(values);
            }
          }
        }
      });
    });
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.positionId, this.props.positionId)) {
      this.setState({spinning: true}, () => {
        np.getFamilies(np.positionId, {includes: ['user.profile', 'user.families']}, (r) => {
          this.setState({position: r, spinning: false});
          let values = [];
          if (np.input && np.input.values && !app._.isEmpty(np.input.values)) {
            let _values = JSON.parse(np.input.values);
            let enable = this._getEnable(_values);
            this.setState({values: _values, spinning: false, enable});
            this.props.input.onChange(_values);
          } else {
            if (r && r.data && r.data.position) {
              values.push({userId: r.user.id, familiesId: null, accepted: false});

              if (r.data.position.user && r.data.position.user.families) {
                r.data.position.user.families.map((family) => {
                  values.push({userId: null, familiesId: family.id, accepted: false});
                });
              }
              this.setState({values, enable: false, spinning: false});
              np.input.onChange(values);
            }
          }
        });
      });
    }
    // if (!app._.isEqual(np.position, this.props.position)) {
    //   let values = [];
    //
    //   values.push({userId: np.position.user.id, familiesId: null, accepted: false});
    //   if (np.position.user && np.position.user.families) {
    //     np.position.user.families.map((family) => {
    //       values.push({userId: null, familiesId: family.id, accepted: false});
    //     });
    //   }
    //
    //   this.setState({values, enable: false, spinning: false});
    //   input.onChange(values);
    // }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.emptyFamilies();
  }


  /**
   *
   * @param {Array} _values
   * @return {boolean}
   * @private
   */
  _getEnable(_values = []) {
    let enable = false;
    if (Array.isArray(_values)) {
      let index = _values.findIndex((item) => item.user_id !== null);
      if (index > -1) {
        enable = _values[index].accepted;
      }
    }
    return enable;
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

  _onCheckBox(value) {
    const {input, position} = this.props;
    let values = [];

    values.push({userId: position.user.id, familiesId: null, accepted: value});

    if (position.user && position.user.families) {
      position.user.families.map((family) => {
        values.push({userId: null, familiesId: family.id, accepted: false});
      });
    }

    this.setState({values, enable: value, spinning: false});
    input.onChange(values);
  }

  _onChangeRadio(value, familyId) {
    const {input} = this.props;
    let {values} = this.state;
    this.setState({spinning: true}, () => {
      let index = values.findIndex((item) => parseInt(item.families_id) === parseInt(familyId) || parseInt(item.familiesId) === parseInt(familyId));

      if (index > -1) {
        values[index] = ({userId: null, familiesId: familyId, accepted: value});
      } else {
        values.push({userId: null, familiesId: familyId, accepted: value});
      }

      this.setState({values, spinning: false});

      input.onChange(values);
    });
  }

  _renderForm() {
    let _items = [];
    const {position} = this.props;
    const {values, enable} = this.state;
    if (position.user && position.user.profile) {
      _items.push(
        <Col xs={12} key={uuidv1()}>
          {position.user.profile.firstName} {position.user.profile.lastName}
        </Col>,
        <Col xs={12} key={uuidv1()}>
          <Radio.Group
            onChange={(e) => this._onCheckBox(e.target.value)}
            value={enable}>
            <Radio value={true}>{app.translate('main.yes')}</Radio>
            <Radio value={false}>{app.translate('main.no')}</Radio>
          </Radio.Group>
        </Col>,
      );
    } else {
      _items.push(
        <Col xs={24} key={uuidv1()}>
          <Checkbox
            checked={enable}
            onChange={(e) => this._onCheckBox(e.target.checked)}
          >میخواهم بیمه شوم</Checkbox>
        </Col>,
      );
    }
    if (position.user && position.user.families) {
      position.user.families.map((family) => {
        let value = values.find((item) => item.familiesId === family.id || item.families_id === family.id);
        _items.push(
          <Col xs={12} key={uuidv1()}>
            {family.name} {family.family}
          </Col>,
          <Col xs={12} key={uuidv1()}>
            <Radio.Group
              disabled={!enable}
              onChange={(e) => this._onChangeRadio(e.target.value, family.id)}
              value={value && value.accepted ? value.accepted : false}>
              <Radio value={true}>{app.translate('main.yes')}</Radio>
              <Radio value={false}>{app.translate('main.no')}</Radio>
            </Radio.Group>
          </Col>,
        );
      });
    }
    return _items;
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
    const {spinning} = this.state;

    return (<Form.Item
      label={label}
      help={meta.touched && meta.error}
      required={required}
      validateStatus={this._validateStatus()}
      hasFeedback
      {...this._inline()}
    >
      <Spin
        spinning={spinning}
      >
        <Row
          gutter={16}
          style={{margin: 0, height: '100%'}}
        >
          {this._renderForm()}
        </Row>
      </Spin>
    </Form.Item>);
  }
}
