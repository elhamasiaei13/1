import React from 'react';
import {Row, Col} from 'antd';
import List from './List';
import Form from './Form';
import RulePackRulesList from './RulePackRulesList';
import RulePackRuleForm from './RulePackRulesForm';
import {connect} from 'react-redux';
import {emptyRulePack, emptyRulePacks} from './Module';
import PropTypes from 'prop-types';

@connect(null, {
  emptyRulePacks,
  emptyRulePack,
})
@autobind
/**
 *
 * @class RulePackRule
 * @extends PureComponent
 */
export default class RulePack extends React.PureComponent {
  static propTypes = {
    emptyRulePacks: PropTypes.func,
    emptyRulePack: PropTypes.func,
  };
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      rulePack: null,
      rulePackRule: null,
      status: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRulePacks();
    this.props.emptyRulePack();
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      rulePack: null,
      rulePackRule: null,
      status: null,
    }, callback);
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  _render() {
    const {rulePack, rulePackRule, status} = this.state;
    let children = [];

    const list = (<Col
      key="0"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <List
        onAdd={() => this.setState({rulePack: {}, status: 'adding'})}
        onCancel={this._onCancel}
        onEdit={(rulePack) => this.setState({rulePack, status: 'editing'})}
        onClick={(rulePack) => this.setState({rulePack, status: 'editing'})}
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
        rulePackId={rulePack && rulePack.id}
        onCancel={this._onCancel}
        handleSubmit={(rulePack) => this.setState({rulePack, status: 'editing'})}
      />
    </Col>);

    let rulePackRuleList = (<Col
      key="2"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <RulePackRulesList
        item={rulePack}
        activeItem={rulePackRule && rulePackRule.id}
        onAdd={() => this.setState({rulePackRule: null, status: 'editingRulePackRule'})}
        onEdit={(rulePackRule) => this.setState({rulePackRule, status: 'editingRulePackRule'})}
        onClick={(rulePackRule) => this.setState({rulePackRule, status: 'editingRulePackRule'})}
        onFormCancel={(id) => (rulePackRule && rulePackRule.id === id) ? this.setState({status: 'editing', rulePackRule: null}) : {}}
      />
    </Col>);

    let rulePackRuleForm = (<Col
      key="3"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <RulePackRuleForm
        rulePack={rulePack}
        rulePackRuleId={rulePackRule && rulePackRule.id}
        onCancel={() => this.setState({status: 'editing', rulePackRule: null})}
      />
    </Col>);

    switch (status) {
      case 'adding':
        children.push(form);
        break;
      case 'editing':
        children.push(form, rulePackRuleList);
        break;
      case 'editingRulePackRule':
        children.push(form, rulePackRuleList, rulePackRuleForm);
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
