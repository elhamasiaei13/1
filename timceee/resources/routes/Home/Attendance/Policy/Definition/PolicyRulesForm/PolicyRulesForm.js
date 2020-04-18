import React from 'react';
import {reduxForm, Field, isPristine, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {Card, Button, Row, Col, Select as AntdSelect} from 'antd';
import PropTypes from 'prop-types';
import {Text, Cascader, Time, Select, Time2, Number, Toggle, Date} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';
import validate from './validate';
import {emptyPolicyRule, storePolicyRule as store, updatePolicyRule as update} from './../Module';
import uuidv1 from 'uuid/v1';
import {Types} from 'routes/General/Types';
import {FormBuilder} from 'components/FormBuilder';

@reduxForm({
  form: 'attendance-policy-policyRule-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);
    let _data = {};
    _data.name = data.name;
    _data.ruleId = data.typeId[data.typeId.length - 1];
    _data.policyRuleId = props.policyRuleId;
    _data.PolicyId = props.policyId;
    _data.values = data.values;
    _data = {policyRule: _data};
    if (props.policyRuleId) {
      dispatch(update(props.policyId, props.policyRuleId, _data));
    } else {
      dispatch(store(props.policyId, _data, props.onCancel));
    }
  },
})
@connect((state) => ({
  policy: state.Attendance.Policy.Definition.policy,
  values: getFormValues('attendance-policy-policyRule-form')(state),
  isPristine: isPristine('attendance-policy-policyRule-form')(state),
}), {
  emptyPolicyRule,
})
@autobind
/**
 *
 */
export default class PolicyRuleForm extends React.PureComponent {
  static propTypes = {
    policyRuleId: PropTypes.number,
    show: PropTypes.func,
    policyRule: PropTypes.object,
    policy: PropTypes.object,
    initialize: PropTypes.func,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
    emptyRule: PropTypes.func,
    emptyPolicyRule: PropTypes.func,
    isPristine: PropTypes.bool,
  };

