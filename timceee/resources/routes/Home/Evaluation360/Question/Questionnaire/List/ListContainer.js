import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import PropTypes from 'prop-types';
import List from './List';
import {Menu, Button} from 'antd';

@authorize
@autobind
/**
 *
 */
export default class ListContainer extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onSetting: PropTypes.func,
    onDelete: PropTypes.func,
    can: PropTypes.func,
    activeItem: PropTypes.number,
    statusForm: PropTypes.string,
  };

  static defaultProps = {
    loading: true,
    activeItem: undefined,
    statusForm: undefined,
  };

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _renderMenu(item) {
    const {can, onEdit, onSetting, onDelete} = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'info':
              onSetting(item, 'info');
              break;
            case 'settingQuestionnaire':
              onSetting(item, 'settingQuestionnaire');
              break;
            case 'setting':
              onSetting(item, 'setting');
              break;
            case 'edit':
              onEdit(item);
              break;
            case 'delete':
            default:
              onDelete(item);
          }
        }}
      >
        <Menu.Item key="info" disabled={!can('Questionnaire@index')}>
          <MaterialIcon name="information-outline"/>
          {app.translate('main.Info')} {app.translate('routes.home.evaluation-360.Questionnaire')}
        </Menu.Item>
        <Menu.Item key="settingQuestionnaire" disabled={!can('Questionnaire@update')}>
          <MaterialIcon name="settings"/>
          {app.translate('main.Setting')} {app.translate('routes.home.evaluation-360.Questionnaire')}
        </Menu.Item>
        <Menu.Item key="setting" disabled={!can('Questionnaire@update')}>
          <MaterialIcon name="account-settings-variant"/>
          {app.translate('main.Setting')} 360
        </Menu.Item>
        <Menu.Item key="edit" disabled={!can('Questionnaire@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('Questionnaire@destroy')}>
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  _renderExtra() {
    const {can, onReload, statusForm, activeItem, onAdd, loading} = this.props;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={onReload}
          disabled={!can('Questionnaire@index') || loading}
        >
          <MaterialIcon name="reload" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          disabled={!can('Questionnaire@store') || activeItem || statusForm === 'editing'}
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
    const {...rest} = this.props;

    let _props = app._.omit(rest, ['menu', 'extra', 'onEdit', 'onDelete', 'onReload', 'onAdd']);

    return (
      <List
        menu={this._renderMenu}
        extra={this._renderExtra()}
        {..._props}
      />
    );
  }
}
