import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import {Button, Dropdown, Menu, InputNumber, Row, Col} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import {Month} from './../Components';
import Mode from './Mode';

jMoment.loadPersian({dialect: 'persian-modern'});

@autobind
/**
 *
 * @extends Mode
 */
export default class Monthly extends Mode {
  /**
   *
   * @return {Object}
   */
  static get propTypes() {
    return Object.assign({}, Mode.propTypes, {
      month: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      onChange: PropTypes.func,
      disabled: PropTypes.func,
    });
  }

  /**
   *
   * @return {Object}
   */
  static get defaultProps() {
    return Object.assign({}, Mode.defaultProps, {
      month: jMoment().jMonth(),
    });
  }

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this._initialState, {
      month: props.month,
    });
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    super.componentWillReceiveProps(np);

    if (this.props.month !== np.month) {
      this.setState({
        month: np.month,
      });
    }
  }

  /**
   *
   */
  get year() {
    return this.state.year;
  }

  /**
   *
   */
  get month() {
    return this.state.month;
  }

  /**
   *
   * @param {String} end
   * @private
   */
  _onMouseUp(end) {
    const {onChange, disabled} = this.props;

    if (!disabled(end)) {
      let selected = [{
        start: end,
        end,
      }];

      this.setState({
        selected,
      }, () => onChange(selected));
    }
  }

  /**
   *
   * @return {String}
   * @private
   */
  get _titleYear() {
    const {year} = this.state;
    /*
        <Dropdown
          key="year-select"
          getPopupContainer={() => document.getElementsByClassName('calendar') && document.getElementsByClassName('calendar')[0]}
          overlay={(
            <Menu
              onClick={({key}) => this.setState({year: key * 1})}
              selectedKeys={[`${year}`]}
              style={{
                maxHeight: 300,
                overflowY: 'auto',
              }}
            >
              {
                app.range(year - 10, year + 11).map((_year) =>
                  <Menu.Item key={`${_year}`}>
                    {_year}
                  </Menu.Item>,
                )
              }
            </Menu>
          )}
          trigger={['click']}
        >
          <a className="ant-dropdown-link">
            {year} <MaterialIcon name="chevron-down"/>
          </a>
        </Dropdown>
     */
    return (
      <InputNumber
        key="year-select"
        style={{
          margin: '0px',
        }}
        onChange={(key) => {
          if (key > 1300) {
            this.setState({year: key * 1});
          }
        }}
        value={[`${year}`]}/>
    );
  }

  /**
   *
   * @return {String}
   * @private
   */
  get _titleMonth() {
    const {year, month} = this.state;

    return (
      <Dropdown
        key="month-select"
        getPopupContainer={() => document.getElementsByClassName('calendar') && document.getElementsByClassName('calendar')[0]}
        overlay={(
          <Menu
            onClick={({key}) => this.setState({month: key * 1})}
            selectedKeys={[`${month}`]}
            style={{
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            {
              app.range(0, 12).map((_month) =>
                <Menu.Item key={`${_month}`}>
                  {jMoment(`${year}-${_month + 1}`, 'jYYYY-jM').format('jMMMM')}
                </Menu.Item>,
              )
            }
          </Menu>
        )}
        trigger={['click']}
      >
        <a className="ant-dropdown-link" style={{width: 80, display: 'inline-block'}}>
          {jMoment(`${year}-${month + 1}`, 'jYYYY-jM').format('jMMMM')} <MaterialIcon name="chevron-down"/>
        </a>
      </Dropdown>
    );
  }

  /**
   *
   * @return {String}
   * @private
   */
  get _title() {
    const {year, month} = this.state;
    {/*app.translate('main.Month')*/
    }
    return (
      <Row
        style={{
          width: '100%',
        }}
        key="year-month-select">
        <Col sm={16} md={12} lg={16}
             style={{
               width: '170px',
             }}>{this._titleMonth} {this._titleYear}</Col>
        <Col sm={8} md={24} lg={8}
             style={{
               minWidth: '115px',
             }}
        >{this.extra}</Col>
      </Row>
    );
    // return `${jMoment(`${year}-${month + 1}`, 'jYYYY-jM').format('jMMMM')} ${app.translate('main.Month')} ${year}`;
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get extra() {
    const {year, month} = this.state;
    const {loading} = this.props;

    // noinspection RequiredAttributes
    return (
      <Button.Group>
        <Button
          type="primary"
          icon="left"
          style={{
            padding: 2,
          }}
          disabled={loading}
          onClick={() => {
            let _moment = jMoment(`${year}-${month + 1}`, 'jYYYY-jM').subtract(1, 'jMonth');

            this.setState({year: _moment.jYear(), month: _moment.jMonth()});
          }}
        />
        <Button
          type="dashed"
          disabled={loading || (year === jMoment().jYear() && month === jMoment().jMonth())}
          onClick={() => {
            let _moment = jMoment();

            this.setState({year: _moment.jYear(), month: _moment.jMonth()});
          }}
        >
          {app.translate('main.Current Month')}
        </Button>
        <Button
          type="primary"
          icon="right"
          disabled={loading}
          style={{
            padding: 2,
          }}
          onClick={() => {
            let _moment = jMoment(`${year}-${month + 1}`, 'jYYYY-jM').add(1, 'jMonth');

            this.setState({year: _moment.jYear(), month: _moment.jMonth()});
          }}
        />
      </Button.Group>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _component() {
    const {selected, year, month} = this.state;
    const {...rest} = this.props;

    return (
      <Month
        {...app._.omit(rest, ['onChange'])}
        onMouseUp={this._onMouseUp}
        selected={selected}
        year={year}
        month={month}
        title={false}
      />
    );
  }
}
