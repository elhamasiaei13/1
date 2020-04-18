import React from 'react';
import {reduxForm, Field, isPristine} from 'redux-form';
import {connect} from 'react-redux';
import {Card, Button, Row, Col} from 'antd';
import PropTypes from 'prop-types';
import {Text, TextArea} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import asyncValidate from './asyncValidate';
import {show, showForm, emptyPolicy, store, update} from './../Module';

@reduxForm({
  form: 'attendance-policy-form',
  validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);

    data = {policy: data};

    if (props.policyId) {
      //console.log('update');
      dispatch(update(props.policyId, data, (r) => props.handleSubmit(r.data)));
    } else {
     // console.log('store');
      dispatch(store(data, (r) => props.handleSubmit(r.data)));
    }
  },
})
@connect((state) => ({
  policy: state.Attendance.Policy.Definition.policy,
  isPristine: isPristine('attendance-policy-form')(state),
}), {
  show,
  showForm,
  emptyPolicy,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    policyId: PropTypes.number,
    show: PropTypes.func,
    showForm: PropTypes.func,
    emptyPolicy: PropTypes.func,
    policy: PropTypes.object,
    initialize: PropTypes.func,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      initialize: !!this.props.policy,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {initialize} = this.state;
    const {policyId, showForm, show} = this.props;

    if (policyId) {
      if (!initialize) {
        this.setState({initialize: true}, () => show(policyId, {includes: ['rules']}));
      } else {
        let _policy = app._.cloneDeep(this.props.policy);
        this.setState({initialize: false});
        this.props.initialize(_policy);
      }
    } else {
      this.setState({initialize: false});
    }
    showForm({
      includes: ['form.fields'],
    });
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.policy, np.policy) || this.state.initialize) {
      let _policy = app._.cloneDeep(np.policy);
      this.setState({initialize: false});
      np.initialize(_policy);
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPolicy();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {submit, onCancel, isPristine} = this.props;
    return (
      <Card
        className="wrapper"
        title={app.translate('routes.home.attendance.policy.Policy Form')}
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
              disabled={isPristine}
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
              label={app.translate('routes.home.attendance.policy.Name')}
              prefix={<MaterialIcon name="alphabetical"/>}
              required
              component={Text}
            />
          </Col>

          <Col>
            <Field
              name="description"
              label={app.translate('routes.home.attendance.policy.Description')}
              component={TextArea}
            />
          </Col>

        </Row>
      </Card>
    );
  }
}
