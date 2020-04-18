import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import jMoment from 'moment-jalaali';
import {Popover} from 'antd';

@autobind
/**
 *
 */
export default class Day extends React.PureComponent {
  static propTypes = {
    date: PropTypes.string,
    onHover: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        content: PropTypes.string,
      }),
    ),
    status: PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    selected: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    date: '',
    onHover: (date) => {
    },
    onMouseDown: (date) => {
    },
    onMouseUp: (date) => {
    },
    events: [],
    selected: false,
    disabled: false,
  };

  /**
   *
   * @private
   */
  _onMouseEnter() {
    const {onHover, date, disabled} = this.props;

    if (date !== '' && !disabled) {
      onHover(date);
    }
  }

  /**
   *
   * @private
   */
  _onMouseDown() {
    const {onMouseDown, date, disabled} = this.props;

    if (date !== '' && !disabled) {
      onMouseDown(date);
    }
  }

  /**
   *
   * @private
   */
  _onMouseUp() {
    const {onMouseUp, date, disabled} = this.props;

    if (date !== '' && !disabled) {
      onMouseUp(date);
    }
  }

  /**
   *
   * @return {XML}
   * @private
   */
  _renderTitle() {
    const {status, date} = this.props;

    return (
      <div key={0}>
        {
          status &&
          <p className="left" style={{color: status.color}}>{status.title}</p>
        }
        <p className="right">{date}</p>
      </div>
    );
  }

  /**
   *
   * @return {XML[]}
   * @private
   */
  _renderContent() {
    const {status, events} = this.props;
    let _events = [];

    if (status && status.description) {
      _events.push(
        <div key={0}>
          <p
            style={{
              width: '100%',
              textAlign: 'center',
              borderBottom: events.length > 0 && '1px rgba(158, 158, 158, .5) solid',
              marginBottom: 4,
            }}
          >
            {status.description}
          </p>
        </div>,
      );
    }

    events.map((event, index) => _events.push(
      <div key={index + 1}>
        <MaterialIcon name="checkbox-blank-circle" style={{color: event.color}}/>
        <p>{event.content}</p>
      </div>,
    ));

    return _events;
  }

  /**
   *
   * @return {String}
   * @private
   */
  _renderClassNames() {
    const {date, disabled, selected} = this.props;
    let classNames = 'day';

    if (date === jMoment().format('jYYYY-jMM-jDD')) {
      classNames = `${classNames} today`;
    }

    if (date === '') {
      classNames = `${classNames} empty`;
    } else if (disabled) {
      classNames = `${classNames} disabled`;
    } else {
      switch (selected) {
        case true:
          classNames = `${classNames} selected`;
          break;
        case 'range':
          classNames = `${classNames} range`;
          break;
        case 'start':
          classNames = `${classNames} range start`;
          break;
        case 'end':
          classNames = `${classNames} range end`;
          break;
        case 'selecting':
          classNames = `${classNames} range selecting`;
          break;
      }
    }

    return classNames;
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _renderStyle() {
    const {status, events} = this.props;
    let style = {};

    if (status) {
      style.color = status.color;
    }

    if (!app._.isEmpty(events)) {
      let _boxShadow = '';

      if (events.length === 1) {
        _boxShadow = `${events[0].color} 0 -4px 0 0 inset`;
      } else if (events.length <= 3) {
        let _boxShadows = [];

        events.map((event, index) => {
          _boxShadows.push(
            `${event.color} 0 -${(index + 1) * 2}px 0 0 inset`,
          );
        });

        _boxShadow = _boxShadows.join(', ');
      } else {
        let _boxShadows = [];

        for (let _index = 0; _index < 3; _index++) {
          _boxShadows.push(
            `${events[_index].color} 0 -${(_index + 1) * 2}px 0 0 inset`,
          );
        }

        _boxShadow = _boxShadows.join(', ');
      }

      style.boxShadow = _boxShadow;
    }

    return style;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {date, events, status} = this.props;

    const _day = (
      <td
        className={this._renderClassNames()}
        onMouseEnter={this._onMouseEnter}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        style={this._renderStyle()}
      >
        {date === '' ? date : date.substr(8, 2) * 1}
      </td>
    );

    return events.length > 0 || status ? (
      <Popover
        content={this._renderContent()}
        title={this._renderTitle()}
        overlayClassName="calendar-events"
        mouseEnterDelay={1}
        arrowPointAtCenter
      >
        {_day}
      </Popover>
    ) : _day;
  }
}
