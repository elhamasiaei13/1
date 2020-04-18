import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter
@autobind
/**
 *
 */
export default class RouteGroup extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    pathname: PropTypes.string,
  };

  /**
   * @return {XML}
   */
  render() {
    const {children, location, pathname} = this.props;

    return (
      <div
        style={app._.startsWith(location.pathname, pathname) ? {height: '100%'} : {}}
      >
        {children}
      </div>
    );
  }
}
