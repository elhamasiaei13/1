import React from 'react';
import {connect} from 'react-redux';
import {Layout, Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
// import Hamburger from 'components/common/Hamburger';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import screenFull from 'screenfull';
import {logout} from 'routes/Auth/Module';
import Avatar from 'components/common/Avatar';

@withRouter
@connect((state) => ({
  currentUser: state.Auth.currentUser,
}), {
  logout,
})
@autobind
/**
 *
 */
export default class Nav extends React.PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
    onHamburgerToggle: PropTypes.func,
    history: PropTypes.object,
    logout: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isFullScreen: false,
    };

    screenFull.onchange(() => this.setState({isFullScreen: screenFull.isFullscreen}));
  }

  /**
   *
   * @param {Object} item
   * @param {String} key
   * @param {Array} keyPath
   */
  onClick({key, keyPath}) {
    const {logout, history} = this.props;

    switch (key) {
      case 'fullscreen':
        screenFull.toggle();
        return;
      case 'settings':
        history.push('/settings');
        return;
      case 'profile':
        history.push('/profile');
        return;
    }

    if (keyPath.indexOf('language') >= 0) {
      if (app.lang.set(key)) {
        location.reload();
      }
    } else if (keyPath.indexOf('account') >= 0) {
      if (key === 'logout') {
        logout();
      }
    }
  }

  /**
   *
   * @return {XML}
   * @static
   * @private
   */
  static get _languageMenu() {
    return (
      <Menu.SubMenu
        key="language"
        title={(() => {
          switch (app.lang.locale) {
            case 'en':
              return 'English';
            case 'fa':
            default:
              return 'فارسی';
          }
        })()}
      >
        <Menu.Item key="fa" className={app.lang.locale === 'fa' && 'jActive'} disabled={app.lang.locale === 'fa'}>فارسی</Menu.Item>
        <Menu.Item key="en" className={app.lang.locale === 'en' && 'jActive'} disabled={app.lang.locale === 'en'}>English</Menu.Item>
      </Menu.SubMenu>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _accountMenu() {
    const {currentUser} = this.props;

    return (
      <Menu.SubMenu
        key="account"
        title={
          <span
            style={{
              border: '2px solid rgba(255, 255, 255, .67)',
              borderRadius: '50%',
              marginTop: '15px',
              display: 'grid',
            }}
          >
                <Avatar
                  src={currentUser && currentUser.profile && currentUser.profile.avatar}
                  text={currentUser && currentUser.profile ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}` : currentUser.name}
                />
              </span>
        }
      >
        <Menu.Item key="profile">{currentUser.profile ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}` : currentUser.name}</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">{app.translate('routes.auth.Logout')}</Menu.Item>
      </Menu.SubMenu>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {isFullScreen} = this.state;
    // const {onHamburgerToggle} = this.props;

    return (
      <Layout.Header className="header nav">
        <h2 className="logo">
          {app.translate('main.appName')}
        </h2>
        <Menu
          onClick={this.onClick}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['3']}
          style={{lineHeight: '64px'}}
          selectable={false}
        >
          {Nav._languageMenu}
          <Menu.Item key="fullscreen">
            <MaterialIcon
              name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
              size="small"
            />
          </Menu.Item>
          { /* <Menu.Item key="settings">
            <MaterialIcon
              name="settings"
              size="small"
            />
          </Menu.Item> */ }
          {this._accountMenu}
          {/* <Hamburger*/}
            {/* color="white"*/}
            {/* onHamburgerToggle={onHamburgerToggle}*/}
            {/* className="hamburger-menu"*/}
          {/* />*/}
        </Menu>
      </Layout.Header>
    );
  }
}
