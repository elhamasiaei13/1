import React from 'react';
import {reduxForm, Field, isPristine} from 'redux-form';
import {connect} from 'react-redux';
import {Card, Button, Row, Col} from 'antd';
import PropTypes from 'prop-types';
import {Text, TextArea, Date} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import {show, emptyRulePack, store, update} from './../Module';

@reduxForm({
  form: 'requests-rulePack-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);

    data = {request_rule_pack: data};

    if (props.rulePackId) {
      dispatch(update(props.rulePackId, data, (r) => props.handleSubmit(r.data)));
    } else {
      dispatch(store(data, (r) => props.handleSubmit(r.data)));
    }
  },
})
@connect((state) => ({
  rulePack: state.Requests.Pattern.RulePack.rulePack,
  isPristine: isPristine('requests-rulePack-form')(state),
}), {
  show,
  emptyRulePack,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    rulePackId: PropTypes.number,
    show: PropTypes.func,
    emptyRulePack: PropTypes.func,
    rulePack: PropTypes.object,
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
      initialize: !!this.props.rulePack,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {initialize} = this.state;
    const {rulePackId, show} = this.props;

    if (rulePackId) {
      if (!initialize) {
        this.setState({initialize: true}, () => show(rulePackId, {includes: ['rules']}));
      } else {
        let _rulePack = app._.cloneDeep(this.props.rulePack);
        this.setState({initialize: false});
        this.props.initialize(_rulePack);
      }
    } else {
      this.setState({initialize: false});
    }
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.rulePack, np.rulePack) || this.state.initialize) {
      let _rulePack = app._.cloneDeep(np.rulePack);
      this.setState({initialize: false});
      np.initialize(_rulePack);
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRulePack();
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
        title={app.translate('routes.home.requests.rule-pack.RulePack Form')}
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
              label={app.translate('routes.home.requests.rule-pack.Name')}
              prefix={<MaterialIcon name="alphabetical"/>}
              required
              component={Text}
            />
          </Col>

          <Col>
            <Field
              name="description"
              label={app.translate('routes.home.requests.rule-pack.Description')}
              component={TextArea}
            />
          </Col>

          <fieldset>
            <legend>{app.translate('routes.home.requests.rule-pack.limitRequest')}</legend>
          <Col>
            <Field
              name="beginDate"
              label={app.translate('routes.home.requests.rule-pack.beginDate')}
              component={Date}
              required
            />
          </Col>

          <Col>
            <Field
              name="endDate"
              label={app.translate('routes.home.requests.rule-pack.endDate')}
              component={Date}
              required
            />
          </Col>
          </fieldset>

        </Row>
      </Card>
    );
  }
}
