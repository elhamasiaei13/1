import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Menu} from 'antd';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';
import {connect} from 'react-redux';
import {indexUserFinancials, emptyUserFinancials, destroyUserFinancial} from './../../Module';

@authorize
@connect((state) => ({
  financialInfos: state.Basic.Personnel.financialInfos,
}), {
  index: indexUserFinancials,
  empty: emptyUserFinancials,
  destroy: destroyUserFinancial,
})
@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    banks: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    can: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    index: PropTypes.func,
    empty: PropTypes.func,
    destroy: PropTypes.func,
    financialInfos: PropTypes.array,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {user, index} = this.props;

    index(user.id, (err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {can, onEdit} = this.props;

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
        <Menu.Item key="edit" disabled={!can('FinancialInfo@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('FinancialInfo@destroy')}>
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onDelete(item) {
    const {destroy} = this.props;

    Modal.confirm({
      title: app.translate('routes.home.basic.personnel.Removing financial'),
      content: app.translate('routes.home.basic.personnel.Are you sure removing financial with number', {number: item.accountNumber || item.cardNumber}),
      onOk: () => destroy(item.id),
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {onAdd, financialInfos, onEdit, banks} = this.props;

    return (
      <ListView
        title={app.translate('routes.home.basic.personnel.Financials')}
        loading={loading}
        items={financialInfos}
        primaryText={(item) => {
          let _index = banks.findIndex((_item) => _item.id == item.bankId);

          if (_index > -1) {
            return banks[_index].name;
          }

          return item.bankId;
        }}
        secondaryText={(item) => {
          let _secondaryText = [];

          if (item.accountNumber) {
            _secondaryText.push(item.accountNumber);
          }

          if (item.cardNumber) {
            _secondaryText.push(item.cardNumber);
          }

          return _secondaryText.length > 0 ? _secondaryText.join(' ~ ') : '';
        }}
        onClick={app.authorize.can('FinancialInfo@update') ? onEdit : undefined}
        menu={this._menu}
        extra={
          <Button
            type="primary"
            disabled={!app.authorize.can('FinancialInfo@store')}
            onClick={onAdd}
          >
            {app.translate('main.Add')}
          </Button>
        }
      />
    );
  }
}
