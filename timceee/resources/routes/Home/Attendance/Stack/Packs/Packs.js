import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import PackRulesList from './PackRulesList';
import PackRulesForm from './PackRulesForm';
import PacksList from './PacksList';
import PacksForm from './PacksForm';
import {connect} from 'react-redux';
import {emptyPackRule, emptyPackRules} from './Module';


@connect((state) => ({
  modules: state.General.modules,
}), {
  emptyPackRules,
  emptyPackRule,
})

@authorize
@autobind
/**
 *
 * @class Packs
 * @extends PureComponent
 */
export default class Packs extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
    modules: PropTypes.array,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      packRule: null,
      pack: null,
      status: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPackRules();
    this.props.emptyPackRule();
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      packRule: null,
      pack: null,
      status: null,
    }, callback);
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  _render() {
    const {can, modules} = this.props;
    const {packRule, pack, status} = this.state;
    let children = [];
    const packList = (<Col
      key="0"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <PacksList
        onAdd={() => this.setState({packRule: {}, status: 'adding'})}
        onCancel={this._onCancel}
        onEdit={(packRule) => can('StackPackRule@update') && this.setState({packRule, status: 'editing'})}
        onClick={(packRule) => this.setState({packRule, status: 'editing'})}
      />
    </Col>);

    let packForm = (<Col
      key="1"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <PacksForm
        packRuleId={packRule && packRule.id}
        pack={null}
        modules={modules}
        onCancel={this._onCancel}
        handleSubmit={(packRule) => this.setState({packRule, status: 'editing'})}
      />
    </Col>);

    let packRulesList = (<Col
      key="2"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <PackRulesList
        activeItem={pack && pack.id}
        packRuleId={packRule && packRule.id}
        onAdd={() => this.setState({pack: null, status: 'editingPack'})}
        onEdit={(pack) => this.setState({pack, status: 'editingPack'})}
        onClick={(pack) => can('StackPack@update') && this.setState({pack, status: 'editingPack'})}
        onFormCancel={(id) => (pack && pack.id === id) ? this.setState({status: 'editing', pack: null}) : {}}
      />
    </Col>);

    let packRulesForm = (<Col
      key="3"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <PackRulesForm
        packRule={packRule}
        packId={pack && pack.id}
        onCancel={() => this.setState({status: 'editing', pack: null})}
      />
    </Col>);
    switch (status) {
      case 'adding':
        children.push(packForm);
        break;
      case 'editing':
        children.push(packForm, packRulesList);
        break;
      case 'editingPack':
        children.push(packForm, packRulesList, packRulesForm);
        break;
      default:
        children.push(packList);
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
