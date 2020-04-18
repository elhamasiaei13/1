import React from 'react';
import {reduxForm, Field, isPristine, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {Card, Button, Row, Col, Select as AntdSelect} from 'antd';
import PropTypes from 'prop-types';
import {Text, Cascader, Time, Select, Time2, Number, Toggle, Date} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';
import validate from './validate';
import {showRulePackRule, emptyRule, showForm, emptyRulePackRule, storeRulePackRule as store, updateRulePackRule as update} from './../Module';
import {Types} from 'routes/General/Types';
import DatePicker from 'components/common/DatePicker';
import PositionsList from 'routes/Home/Requests/Procedure/Form/Applicants';
import RulesList from 'routes/Home/Attendance/Rules/List/ListWrapper';
import uuidv1 from 'uuid/v1';

@reduxForm({
  form: 'requests-rulePack-rulePackRule-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);
    let _data = {};
    _data.name = data.name;
    _data.typeId = data.typeId[data.typeId.length - 1];
    _data.requestRulePackId = props.rulePack.id;
    _data.rulePackId = props.rulePack.id;
    _data.values = data.values;
    _data = {requestRulePackRule: _data};
    if (props.rulePackRuleId) {
      dispatch(update(props.rulePackRuleId, _data));
    } else {
      dispatch(store(_data, props.onCancel));
    }
  },
})
@connect((state) => ({
  rulePackRule: state.Requests.Pattern.RulePack.rulePackRule,
  rule: state.Requests.Pattern.RulePack.rule,
  values: getFormValues('requests-rulePack-rulePackRule-form')(state),
  isPristine: isPristine('requests-rulePack-rulePackRule-form')(state),
}), {
  show: showRulePackRule,
  showForm,
  emptyRule,
  emptyRulePackRule,
})
@autobind
/**
 *
 */
export default class RulePackRuleForm extends React.PureComponent {
  static propTypes = {
    rulePackRuleId: PropTypes.number,
    show: PropTypes.func,
    rulePackRule: PropTypes.object,
    rulePack: PropTypes.object,
    rule: PropTypes.object,
    initialize: PropTypes.func,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
    showForm: PropTypes.func,
    emptyRule: PropTypes.func,
    emptyRulePackRule: PropTypes.func,
    isPristine: PropTypes.bool,
  };

