import React from 'react';
import {Layout, Menu} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Config from 'config/routes';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import PropTypes from 'prop-types';
import Avatar from 'components/common/Avatar';
import uuidv1 from 'uuid/v1';

@withRouter
@authorize
@connect((state) => ({
  currentUser: state.Auth.currentUser,
  company: state.General.company,
}))
@autobind
/**
 *
 */
export default class Drawer extends React.PureComponent {
  static propTypes = {
    company: PropTypes.object,
    collapsed: PropTypes.bool,
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    currentUser: PropTypes.object,
    ability: PropTypes.func,
  };

  static defaultProps = {
    collapsed: false,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  /**
   *
   * @param {Boolean} collapsed
   */
  onCollapse(collapsed) {
    this.setState({collapsed});
  }

  /**
   *
   * @param {Object} item
   */
  onMenuClick({key}) {
    const {location, history} = this.props;

    // if (/^path::./.test(key)) {
    let path = key.substring(6);

    if (location.pathname !== path) {
      history.push(path);
    }
    // }
  }

  /**
   *
   * @param {Array} routes
   * @param {Object} path
   * @param {String} parentIds
   * @return {Array}
   */
  _getRoutes(routes, path = '', parentIds = '') {
    const {ability, currentUser} = this.props;
    let _routes = [];
    let isAdmin = (currentUser && currentUser.id && currentUser.id === 1);
    routes.map((route) => {
      let _path = app._.cloneDeep(path);
      let id = route.id && route.id ? route.id : route.path ? route.path : route.icon ? route.icon : uuidv1();

      let _isNotAdmin = -1;
      _isNotAdmin = route.permissions.findIndex((item) => item === 'isNotAdmin');
      // if (route.icon) {
      if (route.drawer) {
        if (route.path) {
          _path = `${_path}/${route.path}`;
        }
        if (ability(...route.permissions) || isAdmin) {
          if (app._.isEmpty(route.routes)) {
            _routes.push(
              <Menu.Item
                key={`path::${_path}`}
                disabled={(!ability(...route.permissions)) || (isAdmin && _isNotAdmin > -1)}
              >
                <MaterialIcon
                  name={route.icon}
                  style={{
                    fontSize: '1.5rem',
                  }}
                />
                <span>{route.name}</span>
              </Menu.Item>,
            );
          } else {
            _routes.push(
              <Menu.SubMenu
                key={`item${parentIds}-${id}`}
                disabled={!ability(...route.permissions) || (isAdmin && _isNotAdmin > -1)}
                title={
                  [
                    <MaterialIcon
                      key={0}
                      name={route.icon}
                      style={{
                        fontSize: '1.5rem',
                      }}
                    />,
                    <span
                      key={1}
                    >
                    {route.name}
                  </span>,
                  ]
                }
              >
                {this._getRoutes(route.routes, _path, `${parentIds}-${id}`)}
              </Menu.SubMenu>,
            );
          }
        }
      }
    });

    return _routes;
  }

  /**
   *
   * @param {Array} routes
   * @param {Array} current
   * @param {String} parentIds
   * @param {Number} count
   * @return {Array}
   */
  getOpenKeys(routes, current, parentIds = '', count = 0) {
    let _keys = [];
    routes.map((route) => {

      let id = route && route.id ? route.id : route && route.name ? route.name : uuidv1();

      if (route.icon) {
        let index = current.indexOf(route.path);
        let id = route.id && route.id ? route.id : route.path ? route.path : route.icon ? route.icon : uuidv1();

        if (index === count) {
          if (!app._.isEmpty(route.routes)) {
            _keys.push(`item${parentIds}-${id}`);
            _keys.push(...this.getOpenKeys(route.routes, current, `${parentIds}-${id}`, ++count));
          }
        }
      }
    });

    return _keys;
  }

  /**
   *
   * @return {Array}
   */
  get defaultOpenKeys() {
    const {location} = this.props;

    let _current = location.pathname;
    _current = _current.substring(1);
    _current = _current.split('/');
    return this.getOpenKeys(Config.routes.home, _current);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {collapsed} = this.state;
    const {location, company} = this.props;
    return (
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        className="drawer"
        width={256}
      >
        <div className="companyInfo">
          <span
            style={{
              border: '2px solid rgba(255, 255, 255, .67)',
              borderRadius: '50%',
              display: 'inline-grid',
            }}
          >
            <Avatar
              src={company.logo}
              size="large"
              text={company.name}
            />
          </span>
          <br/>
          <span className="companyName">
            {company.name}
          </span>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[`path::${location.pathname}`]}
          defaultOpenKeys={this.defaultOpenKeys}
          // openKeys={this.defaultOpenKeys}
          style={{height: '100%', borderRight: 0}}
          className="drawer-menu"
          onClick={this.onMenuClick}
        >
          {this._getRoutes(Config.routes.home)}
        </Menu>
      </Layout.Sider>
    );
  }
}
