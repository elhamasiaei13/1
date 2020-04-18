import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Menu} from 'antd';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';
import jMoment from 'moment-jalaali';
import {connect} from 'react-redux';
import {indexUserContracts, emptyUserContracts, destroyUserContract} from './../../Module';

@authorize
@connect((state) => ({
  contracts: state.Basic.Personnel.contracts,
}), {
  index: indexUserContracts,
  empty: emptyUserContracts,
  destroy: destroyUserContract,
})
@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    can: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    index: PropTypes.func,
    empty: PropTypes.func,
    destroy: PropTypes.func,
    contracts: PropTypes.array,
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
        <Menu.Item key="edit" disabled={!can('Contract@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('Contract@destroy')}>
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
      title: app.translate('routes.home.basic.personnel.Removing contract'),
      content: app.translate('routes.home.basic.personnel.Are you sure removing contract'),
      onOk: () => destroy(item.id),
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {onAdd, onEdit, contracts, types} = this.props;

    return (
      <ListView
        title={app.translate('routes.home.basic.personnel.Contracts')}
        loading={loading}
        items={contracts}
        onClick={app.authorize.can('Contract@update') ? onEdit : undefined}
        primaryText={(item) => {
          let _index = types.findIndex((_item) => _item.id == item.recruitmentTypeId);

          if (_index > -1) {
            return types[_index].name;
          }

          return item.recruitmentTypeId;
        }}
        secondaryText={(item) => (
          <span dir="ltr">
            {`${jMoment(item.beginDate.slice(0, 10), 'YYYY-MM-DD').format('jYYYY / jMM / jDD')} ~ ${jMoment(item.expireDate.slice(0, 10), 'YYYY-MM-DD').format('jYYYY / jMM / jDD')}`}
          </span>
        )}
        menu={this._menu}
        extra={
          <Button
            type="primary"
            disabled={!app.authorize.can('Contract@store')}
            onClick={onAdd}
          >
            {app.translate('main.Add')}
          </Button>
        }
      />
    );
  }
}
