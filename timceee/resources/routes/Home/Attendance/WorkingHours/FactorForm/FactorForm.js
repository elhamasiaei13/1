import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';
import PropTypes from 'prop-types';
import validate from './validate';
import {showFactor, storeFactor as store, updateFactor as update, emptyFactor} from './../Module';
import {Text, TextArea, Time, Select, Number, Toggle, Cascader} from 'components/redux-form';
import {Card, Button, Row, Col, Select as AntdSelect} from 'antd';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {Types} from 'routes/General/Types';

@reduxForm({
  form: 'working-hour-factor-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);

    let type = Types.findId(data.ruleId[data.ruleId.length - 1]);

    data.workingHourId = props.workingHour.id;
    data.timeFrom = `${data.timeFrom}:00`;
    data.ruleId = type && type.rule && type.rule.id ? type.rule.id : 0;
    data.timeTo = `${data.timeTo}:00`;
    data.dayFrom = data.dayFrom * 1;
    data.addTime = data.addTime && `${data.addTime}:00`;
    data.dayTo = data.dayTo * 1;

    if (props.factorId) {
      dispatch(update(props.factorId, data));
    } else if (data.id) {
      dispatch(update(data.id, data));
    } else {
      dispatch(store(data));
    }
  },
})
@connect((state) => ({}), {
  show: showFactor,
  emptyFactor,
})
@autobind
/**
 *
 */
export default class FactorForm extends React.PureComponent {
  static propTypes = {
    factorId: PropTypes.number,
    show: PropTypes.func,
    emptyFactor: PropTypes.func,
    factor: PropTypes.object,
    workingHour: PropTypes.object,
    initialize: PropTypes.func,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    workingHour: {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      rules: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {factorId, show} = this.props;

    this.setState({rules: Types.items('WorkingHour')}, () => {
      if (factorId) {
        show(factorId, null, (err) => !err && this.setState({loading: false}));
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.factorId, np.factorId)) {
      this.setState({
        loading: true,
      }, () => np.show(np.factorId));
    }

    if (!app._.isEqual(this.props.factor, np.factor)) {
      let _factor = app._.cloneDeep(np.factor);
      _factor.ruleId = this._getGroupIds(this.state.rules, _factor.ruleId);
      _factor.timeFrom = _factor.timeFrom.substr(0, 5);
      _factor.dayFrom = `${_factor.dayFrom}`;
      _factor.timeTo = _factor.timeTo.substr(0, 5);
      _factor.dayTo = `${_factor.dayTo}`;
      _factor.addTime = _factor.addTime.substr(0, 5);
      _factor.acceptance = !!_factor.acceptance;

      np.initialize(_factor);

      this.setState({
        loading: false,
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyFactor();
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
      if (_group && _group.rule && _group.rule.id === group) {
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
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {submit, onCancel} = this.props;
    let types = [];

    if (!app._.isEmpty(this.state.rules)) {
      types = this._renderGroups(this.state.rules);
    }

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Card
          className="wrapper"
          title={app.translate('routes.home.attendance.working-hours.Factor Form')}
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
                label={app.translate('routes.home.attendance.working-hours.Factor Name')}
                prefix={<MaterialIcon name="alphabetical"/>}
                required
                component={Text}
              />
            </Col>

            <Col>
              <Field
                name="ruleId"
                label={app.translate('routes.home.attendance.rules.Rule')}
                required
                component={Cascader}
                items={types}
              />
            </Col>

            <Col>
              <Field
                name="description"
                label={app.translate('routes.home.attendance.working-hours.Factor Description')}
                component={TextArea}
              />
            </Col>

            <Col>
              <Field
                name="timeFrom"
                label={app.translate('routes.home.attendance.working-hours.Start Time')}
                required
                component={Time}
              />
            </Col>

            <Col>
              <Field
                name="dayFrom"
                defaultValue="0"
                component={Select}
              >
                <AntdSelect.Option value="0">{app.translate('routes.home.attendance.working-hours.Same Day')}</AntdSelect.Option>
                <AntdSelect.Option value="1">{app.translate('routes.home.attendance.working-hours.Next Day')}</AntdSelect.Option>
                <AntdSelect.Option value="2">{app.translate('routes.home.attendance.working-hours.Two Days Later')}</AntdSelect.Option>
              </Field>
            </Col>

            <Col>
              <Field
                name="timeTo"
                label={app.translate('routes.home.attendance.working-hours.End Time')}
                required
                component={Time}
              />
            </Col>

            <Col>
              <Field
                name="dayTo"
                defaultValue="0"
                component={Select}
              >
                <AntdSelect.Option value="0">{app.translate('routes.home.attendance.working-hours.Same Day')}</AntdSelect.Option>
                <AntdSelect.Option value="1">{app.translate('routes.home.attendance.working-hours.Next Day')}</AntdSelect.Option>
                <AntdSelect.Option value="2">{app.translate('routes.home.attendance.working-hours.Two Days Later')}</AntdSelect.Option>
              </Field>
            </Col>

            <Col>
              <Field
                name="addTime"
                label={app.translate('routes.home.attendance.working-hours.Add Time to Result')}
                component={Time}
              />
            </Col>

            <Col>
              <Field
                name="fact"
                label={app.translate('routes.home.attendance.working-hours.Factor')}
                component={Number}
              />
            </Col>

            <Col>
              <Field
                name="priority"
                label={app.translate('routes.home.attendance.working-hours.Priority')}
                min={0}
                component={Number}
              />
            </Col>

            <Col>
              <Field
                name="acceptance"
                label={app.translate('routes.home.attendance.working-hours.Needs to be Accepted')}
                component={Toggle}
              />
            </Col>

          </Row>
        </Card>
      </Spin>
    );
  }
}
