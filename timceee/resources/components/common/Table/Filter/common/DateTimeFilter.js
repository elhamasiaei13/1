import React from 'react';
import PropTypes from 'prop-types';
import {Popover, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import DatePicker from 'components/common/DatePicker/RangePicker';
import moment from 'moment';


@autobind
/**
 *
 */
export default class DateTimeFilter extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    defaultValue: PropTypes.array,
    columnKey: PropTypes.string,
    defaultKey: PropTypes.string,
  };

  static defaultProps = {
    defaultValue: [],
    onClick: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      range: props.defaultValue,
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      range: np.defaultValue,
    });
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  onChange(dateString) {
    this.setState({range: (dateString ? dateString : [])});
  }

  _onClick() {
    this.setState({
      visible: false,
    });
    let {range} = this.state;
    let _range = [];
    _range[0] = range[0] && `${range[0].split(' ')[0]} 00:00:00`;
    _range[1] = range[1] && `${range[1].split(' ')[0]} 23:59:59`;
    this.props.onClick(this.props.defaultKey, _range);
  }


  /**
   *
   * @param {Boolean} visible
   */
  handleVisibleChange(visible) {
    this.setState({visible});
  }

  render() {
    const {onClick, defaultValue} = this.props;
    let {range} = this.state;

    return (
      onClick ? <Popover
        content={
          <span>
            <DatePicker
              value={range}
              onChange={this.onChange}
            />
            <Button
              type="primary"
              onClick={() => this._onClick()}
              style={{
                margin: '5px',
              }}>
              {app.translate('routes.home.attendance.clocking.Rage Click')}
            </Button>
          </span>

        }
        title={app.translate('main.Select Range Date Time')}
        trigger="click"
        onClick={() => this.setState({visible: true})}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <MaterialIcon
          name="calendar-range"
          size="tiny"
          style={{
            cursor: 'pointer',
            color: (!app._.isEmpty(defaultValue) && !app._.isEmpty(defaultValue[0]) ? 'rgb(16, 142, 233)' : 'rgb(99, 99, 99)'),
          }}
        />
      </Popover> : <div/>
    );
  }
}
