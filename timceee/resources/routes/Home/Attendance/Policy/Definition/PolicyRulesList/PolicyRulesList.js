import React from 'react';
import {Menu, Button, Modal} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';
import {show, indexPolicyRules, destroyPolicyRule} from './../Module';

@connect((state) => ({
  policy: state.Attendance.Policy.Definition.policy,
  policyRules: state.Attendance.Policy.Definition.policyRules,
  meta: state.Attendance.Policy.Definition.metaPolicyRules,
}), {
  show,
  indexPolicyRules,
  destroyPolicyRule,
})
@autobind
/**
 *
 * @extends React.PureComponent
 */
export default class PolicyRulesList extends React.PureComponent {
  static propTypes = {
    show: PropTypes.func,
    indexPolicyRules: PropTypes.func,
    destroyPolicyRule: PropTypes.func,
    item: PropTypes.object,
    policy: PropTypes.object,
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onFormCancel: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: !app._.isEmpty(this.props.policy),
    };
  }

  /**
   *
   */
  componentDidMount() {
    this._onReload();
    // if (app._.isEmpty(this.props.policy) || (!app._.isEmpty(this.props.policy) && this.props.item.id !== this.props.policy.id )) {
    //
    // } else {
    //   this.setState({loading: false});
    // }
  }

  /**
   *
   * @private
   */
  _onReload() {
    const {show, indexPolicyRules} = this.props;
    this.setState({loading: true});
     show(this.props.item.id, {includes: ['rules']}, () => this.setState({loading: false}));
   // indexPolicyRules({}, () => this.setState({loading: false}));
  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _onDelete(item) {
    const {destroyPolicyRule, onFormCancel} = this.props;
    Modal.confirm({
      title: app.translate('routes.home.attendance.policy.Removing PolicyRule'),
      content: app.translate('routes.home.attendance.policy.Are you sure about removing policyRule', {policyRule: item.name}),
      onOk: () => destroyPolicyRule(item.policyId, item.id, () => onFormCancel(item.id)),
    });
  }


  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
   /* const {index} = this.props;

    this.setState({loading: true}, () => index({
      filterGroups: [
        {
          or: true,
          filters: [
            {
              key: 'name',
              value,
              operator: 'ct',
            },
            {
              key: 'description',
              value,
              operator: 'ct',
            },
          ],
        },
      ],
    }, (err) => !err && this.setState({loading: false})));*/
  }
  /**
   *
   * @return {Object}
   * @private
   */
  _pagination() {
    return {};
  }

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {onEdit} = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'edit':
              onEdit(item);
              break;
            case 'delete':
            default:
              this._onDelete(item);
          }
        }}
      >
        <Menu.Item key="edit">
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete">
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  _extra() {
    const {onAdd} = this.props;
    const {loading} = this.state;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={this._onReload}
          disabled={loading}
        >
          <MaterialIcon name="reload" size="tiny" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          onClick={onAdd}
        >
          {app.translate('main.Add')}
        </Button>
      </Button.Group>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {policy, activeItem, onClick} = this.props;
    const {loading} = this.state;

    return (
      !app._.isEmpty(policy) && <ListView
        title={app.translate('routes.home.attendance.policy.PolicyRules')}
        items={policy.rules}
        primaryText={'name'}
        secondaryText={'description'}
        style={{height: '100%'}}
        menu={this._menu}
        extra={this._extra()}
        onSearch={this._onSearch}
        loading={loading}
        pagination={this._pagination()}
        activeItem={activeItem}
        onClick={onClick}
      />
    );
  }
}