  static defaultProps = {
    rulePack: {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      loading: true,
      required: [],
      types: [],
      err: [],
      initialize: !!this.props.rulePack,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {show, rulePackRuleId} = this.props;

    this.setState({types: Types.items('Request')}, () => {
        let _rulePackRule = app._.cloneDeep(this.props.rulePackRule);
        _rulePackRule = this._getNewData(this.state.types, _rulePackRule);
        this.props.initialize(_rulePackRule);

        if (rulePackRuleId) {
          show(rulePackRuleId, null, (err) => !err && this.setState({loading: false}));
        } else {
          this.setState({
            loading: false,
          });
        }
    });

    if (!app._.isEmpty(this.props.rule)) {
      this.form = this._renderItems(
        this.props.rule.form ?
          this.props.rule.form :
          {},
      );
    }
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    const {rulePackRuleId} = this.props;
    const {required, err} = this.state;
    if (!app._.isEqual(rulePackRuleId, np.rulePackRuleId)) {
      this.form = null;
      np.initialize({});
      if (np.rulePackRuleId) {
        this.setState({loading: true});
        np.show(np.rulePackRuleId, null, (err) => !err && this.setState({loading: false}));
      } else {
        this.props.emptyRulePackRule();
      }
    }
    if (
      np.values &&
      np.values.typeId &&
      !app._.isEmpty(np.values.typeId) &&
      (
        (this.props.values && this.props.values.typeId && !app._.isEqual(np.values.typeId, this.props.values.typeId)) ||
        (!this.props.values || !this.props.values.typeId)
      )
    ) {
      let typeId = np.values.typeId[np.values.typeId.length - 1];
      let type = this._findRequestType(this.state.types, typeId);
      this.form = null;
      if (type.rule && type.rule.form) {
        this.form = this._renderItems(
          type.rule && type.rule.form ?
            type.rule.form :
            {},
        );
      }
    }
    if (
      (!app._.isEqual(this.props.rulePackRule, np.rulePackRule) && ( np.rulePackRule.id === np.rulePackRuleId))
      || !this.props.values
      || (this.props.values && this.props.values.typeId && !app._.isEqual(np.values.typeId, this.props.values.typeId))) {// ||  !app._.isEqual(this.props.rule, np.rule)

      let typeId = np.values && np.values.typeId && np.values.typeId[np.values.typeId.length - 1];
      let type = this._findRequestType(this.state.types, typeId);

      let _rulePackRule = this._getNewData(this.state.types, np.rulePackRule, np.values);
      np.initialize(_rulePackRule);
    }

    if (np.values && np.values.typeId && app._.isEmpty(np.values.typeId)) {
      this.form = null;
    }
    let _err = [];
    required.map((item) => {
      if (!np.values || !np.values.values || !np.values.values[app._.camelCase(item)] || np.values.values[app._.camelCase(item)] === '') {
        _err.push(item);
      }
    });
    if (!app._.isEqual(_err, err)) {
      this.setState({err: _err});
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRulePackRule();
    this.props.emptyRule();
    this.form = null;
  }

  _findRequestType(types, item) {
    let _item = {};
    for (let i = 0; i < types.length; i++) {
      if (types[i].id === item) {
        _item = types[i];
        break;
      }
      if (types[i].children && types[i].children[0]) {
        _item = this._findRequestType(types[i].children, item);
      }
      if (_item && _item.id) {
        break;
      }
    }
    return _item;
  }

  _getNewData(types, _data, values) {
    let data = Object.assign({}, values, _data);
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        if (i === 'typeId') {
          if (types && !Array.isArray(data[i])) {
            let _typeId = values && values[i] && values[i][0] ? values[i] : this._getGroupIds(types, data[i]);
            // _rule = this._findRequestType(types, _typeId[0]);
            data[i] = _typeId;
          }
        }


        if (i === 'values' && data['typeId']) {
          let typeId = data.typeId[data.typeId.length - 1];
          let type = this._findRequestType(this.state.types, typeId);
          let _rule = type && type.rule;
          let _values = {};

          if (_rule && _rule.form && _rule.form.fields) {
            let _data = data[i];
            _rule.form.fields.map((field) => {
              _values[app._.camelCase(field.name)] = _data && _data[app._.camelCase(field.name)] ? _data[app._.camelCase(field.name)] : field.default;
            });
          }

          data[i] = _values;
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


  _renderItems(form) {
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
                label={app.translate(`routes.home.requestsrule-pack.${field.label}`, `${field.label}`)}
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
                label={app.translate(`routes.home.requestsrule-pack.${field.label}`, `${field.label}`)}
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
                label={app.translate(`routes.home.requestsrule-pack.${field.label}`, `${field.label}`)}
                prefix={<MaterialIcon name="clock"/>}
                required={!!field.required}
                component={Time2}
                // defaultValue={!this.props.values ? field.default : undefined}
              />;
            break;
          case 'number':
            item =
              <Field
                name={`values[${app._.camelCase(field.name)}]`}
                label={app.translate(`routes.home.requestsrule-pack.${field.label}`, `${field.label}`)}
                prefix={<MaterialIcon name="alphabetical"/>}
                required={!!field.required}
                component={Number}
                defaultValue={!this.props.values ? field.default : undefined}
              />;
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
              <span style={{color: 'red'}}>*</span> : ''}{app.translate(`routes.home.requestsrule-pack.${field.label}`, `${field.label}`)}
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
    let types = [];
    if (!app._.isEmpty(this.state.types)) {
      types = this._renderGroups(this.state.types);
    }
    return (

      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Card
          className="wrapper"
          title={app.translate('routes.home.requests.rule-pack.RulePackRule Form')}
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
                disabled={!app._.isEmpty(err)}
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
                  label={app.translate('routes.home.requests.rule-pack.RulePackRule Name')}
                  prefix={<MaterialIcon name="alphabetical"/>}
                  required
                  component={Text}
                />
              </Col>

              <Col>
                <Field
                  name="typeId"
                  label={app.translate('routes.home.requests.Request Type')}
                  component={Cascader}
                  required
                  items={types}
                />
              </Col>
              {
                this.form

              }

            </Row> : <div/>
        }
        </Card>
      </Spin>
    );
  }
}
