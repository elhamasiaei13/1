import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Menu} from 'antd';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';
import {connect} from 'react-redux';
import {indexUserInsurances, emptyUserInsurances, destroyUserInsurances} from './../../Module';

@authorize
@connect((state) => ({
  insurances: state.Basic.Personnel.insurances,
}), {
  index: indexUserInsurances,
  empty: emptyUserInsurances,
  destroy: destroyUserInsurances,
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
    insurances: PropTypes.array,
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
        <Menu.Item key="edit" disabled={!can('Insurance@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('Insurance@destroy')}>
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
      title: app.translate('routes.home.basic.personnel.Removing insurance'),
      content: app.translate('routes.home.basic.personnel.Are you sure removing insurance with number', {number: item.code}),
      onOk: () => destroy(item.id),
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {onAdd, insurances, onEdit, types} = this.props;

    return (
      <ListView
        title={app.translate('routes.home.basic.personnel.Insurances')}
        loading={loading}
        items={insurances}
        primaryText={(item) => {
          let _index = types.findIndex((_item) => _item.id == item.typeId);

          if (_index > -1) {
            return types[_index].name;
          }

          return item.typeId;
        }}
        secondaryText="code"
        onClick={app.authorize.can('Insurance@update') ? onEdit : undefined}
        menu={this._menu}
        extra={
          <Button
            type="primary"
            disabled={!app.authorize.can('Insurance@store')}
            onClick={onAdd}
          >
            {app.translate('main.Add')}
          </Button>
        }
      />
    );
  }
}
