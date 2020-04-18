import React from 'react';
import {Breadcrumb as AntBreadcrumb} from 'antd';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Config from 'config/routes';
import MaterialIcon from 'components/common/MaterialIcon';

@withRouter
@autobind
/**
 *
 */
export default class Breadcrumb extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
  };

  /**
   *
   * @param {Array} routes
   * @param {Array} current
   * @param {String} [path='']
   * @param {String} [parentIds='']
   * @param {Number} [count=0]
   * @return {Array}
   */
  getBreadCrumbs(routes, current, path = '', parentIds = '', count = 0) {
    const {location} = this.props;
    let _keys = [];

    routes.map((route) => {
      let _path = app._.clone(path);

      // if (route.icon) {
      if (route.path) {
        _path += '/' + route.path;
      }

      let index = current.indexOf(route.path);

      if (index === count) {
        if (route.component && _path !== location.pathname) {
          _keys.push(
            <AntBreadcrumb.Item key={parentIds + route.id}>
              <Link to={_path}>
                  <span>
                    {
                      route.icon &&
                      <MaterialIcon
                        name={route.icon}
                        size="tiny"
                      />
                    }
                    {route.name}
                  </span>
              </Link>
            </AntBreadcrumb.Item>,
          );
        } else {
          _keys.push(
            <AntBreadcrumb.Item
              key={parentIds + route.id}
            >
                <span>
                  {
                    route.icon &&
                    <MaterialIcon
                      name={route.icon}
                      size="tiny"
                    />
                  }
                  {route.name}
                </span>
            </AntBreadcrumb.Item>,
          );
        }

        if (!app._.isEmpty(route.routes)) {
          _keys.push(...this.getBreadCrumbs(route.routes,
            current, _path, parentIds + '-' + route.id, ++count));
        }
      }
      // }
    });

    return _keys;
  }

  /**
   *
   * @return {Array}
   * @private
   */
  get _breadCrumbs() {
    const {location} = this.props;

    let _current = location.pathname;
    _current = _current.substring(1);
    _current = _current.split('/');

    return this.getBreadCrumbs(Config.routes.home, _current);
  }

  /**
   * @return {XML}
   */
  render() {
    return (
      <AntBreadcrumb
        separator={app.lang.direction === 'rtl' ?
          <MaterialIcon name='chevron-left' size="tiny"/> :
          <MaterialIcon name='chevron-right' size="tiny"/>
        }
        style={{
          margin: '12px 0',
          padding: '0 24px',
        }}
      >
        {this._breadCrumbs}
      </AntBreadcrumb>
    );
  }
}