  static defaultProps = {
    policy: {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      loading: false,
      required: [],
      err: [],
      initialize: !!this.props.policy,
      rules: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {policyId, policyRuleId, policy} = this.props;
    this.setState({rules: Types.items('Policy')}, () => {
      let policyRule = policy.rules.find((item) => {
        return item.id === policyRuleId;
      });
      let rule = policyRule ? this.state.rules.find((item) => {
        return item.id === policyRule.ruleId;
      }) : {};

      let _policyRule = app._.cloneDeep(policyRule);
      if (!app._.isEmpty(rule)) {
        this.form = this._renderItems(
          rule.form ?
            rule.form :
            {},
        );
        //
        // this.form = rule.form ?
        //   rule.form :
        //   {};
        _policyRule = this._getNewData(this.state.rules, _policyRule, rule);
      } else {
        _policyRule = this._getNewData(this.state.rules, _policyRule);
      }
      this.props.initialize(_policyRule);
    });
  }

  /**
   *
   * @param {Object} np - next props
   //  */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.policyRuleId, this.props.policyRuleId)) {

      let policyRule = np.policy.rules.find((item) => {
        return item.id === np.policyRuleId;
      });
      let rule = policyRule ? this.state.rules.find((item) => {
        return item.id === policyRule.ruleId;
      }) : {};
      let _policyRule = app._.cloneDeep(policyRule);
      if (!app._.isEmpty(rule)) {
        // this.form = rule.form ?
        //   rule.form :
        //   {};
          this.form = this._renderItems(
          rule.form ?
            rule.form :
            {},
        );
        _policyRule = this._getNewData(this.state.rules, _policyRule, rule);
      } else {
        _policyRule = this._getNewData(this.state.rules, _policyRule);
      }
      this.props.initialize(_policyRule);

    } else {
      if (!this.props.values || !this.props.values.typeId || !(
          np.values && np.values.typeId && app._.isEqual(np.values.typeId, this.props.values.typeId))) {
        this.form = null;

        let _rule = np.values && np.values.typeId ? this.state.rules.find((item) => {
          return item.id === np.values.typeId[np.values.typeId.length - 1];
        }) : {};
        if (!app._.isEmpty(_rule)) {
          // this.form = _rule.form ?
          //   _rule.form :
          //   {};
          this.form = this._renderItems(
            _rule.form ?
              _rule.form :
              {},
          );
        }
      }
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.form = null;
  }

  _getNewData(rules, data, rule) {
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        if (i === 'typeId') {
          if (rules && !Array.isArray(data[i])) {
            data[i] = this._getGroupIds(rules, data[i]);
          }
        }
        if (i === 'ruleId') {
          if (rules && !Array.isArray(data[i])) {
            data['typeId'] = this._getGroupIds(rules, data[i]);
          }
        }
        if (i === 'values' && !app._.isEmpty(rule)) {
          if (rule.form && rule.form.fields) {
            let _values = {};
            let _data = data[i];
            rule.form.fields.map((field) => {
              _values[app._.camelCase(field.name)] = _data && _data[app._.camelCase(field.name)] ? _data[app._.camelCase(field.name)] : field.default;
            });

            data[i] = _values;

          }
        }
      }
    }

    return data;
  }

  /**
   *
   * @param {Object[]} groups
   * @param {Number} group
   * @return {String[]}
   * @private
   */
  _getGroupIds(groups, group) {
    let _ids = [];

    groups.map((_group) => {
      if (_group.id === group) {
        _ids.push(_group.id);
      } else if (!app._.isEmpty(_group.children)) {
        let _id = this._getGroupIds(_group.children, group);
        if (_id.length > 0) {
          _ids.push(_group.id, ..._id);
        }
      }
    });

    return _ids;
  }

  /**
   *
   * @param {Object[]} groups
   * @return {Object[]}
   * @private
   */
  _renderGroups(groups) {
    let _groups = [];
    groups.map((group) => {
      let _group = {
        value: group.id,
        label: group.label,
      };

      if (!app._.isEmpty(group.children)) {
        _group.children = this._renderGroups(group.children);
      }

      _groups.push(_group);
    });
    return _groups;
  }

  /**
   *
   * @param {Object} form
   * @return {Array}
   * @private
   */
  _renderItems(form) {
    // console.log('form',form, this.props.values);
    let _items = [];
    let fields = [];
    let item;
    let required = [];
    let err = [];
    if (!app._.isEmpty(form)) {
      fields = form.fields;
      fields.sort(function (a, b) {
        return a.priority - b.priority;
      });
      fields.map((field) => {
        if (field.required) {
          required.push(field.name);
          if (!this.props.values || !this.props.values.values || !this.props.values.values[app._.camelCase(field.name)] || this.props.values.values[app._.camelCase(field.name)] === '') {
            err.push(field.name);
          }
        }
        item = null;
        switch (field.type) {
          case 'date':
            item =
              <Field
                name={`values[${app._.camelCase(field.name)}]`}
                label={app.translate(`routes.home.attendance.policy.${field.label}`, `${field.label}`)}
                prefix={<MaterialIcon name="alphabetical"/>}
                required={!!field.required}
                component={Date}
                defaultValue={!this.props.values ? field.default : undefined}
              />;
            break;
          case 'text':
            item =
              <Field
                name={`values[${app._.camelCase(field.name)}]`}
                label={app.translate(`routes.home.attendance.policy.${field.label}`, `${field.label}`)}
                prefix={<MaterialIcon name="alphabetical"/>}
                required={!!field.required}
                component={Text}
                defaultValue={!this.props.values ? field.default : undefined}
              />;
            break;
          case 'time':
            item =
              <Field
                name={`values[${app._.camelCase(field.name)}]`}
                label={app.translate(`routes.home.attendance.policy-.${field.label}`, `${field.label}`)}
                prefix={<MaterialIcon name="clock"/>}
                required={!!field.required}
                component={Time2}
                //  defaultValue={!this.props.values ? field.default : undefined}
              />;
            break;
          case 'number':
            item =
              <Field
                name={`values[${app._.camelCase(field.name)}]`}
                label={app.translate(`routes.home.attendance.policy.${field.label}`, `${field.label}`)}
                prefix={<MaterialIcon name="alphabetical"/>}
                required={!!field.required}
                component={Number}
                defaultValue={!this.props.values ? field.default : undefined}
              />;
            break;
          case 'select':
            if (field.resource === null) {
              let options = [];
              let values = (field.props) ? JSON.parse(field.props) : {};
              let keys = Object.keys(values);
              app._.map(keys, (key) => {
                options.push(<AntdSelect.Option key={`key${key}`} value={`${key}`}>{values[key]}</AntdSelect.Option>);
              });
              item = <Field
                name={`values[${app._.camelCase(field.name)}]`}
                label={app.translate(`routes.home.attendance.policy.${field.label}`, `${field.label}`)}
                prefix={<MaterialIcon name="alphabetical"/>}
                required={!!field.required}
                component={Select}
                // defaultValue={!this.props.values ? field.default : values[0] ? values[0] : undefined}
              >{options}</Field>;
            }
            break;
          default :
            item = <div style={{
              background: '#f1f1f1',
              margin: '2px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              color: '#aaa',
            }}>{field.required ?
              <span style={{color: 'red'}}>*</span> : ''}{app.translate(`routes.home.attendance.policy.${field.label}`, `${field.label}`)}
            </div>;
        }
        _items.push(<Col key={uuidv1()}>{item}</Col>,
        );
      });
    }
    this.setState({err, required});

    return _items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, err} = this.state;
    const {submit, onCancel, isPristine} = this.props;
    let rules = [];
    if (!app._.isEmpty(this.state.rules)) {
      rules = this._renderGroups(this.state.rules);
    }

    return (

      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Card
          className="wrapper"
          title={app.translate('routes.home.attendance.policy.PolicyRule Form')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                onClick={() => onCancel()}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button
                type="primary"
                onClick={submit}
                disabled={isPristine || !app._.isEmpty(err)}
              >
                {app.translate('main.Submit')}
              </Button>
            </Button.Group>
          }
        >{
          !loading ?
            <Row
              gutter={16}
              style={{
                height: '100%',
                overflowY: 'auto',
              }}
            >

              <Col>
                <Field
                  name="name"
                  label={app.translate('routes.home.attendance.policy.PolicyRule Name')}
                  prefix={<MaterialIcon name="alphabetical"/>}
                  required
                  component={Text}
                />
              </Col>

              <Col>
                <Field
                  name="typeId"
                  label={app.translate('routes.home.attendance.policy.Request Type')}
                  component={Cascader}
                  required
                  items={rules}
                />
              </Col>

              {this.form}

            </Row> : <div/>
        }
        </Card>
      </Spin>
    );
  }
}
