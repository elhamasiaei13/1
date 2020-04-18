import React from 'react';
import {Row, Col} from 'antd';
import List from './List';
import Form from './Form';
import PolicyRulesList from './PolicyRulesList';
import PolicyRuleForm from './PolicyRulesForm';
import {connect} from 'react-redux';
import {emptyPolicy, emptyPolicies} from './Module';
import PropTypes from 'prop-types';

@connect(null, {
  emptyPolicies,
  emptyPolicy,
})
@autobind
/**
 *
 * @class PolicyRule
 * @extends PureComponent
 */
export default class Definition extends React.PureComponent {
  static propTypes = {
    emptyPolicies: PropTypes.func,
    emptyPolicy: PropTypes.func,
  };
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      policy: null,
      policyRule: null,
      status: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPolicies();
    this.props.emptyPolicy();
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      policy: null,
      policyRule: null,
      status: null,
    }, callback);
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  _render() {
    const {policy, policyRule, status} = this.state;
    let children = [];

    const list = (<Col
      key="0"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <List
        onAdd={() => this.setState({policy: {}, status: 'adding'})}
        onCancel={this._onCancel}
        onEdit={(policy) => this.setState({policy, status: 'editing'})}
        onClick={(policy) => this.setState({policy, status: 'editing'})}
      />
    </Col>);

    let form = (<Col
      key="1"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <Form
        policyId={policy && policy.id}
        onCancel={this._onCancel}
        handleSubmit={(policy) => this.setState({policy, status: 'editing'})}
      />
    </Col>);
    let policyRuleList = (<Col
      key="2"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <PolicyRulesList
        item={policy}
        activeItem={policyRule && policyRule.id}
        onAdd={() => this.setState({policyRule: null, status: 'editingPolicyRule'})}
        onEdit={(policyRule) => this.setState({policyRule, status: 'editingPolicyRule'})}
        onClick={(policyRule) => this.setState({policyRule, status: 'editingPolicyRule'})}
        onFormCancel={(id) => (policyRule && policyRule.id === id) ? this.setState({status: 'editing', policyRule: null}) : {}}
      />
    </Col>);

    let policyRuleForm = (<Col
      key="3"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <PolicyRuleForm
        policyId={policy && policy.id}
        policyRuleId={policyRule && policyRule.id}
        onCancel={() => this.setState({status: 'editing', policyRule: null})}
      />
    </Col>);

    switch (status) {
      case 'adding':
        children.push(form);
        break;
      case 'editing':
        children.push(form, policyRuleList);
        break;
      case 'editingPolicyRule':
        children.push(form, policyRuleList, policyRuleForm);
        break;
      default:
        children.push(list);
    }

    return children;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        className="working-hours"
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >

        {this._render()}

      </Row>
    );
  }
}
