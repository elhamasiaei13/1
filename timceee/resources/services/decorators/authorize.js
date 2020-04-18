import React from 'react';
import PropsTypes from 'prop-types';
import Auth from 'services/Authorize';
import { connect } from 'react-redux';

const authorize = (Component) => {
  /**
   *
   */
  @connect((state) => ({}), {}, null, { withRef: true })
  @autobind
  class Authorize extends React.PureComponent {
    static propTypes = {
      _authorize: PropsTypes.instanceOf(Auth),
    };

    /**
     *
     * @return {*|T}
     */
    getWrappedInstance() {
      return this.wrappedComponent;
    }

    /**
     *
     * @return {XML}
     */
    render() {
      const { ...rest } = this.props;

      return (
        <Component
          {...rest}
          ref={(input) => this.wrappedComponent = input}
          can={app.authorize.can}
          ability={app.authorize.ability}
        />
      );
    }
  }

  return Authorize;
};

export default (target) => {
  return authorize(target);
};
