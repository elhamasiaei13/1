import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Menu} from 'antd';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';
import {connect} from 'react-redux';
import {indexUserFamilies, emptyUserFamilies, destroyUserFamily} from './../../Module';

@authorize
@connect((state) => ({
  families: state.Basic.Personnel.families,
}), {
  index: indexUserFamilies,
  empty: emptyUserFamilies,
  destroy: destroyUserFamily,
})
@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    can: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    index: PropTypes.func,
    empty: PropTypes.func,
    destroy: PropTypes.func,
    families: PropTypes.array,
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
        <Menu.Item key="edit" disabled={!can('FamiliesInfo@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('FamiliesInfo@destroy')}>
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
      title: app.translate('routes.home.basic.personnel.Removing family'),
      content: app.translate('routes.home.basic.personnel.Are you sure removing family with name', {name: `${item.name} ${item.family}`}),
      onOk: () => destroy(item.id),
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {onAdd, families, onEdit} = this.props;

    return (
      <ListView
        title={app.translate('routes.home.basic.personnel.Families')}
        loading={loading}
        items={families}
        primaryText={(item) => `${item.name} ${item.family}`}
        secondaryText={(item) => app.translate(`routes.home.basic.personnel.${item.relation}`)}
        onClick={app.authorize.can('FamiliesInfo@update') ? onEdit : undefined}
        menu={this._menu}
        extra={
          <Button
            type="primary"
            disabled={!app.authorize.can('FamiliesInfo@store')}
            onClick={onAdd}
          >
            {app.translate('main.Add')}
          </Button>
        }
      />
    );
  }
}
