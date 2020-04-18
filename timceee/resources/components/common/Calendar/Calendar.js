import React from 'react';
import Spin from 'components/common/Spin';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Yearly, Monthly} from './Modes';
import 'assets/styles/calendar.styl';

@autobind
/**
 *
 */
export default class Calendar extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.func,
    onChange: PropTypes.func,
    year: PropTypes.number,
    selected: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
      }),
    ),
    events: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        color: PropTypes.string,
        content: PropTypes.string,
      }),
    ),
    statuses: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        color: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    extra: PropTypes.node,
    loading: PropTypes.bool,
    mode: PropTypes.oneOf([
      'yearly', 'monthly',
    ]),
  };

  static defaultProps = {
    disabled: (date) => {
    },
    onChange: () => {
    },
    year: jMoment().jYear(),
    loading: false,
    mode: 'yearly',
  };

  /**
   *
   */
  reset() {
    this._calendar.reset();
  }

  /**
   *
   * @return {Array}
   */
  selected() {
    return this._calendar.selected;
  }

  /**
   *
   */
  get year() {
    return this._calendar.year;
  }

  /**
   *
   */
  get month() {
    return this._calendar.month;
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _mode() {
    const {mode, ...rest} = this.props;

    switch (mode) {
      case 'monthly':
        return (
          <Monthly
            ref={(input) => this._calendar = input}
            {...rest}
          />
        );
      case 'yearly':
      default:
        return (
          <Yearly
            ref={(input) => this._calendar = input}
            {...rest}
          />
        );
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        {this._mode}
      </Spin>
    );
  }
}
