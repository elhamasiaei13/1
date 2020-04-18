import React from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import {LocaleProvider, Modal} from 'antd';
import {connect} from 'react-redux';
import config from 'config/routes';
import PropTypes from 'prop-types';
import Spin from 'components/common/Spin';
import Layout from 'components/layout/Layout';
// import RouteGroup from 'components/layout/RouteGroup';
import NotFound from 'routes/NotFound';
// import localeProvider from 'components/layout/LocaleProvider';
import faIR from 'antd/lib/locale-provider/fa_IR';
import enUS from 'antd/lib/locale-provider/en_US';
import {verifyAuthentication, indexPermissions, showCurrentUser} from 'routes/Auth/Module';
import {showCompany, showModules, showTypes, showNotification} from 'routes/General/Module';

@authorize
@connect((state) => ({
  authenticated: state.Auth.authenticated,
  permissions: state.Auth.permissions,
  notifications: state.General.notifications,
}), {
  verifyAuthentication,
  indexPermissions,
  showCurrentUser,
  showCompany,
  showNotification,
  showModules,
  showTypes,
})
@autobind
/**
 *
 */
export default class Routes extends React.PureComponent {
  static propTypes = {
    authenticated: PropTypes.bool,
    permissions: PropTypes.array,
    verifyAuthentication: PropTypes.func,
    indexPermissions: PropTypes.func,
    showCurrentUser: PropTypes.func,
    showCompany: PropTypes.func,
    showNotification: PropTypes.func,
    showModules: PropTypes.func,
    showTypes: PropTypes.func,
    ability: PropTypes.func,
    notifications: PropTypes.array,
  };

  /**
   *
   */
  componentDidMount() {
    const {authenticated, verifyAuthentication, indexPermissions, showCurrentUser, showCompany, showNotification, showModules, showTypes} = this.props;

    if (authenticated) {
      indexPermissions();
      showCurrentUser({includes: ['profile.company', 'taUserInfo']});
      showCompany();
      showNotification({notifications: ['awd']});
      showModules();
      showTypes({
        includes: [
          // 'children.children.children'
          'form.fields',
          'rule.form.fields',
        ],
        // filterGroups: [
        //   {
        //     filters: [
        //       {
        //         key: 'type_id',
        //         value: null,
        //         operator: 'eq',
        //       },
        //     ],
        //   }],
      }, () => {
        indexPermissions();
      });
    } else if (authenticated === null) {
      verifyAuthentication();
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (np.authenticated && this.props.authenticated !== np.authenticated) {
      np.indexPermissions();
      np.showCurrentUser({includes: ['profile.company', 'positions', 'taInfo']});
      np.showCompany();
      np.showNotification({notifications: []});
      np.showModules();
      np.showTypes({
        includes: [
          // 'children.children.children',
          'form.fields',
          'rule.form.fields',
        ],
        // filterGroups: [
        //   {
        //     filters: [
        //       {
        //         key: 'type_id',
        //         value: null,
        //         operator: 'eq',
        //       },
        //     ],
        //   }],
      }, () => {
        np.indexPermissions();
      });

    }

    if (np.notifications && this.props.notifications !== np.notifications) {
      this._notifications(np.notifications);
    }
  }


  /**
   *
   * @param {String} msg
   * @private
   */
  _notice(msg = '') {
    let _msg = msg.replace('\r\n', '\n');
    _msg = _msg.replace('\\r\\n', '\n');
    _msg = _msg.replace('\\', '\n');
    Modal.error({
      title: app.translate('routes.home.requestsNotice'),
      content: _msg,
    });
  }

  /**
   *
   * @param {Array} notifications
   * @private
   */
  _notifications(notifications) {
    if (notifications && notifications[0]) {
      notifications.map((item) => {
        if (item.type === 'notice') {
          this._notice(item.detail);
        }
      });
    }
  }


  /**
   *
   * @param {Object} route
   * @param {String} path
   * @return {Array}
   * @private
   */
  _getRoutes(route, path) {
    let _path = app._.clone(path);
    let _routes = [];

    if (route.path) {
      _path = `${_path}/${route.path}`;
    }

    _routes.push(
      <Route
        key={_path}
        exact
        path={_path}
        component={route.component}
      />,
      ...this._get(route.routes, _path),
    );

    // if (app._.isEmpty(route.routes)) {
    //   _routes.push(
    //     <Route
    //       key={_path}
    //       exact={route.exact}
    //       path={_path}
    //       component={route.component}
    //     />,
    //   );
    // } else {
    //   // _routes.push(
    //   //   <Route
    //   //     key={_path}
    //   //     exact={route.exact}
    //   //     path={_path}
    //   //     component={route.component}
    //   //   >
    //   //     <RouteGroup pathname={_path}>
    //   //       <Switch>
    //   //         {this._get(route.routes, _path)}
    //   //         <Route
    //   //           component={NotFound}
    //   //         />
    //   //       </Switch>
    //   //     </RouteGroup>
    //   //   </Route>,
    //   // );
    // }

    return _routes;
  }

  /**
   *
   * @param {Object} route
   * @return {Array}
   * @private
   */
  _getRedirects(route) {
    let _routes = [];

    _routes.push(
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        render={() => (
          <Redirect
            to={route.routes[0].path}
          />
        )
        }
      />,
    );

    return _routes;
  }

  /**
   *
   * @param {Object[]} routes
   * @param {String} [path='']
   * @return {Array}
   * @private
   */
  _get(routes, path = '') {
    const {ability} = this.props;
    let _routes = [];

    routes.map((route) => {
      switch (route.type) {
        case 'route':
          if (ability(...route.permissions)) {
            _routes.push(
              ...this._getRoutes(route, path)
            );
          }
          break;
        case 'redirect':
          _routes.push(
            ...this._getRedirects(route)
          );
          break;
      }
    });

    return _routes;
  }

  /**
   *
   * @param {Object[]} routes
   * @return {Array}
   * @private
   */
  _getAuth(routes) {
    let _routes = [];

    routes.map((route, index) => {
      _routes.push(
        <Route
          key={++index}
          exact
          path={`/${route.path}`}
          component={route.component}
        />,
      );
    });

    _routes.push(
      <Route
        key={0}
        render={() => (
          <Redirect
            to={{
              pathname: '/login',
              state: {referrer: window.location.pathname.slice(1)},
            }}
          />
        )
        }
      />,
    );

    return _routes;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {authenticated, permissions} = this.props;

    return (
      <Router>
        <LocaleProvider locale={app.lang.locale === 'fa' ? faIR : enUS}>
          {
            (authenticated === null || (authenticated && permissions.length === 0)) ? (
              <Spin
                size="large"
                tip={app.translate('main.Initializing App')}
                spinning
                style={{
                  position: 'absolute',
                  top: 'calc(50% - 28px)',
                  left: `calc(50% - ${66.77 / 2}px)`,
                }}
              />
            ) : (
              authenticated ? (
                <Layout>
                  <Switch>
                    {this._get(config.routes.home)}
                    <Route
                      component={NotFound}
                    />
                  </Switch>
                </Layout>
              ) : (
                <Switch>
                  {this._getAuth(config.routes.auth)}
                </Switch>
              )
            )
          }
        </LocaleProvider>
      </Router>
    );
  }
}
