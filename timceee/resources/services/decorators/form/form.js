import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {register, initialize, deRegister} from './Module';
import store from 'store';

const form = (Component, options) => {
  const defaultOptions = {
    disabled: () => false,
    masked: () => false,
  };

  // noinspection JSUnusedAssignment
  options = Object.assign({}, defaultOptions, options);

  /**
   *
   */
  @connect((state) => ({
    values: state.Forms[options.name],
  }), {
    register,
    initialize,
    deRegister,
  }, null, {withRef: true})
  @autobind
  class Form extends React.PureComponent {
    static propTypes = {
      values: PropTypes.object,
      register: PropTypes.func,
      initialize: PropTypes.func,
      deRegister: PropTypes.func,
    };

    static childContextTypes = {
      _form: PropTypes.object,
    };

    /**
     *
     * @param {Object} props
     */
    constructor(props) {
      super(props);

      if (!options.name) {
        throw new Error('name function must be decorated');
      }

      if (!options.onSubmit) {
        throw new Error('onSubmit function must be decorated');
      }

      props.register(options.name);
    }

    /**
     *
     */
    componentWillUnmount() {
      super.componentWillUnmount();

      this.props.deRegister(options.name);
    }

    /**
     *
     * @return {Object}
     */
    getChildContext() {
      return {
        _form: {
          name: options.name,
          disabled: options.disabled(this.props, store.dispatch),
          masked: options.masked(this.props, store.dispatch),
          onSubmit: (field, value, callback) => options.onSubmit({[field]: value}, this.props, store.dispatch, callback),
          afterSubmit: (field, value) => this._initialize(field, value),
        },
      };
    }

    /**
     *
     * @return {*}
     */
    getWrappedInstance() {
      return this.wrappedComponent;
    }

    /**
     *
     * @param {String|Object} [first={}]
     * @param {String|Number} [second=null]
     * @private
     */
    _initialize(first = {}, second = null) {
      let values = first;

      if (app._.isString(first)) {
        values = app._.clone(this.props.values);

        values[first] = second;
      }

      this.props.initialize(options.name, values);
    }

    /**
     *
     * @return {XML}
     */
    render() {
      return (
        <Component
          {...app._.omit(this.props, ['register', 'deRegister'])}
          ref={(input) => this.wrappedComponent = input}
          initialize={this._initialize}
        />
      );
    }
  }

  return Form;
};

export default (options = {}) => {
  return (target) => form(target, app._.cloneDeep(options));
};
