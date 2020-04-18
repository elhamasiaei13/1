import React from 'react';
import PropTypes from 'prop-types';
import TreeView from 'components/common/TreeView';
import {connect} from 'react-redux';
import {Card, Modal, Tooltip} from 'antd';
import {indexRoles, indexPermissions} from './../../../Roles/Module';
import MaterialIcon from 'components/common/MaterialIcon';

@connect((state) => ({
  roles: state.Basic.Roles.roles,
  permissions: state.Basic.Roles.permissions,

}), {
  indexRoles,
  indexPermissions,
})
@autobind
/**
 *
 */
export default class PermissionWrapper extends React.PureComponent {
  static propTypes = {
    roles: PropTypes.array,
    defaultSelectedKeys: PropTypes.any,
    title: PropTypes.string,
    onSelect: PropTypes.func,
    indexRoles: PropTypes.func,
    indexPermissions: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    defaultSelectedKeys: undefined,
    onSelect: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.userPemissionsConut = 0;
    this.state = {
      render: 0,
      defaultCheckedKeys: [],
      defaultSelectedKeys: props.defaultSelectedKeys,
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.props.indexRoles({
      includes: ['perms'],
    }, (err) => {
      if (!err) {
        this.setState({loading: false});
      }
      this.props.indexPermissions();
    });
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    // console.log('n', np);
    this.setState({
      render: false,
      defaultSelectedKeys: np.defaultSelectedKeys,
    }, () => {
      this.setState({
        render: true,
      });
    });
  }

  _pemissions(unicKey, permissions) {
    let data = [];
    let _inner = {};

    app._.map(permissions, (permission) => {
      this.userPemissionsConut++;
      _inner = {
        id: unicKey + '_' + permission.id,
        name: permission.name,
        //  disableCheckbox: true,
        children: this._pemissions(unicKey, permission.children),
      };
      data.push(_inner);
    });

    return data;
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _getItems(roles) {
    this.userPemissionsConut = 0;
    let data = [];
    let _inner = {};
    app._.map(roles, (role) => {
      _inner = {
        id: role.id,
        name: role.displayName,
        color: role.color ? role.color : '#ccc',
      };
      data.push(_inner);
    });

    return data;
  }

  _defaultCheckedKeys() {
    let data = [];
    let {roles} = this.props;

    app._.map(roles, (role) => {
      app._.map(role.perms, (perm) => {
        data.push(role.id + '_' + perm.id);
      });
    });

    return data;
  }

  _onSearch() {

  }

  _onPressEnter() {

  }

  _onChangeSearchInput() {

  }

  _showPerms(roleName, roleId) {
    let {permissions} = this.props;
    let data = this._pemissions(roleId, permissions);
    let defaultCheckedKeys = this._defaultCheckedKeys();
    Modal.info({
      title: roleName,
      content: <div
        style={{
          height: '100%',
          overflow: 'auto',
        }}>
        <TreeView
          className="jTree"
          // checkable
          treeData={data}
          jsSearch={true}
          titleKeys={['name']}
          // disableAll
          defaultCheckedKeys={defaultCheckedKeys}
          expandedKeys={defaultCheckedKeys}
          showCheckIcon={defaultCheckedKeys}
        />
      </div>,
      maskClosable: true,
      okText: app.translate('main.Close'),
      okType: 'default',
      style: {
        height: '80%',
      },
      className: 'jModal',
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      title,
      onSelect //, defaultSelectedKeys,
    } = this.props;
    const {defaultSelectedKeys, render} = this.state;
    let treeData = this._getItems(this.props.roles);
    return (
      render && defaultSelectedKeys !== undefined ?
        <Card
          title={app.translate('routes.home.basic.roles.Personnel Roles')}
          style={{
            height: 'calc(100% - 124px)',
          }}
        >

          <TreeView
            checkable
            multiple
            titleKeys={['name']}
            // showCheckIcon={this._defaultCheckedKeys()}
            onChangeSearchInput={this._onChangeSearchInput}
            onPressEnter={this._onPressEnter}
            onSearch={this._onSearch}
            onSelect={onSelect}
            onCheck={onSelect}
            treeData={treeData}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultCheckedKeys={defaultSelectedKeys}
            expandedKeys={this._defaultCheckedKeys()}
            jsSearch={true}
            renderItem={
              (text, record) =>
                <span
                  style={{
                    display: 'flex',
                    lineHeight: 0,
                    margin: 0,
                  }}
                >
                  <MaterialIcon size="tiny" name="format-color-fill" style={{color: record.color ? record.color : '#ccc'}}/>
                  {text}
                  <Tooltip placement="bottom" title={app.translate('routes.home.basic.roles.Perm Info')}>
                  <MaterialIcon
                    name="eye"
                    size="tiny"
                    onClick={() => this._showPerms(record.name, record.id)}
                  />
                  </Tooltip>
              </span>
            }
            className="jTree"
          />
        </Card>
        :
        <div/>
    );
  }
}
