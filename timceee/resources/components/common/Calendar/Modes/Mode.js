import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import {Card} from 'antd';

@autobind
/**
 *
 * @extends React.PureComponent
 * @abstract
 */
export default class Mode extends React.PureComponent {
  static propTypes = {
    year: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    selected: PropTypes.arrayOf(PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    })),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    footer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    onChange: PropTypes.func,
    disabled: PropTypes.func,
  };

  static defaultProps = {
    disabled: () => false,
    statuses: [],
    events: [],
    year: jMoment().jYear(),
    selected: [],
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }


  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.selected, np.selected) && !app._.isEqual(this.state.selected, np.selected)) {
      this.setState({
        selected: np.selected,
      });
    }

    if (this.props.year !== np.year) {
      this.setState({
        year: np.year,
      });
    }
  }

  /**
   *
   * @return {{selected, start: null}}
   * @private
   */
  get _initialState() {
    return {
      minYear: 1390,
      maxYear: 1402,
      year: this.props.year,
      selected: this.props.selected,
      start: null,
    };
  }

  /**
   *
   */
  reset() {
    this.setState({
      selected: [],
      start: null,
    });
  }

  /**
   *
   * @return {Array}
   */
  get selected() {
    return this.state.selected;
  }

  /**
   *
   * @param {String} end
   * @return {String|Null}
   * @private
   */
  _tempStart(end) {
    const {year} = this.state;
    let _endMonth = parseInt(end.substr(5, 2));
    let _endDay = parseInt(end.substr(8, 2));

    if (_endDay === jMoment.jDaysInMonth(year, _endMonth)) {
      if (_endMonth === 11) {
        return null;
      }

      return `${year}-${sprintf('%02s', _endMonth + 1)}-01`;
    }

    return `${year}-${sprintf('%02s', _endMonth)}-${sprintf('%02s', _endDay + 1)}`;
  }

  /**
   *
   * @param {String} start
   * @return {String|Null}
   * @private
   */
  _tempEnd(start) {
    const {year} = this.state;
    let _startMonth = parseInt(start.substr(5, 2));
    let _startDay = parseInt(start.substr(8, 2));

    if (_startDay === 1) {
      if (_startMonth === 1) {
        return null;
      }

      return `${year}-${sprintf('%02s', _startMonth - 1)}-${jMoment.jDaysInMonth(year, _startMonth - 1)}`;
    }

    return `${year}-${sprintf('%02s', _startMonth)}-${sprintf('%02s', _startDay - 1)}`;
  }

  /**
   *
   * @param {String} start
   * @param {String} end
   * @param {Array} selected
   * @return {Array}
   * @private
   */
  _changeSelected(start, end, selected = null) {
    if (!selected) {
      selected = this.state.selected;
    }

    let _selected = app._.cloneDeep(selected);
    let _start = '';
    let _end = '';
    let _toAdd = [];
    let _toRemove = [];

    if (start > end) {
      _start = end;
      _end = start;
    } else {
      _start = start;
      _end = end;
    }

    for (let _index in selected) {
      let _selected = selected[_index];

      if (_selected.start === _start && _selected.end === _end) {
        _toRemove.push(_index);

        break;
      } else if (_selected.start < _start && _end < _selected.end) {
        _toRemove.push(_index);

        let _tempStart = this._tempStart(_end);
        if (_tempStart) {
          _toAdd.push({
            start: _tempStart < _selected.end ? _tempStart : _selected.end,
            end: _selected.end,
          });
        }

        let _tempEnd = this._tempEnd(_start);
        if (_tempEnd) {
          _toAdd.push({
            start: _selected.start,
            end: _tempEnd > _selected.start ? _tempEnd : _selected.start,
          });
        }

        break;
      } else if (_selected.start === _start && _end < _selected.end) {
        _toRemove.push(_index);

        let _tempStart = this._tempStart(_end);
        if (_tempStart) {
          _toAdd.push({
            start: _tempStart,
            end: _selected.end,
          });
        }
      } else if (_selected.start < _start && _end === _selected.end) {
        _toRemove.push(_index);

        let _tempEnd = this._tempEnd(_start);
        if (_tempEnd) {
          _toAdd.push({
            start: _selected.start,
            end: _tempEnd,
          });
        }
      } else if (_start < _selected.start && _selected.end < _end) {
        _toRemove.push(_index);

        _toAdd.push({
          start: _start,
          end: _end,
        });
      } else if (_start < _selected.start && _selected.start < _end && _end <= _selected.end) {
        _toRemove.push(_index);

        _toAdd.push({
          start: _start,
          end: _selected.end,
        });
      } else if (_selected.start <= _start && _start < _selected.end && _selected.end < _end) {
        _toRemove.push(_index);

        _toAdd.push({
          start: _selected.start,
          end: _end,
        });
      } else if (_selected.start === _selected.end && _end === _selected.end && _start < _selected.start) {
        _toRemove.push(_index);

        _toAdd.push({
          start: _start,
          end: _selected.end,
        });
      } else if (_selected.start === _selected.end && _start === _selected.start && _selected.end < _end) {
        _toRemove.push(_index);
        _toAdd.push({
          start: _selected.start,
          end: _end,
        });
      } else if (_start === _selected.end && _end > _selected.end) {
        _toRemove.push(_index);

        _toAdd.push({
          start: _selected.start,
          end: _end,
        });
      } else if (_end === _selected.start && _start < _selected.start) {
        _toRemove.push(_index);

        _toAdd.push({
          start: _start,
          end: _selected.end,
        });
      }
    }

    if (_toRemove.length === 0) {
      _toAdd.push({
        start: _start,
        end: _end,
      });
    }

    _toRemove.reverse();
    _toRemove.map((_index) => _selected.splice(_index, 1));

    _toAdd = _toAdd.sort((a, b) => a.start > b.start);

    _toRemove = [];
    for (let _index in _toAdd) {
      let _add = _toAdd[_index];
      _toRemove.push(..._toAdd.map((a, index) => (a.start >= _add.start && a.start <= _add.end && a.end > _add.end) ? {
        ...a,
        index,
      } : {}).map((b) => ({start: _add.start, end: b.end, indexes: [_index * 1, b.index]})));
    }

    _toRemove = _toRemove.filter((a) => !!a.end);

    if (_toRemove.length > 0) {
      _toRemove = _toRemove[0];

      _toRemove.indexes.reverse();
      _toRemove.indexes.map((_index) => _toAdd.splice(_index, 1));

      _toAdd.push({start: _toRemove.start, end: _toRemove.end});
    }

    _toAdd = app._.uniqWith(_toAdd, app._.isEqual);

    _toAdd.map((_add) => _selected.push(_add));

    return _selected;
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _renderTitle() {
    const {title} = this.props;
    let _title = [this._title];

    if (title) {
      _title.push(
        <div
          key="divider"
          style={{
            position: 'relative',
            backgroundColor: '#e9e9e9',
            margin: 8,
            width: 1,
          }}
        />,
        title,
      );
    }

    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        {_title}
      </div>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _component() {
    return (
      <div/>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _extra() {
    return (
      <div/>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _title() {
    return (
      <div/>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {extra, footer} = this.props;

    return (
      <Card
        className="calendar"
        title={this._renderTitle}
        extra={
          <div
            style={{
              display: 'flex',
            }}
          >
            {extra}
            {
              extra &&
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#e9e9e9',
                  margin: '0 8px',
                  width: 1,
                  top: -4,
                }}
              />
            }
            {this._extra}
          </div>
        }
        style={{
          height: '100%',
        }}
      >
        {this._component}
        {footer}
      </Card>
    );
  }
}
