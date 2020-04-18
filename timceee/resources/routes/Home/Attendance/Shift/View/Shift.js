import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import Spin from 'components/common/Spin';
import {Card, Modal, Button} from 'antd';
import {connect} from 'react-redux';
import RangePicker from 'components/common/DatePicker/RangePicker';
import {index, changeShift, emptyShifts} from './Module';

@connect((state) => ({
  shifts: state.Attendance.Shift.View.shifts,
}), {
  index,
  changeShift,
  emptyShifts,
})
@autobind
/**
 *
 */
export default class Shift extends React.PureComponent {
  static propTypes = {
    shifts: PropTypes.arrayOf(
      PropTypes.object,
    ),
    personnel: PropTypes.object,
    onCancel: PropTypes.func,
    index: PropTypes.func,
    changeShift: PropTypes.func,
    emptyShifts: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.height = 40;

    this.state = {
      range: [jMoment(jMoment().format('jYYYY-01-01'), 'jYYYY-jMM-jDD').format('YYYY-MM-DD'), jMoment(jMoment().format('jYYYY-12-29'), 'jYYYY-jMM-jDD').format('YYYY-MM-DD')],
      loading: true,
      selected: {},
      changeShift: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.getShift();
  }

  /**
   *
   */
  componentWillUnmount() {
    const {emptyShifts} = this.props;
    super.componentWillUnmount();

    emptyShifts();
  }

  getShift() {
    const {index, personnel, emptyShifts} = this.props;
    const {range} = this.state;
    emptyShifts();
    this.setState({loading: true}, () => {
      index(personnel.id, {
        filterGroups: [{
          filters: [{
            key: 'between',
            value: range,
            operator: 'bt',
          }],
        }],
      }, () => {
        this.setState({loading: false});
      });
    });
  }

  _onCancel() {
    this.setState({selected: {}, changeShift: []});
  }

  _openModal(selected) {
    this.setState({selected});
  }

  _render() {
    const {range} = this.state;
    let element = [];
    let data = this.props.shifts;


    let min = 10000000000000;
    let max = 0;

    let dateFrom = [];
    let dateTo = [];
    let newDateFrom = '';
    let newDateTo = '';
    if (!app._.isEmpty(range)) {
      dateFrom = range[0].split('-');
      dateTo = range[1].split('-');
      newDateFrom = dateFrom[1] + ',' + dateFrom[2] + ',' + dateFrom[0];
      newDateTo = dateTo[1] + ',' + dateTo[2] + ',' + dateTo[0];
      min = new Date(newDateFrom).getTime();
      max = new Date(newDateTo).getTime();
    }
    let diff = 0;
    data.map((item) => {
      dateFrom = item.start;
      dateTo = item.end;
      dateFrom = dateFrom.split('-');
      dateTo = dateTo.split('-');
      newDateFrom = dateFrom[1] + ',' + dateFrom[2] + ',' + dateFrom[0];
      newDateTo = dateTo[1] + ',' + dateTo[2] + ',' + dateTo[0];
      item['startDate'] = new Date(newDateFrom).getTime();
      item['endDate'] = new Date(newDateTo).getTime();
      if (min > item['startDate']) {
        min = item['startDate'];
      }
      if (max < item['endDate']) {
        max = item['endDate'];
      }
    });
    diff = 100 / (max - min);

    data.map((item, index) => {
      element.push(
        <span
          key={`start${index}`}
          className='startShift'
          style={{
            width: data.length * this.height + 160,
            right: `${(item.startDate - min) * diff}%`,
            transform: `rotate(-90deg) translateX(-50px) translateY(${(data.length * this.height + 140) / 2}px)`,
          }}>{jMoment(item.start).format('jYYYY-jMM-jDD')}</span>,
        <span
          key={`end${index}`}
          className='endShift'
          style={{
            width: data.length * this.height + 160,
            left: `${(max - item.endDate) * diff}%`,
            transform: `rotate(-90deg) translateX(50px) translateY(-${(data.length * this.height + 140) / 2}px)`,
          }}>{jMoment(item.end).format('jYYYY-jMM-jDD')}</span>,
        <div
          key={index}
          className='shiftItem'
          onClick={() => {
            this._openModal(item);
          }}
          style={{
            top: (index + 1) * this.height - (this.height / 2) - 15,
            right: `${(item.startDate - min) * diff}%`,
            left: `${(max - item.endDate) * diff}%`,
          }}
        >
          {item.name}
        </div>);
    });

    return element;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {range, selected, loading} = this.state;
    const {personnel, onCancel, changeShift} = this.props;
    return (
      <Card
        title={`${app.translate('routes.Shifts')} ${personnel.profile.firstName} ${personnel.profile.lastName}`}
        extra={onCancel &&
        <Button
          onClick={onCancel}
        >
          {app.translate('main.Cancel')}
        </Button>
        }
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
      >
        <Spin
          spinning={loading}
        >
          <RangePicker
            value={range}
            onChange={(value) => {
              this.setState({range: value}, () => this.getShift());
            }}
          />

          <hr style={{border: '0px solid #000', borderBottom: '1px solid #ccc'}}/>

          <div
            style={{
              padding: 8,
            }}
          >
            <div
              style={{
                borderTop: '5px dotted rgba(0,0,0,0.5)',
                borderBottom: '5px dotted rgba(0,0,0,0.5)',
                height: this.height * this.props.shifts.length,
                position: 'relative',
                marginTop: '90px',
              }}
            >
              {this._render()}
            </div>
          </div>
        </Spin>
        {!app._.isEmpty(selected) &&
        <Modal
          onOk={() => changeShift(selected, changeShift, {}, () => this._onCancel())}
          onCancel={() => this._onCancel()}
          okText={app.translate('main.Submit')}
          cancelText={app.translate('main.Cancel')}
          visible={!app._.isEmpty(selected)}
          title={app.translate('routes.home.attendance.shift.Change Shifts')}
        >
          <RangePicker
            value={[selected.start, selected.end]}
            onChange={(value) => {
              this.setState({changeShift: value});
            }}
          />
        </Modal>

        }
      </Card>
    );
  }
}
