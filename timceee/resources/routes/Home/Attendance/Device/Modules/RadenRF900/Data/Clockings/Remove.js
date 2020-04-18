import React from 'react';
import { Row, Col, Form, Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import RangePicker from 'components/common/DatePicker/RangePicker';
import { request } from './../../../../Module';

@connect(null, {
  request,
}, null, { withRef: true })
@autobind
/**
 *
 */
export default class Remove extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    request: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      startDate: jMoment().add(-1, 'jMonth').startOf('jMonth').format('YYYY-MM-DD'),
      endDate: jMoment().add(-1, 'jMonth').endOf('jMonth').format('YYYY-MM-DD'),
    };
  }

  /**
   *
   * @param {Function} [callback=(function())]
   */
  submit(callback = () => {}) {
    Modal.confirm({
      title: app.translate('routes.home.attendance.device.Removing Clockings'),
      onOk: () => this._remove(callback),
      onCancel: () => callback(),
    });
  }

  /**
   *
   * @param {Function} [callback=(function())]
   */
  _remove(callback = () => {}) {
    const { startDate, endDate } = this.state;
    const { request, device } = this.props;

    let loader = app.loading(app.translate('routes.home.attendance.device.Removing Clockings'));

    let data = {};

    if (startDate) {
      data.dateFrom = startDate;
    }

    if (endDate) {
      data.dateTo = endDate;
    }

    request(device.id, 'removeClockings', data, (err) => {
      loader.hide(() => {
        if (err) {
          return app.message(app.translate('routes.home.attendance.device.Removing Clockings Failed'), 'error');
        }

        app.message(app.translate('routes.home.attendance.device.Clockings Removed'));
      });

      callback();
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { startDate, endDate } = this.state;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
        }}
      >

        <Col>
          <Form.Item
            label={app.translate('routes.home.attendance.device.Select Range')}
          >
            <RangePicker
              value={[startDate, endDate]}
              onChange={(dates) => dates ? this.setState({startDate: dates[0], endDate: dates[1]}) : this.setState({startDate: null, endDate: null})}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>

      </Row>
    );
  }
}
