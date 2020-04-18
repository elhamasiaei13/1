import React from 'react';
import {reduxForm, Field, isPristine} from 'redux-form';
import {connect} from 'react-redux';
import {Card, Button, Row, Col, Input, Select as AntdSelect} from 'antd';
import PropTypes from 'prop-types';
import {Text, Date, Select, Number, Toggle} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import asyncValidate from './asyncValidate';
import {emptyPack, showPack, indexRules, storePack as store, updatePack as update} from './../Module';
import Spin from 'components/common/Spin';

@reduxForm({
  form: 'stack-packRule-pack-form',
  validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);

    data.packId = props.packRule.id;
    data.ruleId = parseInt(data.ruleId);
    data.cycle = data.cycle ? ( data.cycle * 1440 ) : 0;
    data.fact = data.fact ? data.fact * 3600 : 0;


    if (props.packId) {
      dispatch(update(props.packId, {stack_pack: data}));
    } else {
      dispatch(store({stack_pack: data}));
    }
  },
})
@connect((state) => ({
  pack: state.Attendance.Stack.Packs.pack,
  rules: state.Attendance.Stack.Packs.rules,
  isPristine: isPristine('stack-packRule-pack-form')(state),
}), {
  show: showPack,
  indexRules,
  emptyPack,
})
@autobind
/**
 *
 */
export default class PackRulesForm extends React.PureComponent {
  static propTypes = {
    packId: PropTypes.number,
    show: PropTypes.func,
    pack: PropTypes.object,
    packRule: PropTypes.object,
    initialize: PropTypes.func,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
    indexRules: PropTypes.func,
    emptyPack: PropTypes.func,
    rules: PropTypes.array,
  };

  static defaultProps = {
    packRule: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      initialize: !!this.props.packRule,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {packId, show, indexRules} = this.props;

    indexRules();
    if (packId) {
      show(packId, null, (err) => !err && this.setState({loading: false}));
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.packId, np.packId)) {
      if (np.packId) {
        np.show(np.packId);
        this.setState({loading: true});
        np.show(np.packId, null, (err) => !err && this.setState({loading: false}));
      } else {
        this.props.emptyPack();
      }
    }


    if (!app._.isEqual(this.props.pack, np.pack)) {
      let _pack = app._.cloneDeep(np.pack);
      _pack.ruleId = _pack.ruleId ? `${_pack.ruleId}`: null;
      _pack.dateFrom = _pack.dateFrom && _pack.dateFrom.split(' ')[0];
      _pack.dateTo = _pack.dateTo && _pack.dateTo.split(' ')[0];
      _pack.cycle = _pack.cycle ? _pack.cycle / 1440 : null;
      _pack.fact = _pack.fact ?_pack.fact / 3600 : null;

      np.initialize(_pack);
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPack();
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _rules() {
    const {rules} = this.props;

    let _rules = [];

    app._.map(rules, (rule) => {
      _rules.push(<AntdSelect.Option key={`${rule.id}`} value={`${rule.id}`}>{rule.name}</AntdSelect.Option>);
    });

    return _rules;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {submit, onCancel, isPristine} = this.props;

    const {loading} = this.state;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Card
          className="wrapper"
          title={app.translate('routes.home.attendance.stack.Stack Pack Form')}
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
                disabled={isPristine}
                onClick={submit}
              >
                {app.translate('main.Submit')}
              </Button>
            </Button.Group>
          }
        >
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
                label={app.translate('routes.home.attendance.stack.Title')}
                prefix={<MaterialIcon name="alphabetical"/>}
                required
                component={Text}
              />
            </Col>

            <Col>
              <Field
                name="ruleId"
                component={Select}
              >
                {this._rules()}
              </Field>
            </Col>

            <Col>
              <Field
                name="dateFrom"
                label={app.translate('routes.home.attendance.stack.Date from')}
                required
                component={Date}
              />
            </Col>

            <Col>
              <Field
                name="dateTo"
                label={app.translate('routes.home.attendance.stack.Date to')}
                required
                component={Date}
              />
            </Col>

            <Col>
              <Field
                name="cycle"
                label={`${app.translate('routes.home.attendance.stack.Cycle')} (${app.translate('main.In Days')})`}
                component={Number}
              />
            </Col>

            <Col>
            <span
              className="inputInline"
            >
              <Field
                name="fact"
                label={app.translate('routes.home.attendance.stack.Action')}
                component={Number}
              />
              <Field
                name="factType"
                component={Select}
                style={{
                  width: '100%',
                }}
              >
                <AntdSelect.Option value="hour">{app.translate('routes.home.attendance.stack.Hour')}</AntdSelect.Option>
                <AntdSelect.Option value="day">{app.translate('routes.home.attendance.stack.Day')}</AntdSelect.Option>
              </Field>
            </span>
            </Col>

            <Col>
              <Field
                name="priority"
                label={app.translate('routes.home.attendance.stack.Priority')}
                component={Number}
              />
            </Col>

            <Col>
              <Field
                name="show"
                label={app.translate('routes.home.attendance.stack.Active')}
                component={Toggle}
              />
            </Col>

          </Row>
        </Card>
      </Spin>
    );
  }
}
