import React from 'react';
import {Modal, Button, Row, Col} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Info extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
  };

  _time(_second) {
    let second = (_second < 0 ? _second * -1 : _second);
    let h = parseInt(second / 3600);
    let m = parseInt((second - (h * 3600)) / 60);
    let s = parseInt(second - (h * 3600) - (m * 60));
    return `${(h > 9 ? '' : '0')}${h}:${(m > 9 ? '' : '0')}${m}:${(s > 9 ? '' : '0')}${s}`;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancel, item, visible} = this.props;

    return (
      <Modal
        title={app.translate('routes.home.attendance.stack.Info')}
        visible={visible}
        wrapClassName="vertical-center-modal"
        onCancel={onCancel}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={onCancel}>
            {app.translate('main.Ok')}
          </Button>,
        ]}
      >
        <Row gutter={16}
             style={{
               fontSize: '14px',
               lineHeight: '25px',
             }}
        >
          <Col sm={12}>
            {app.translate('routes.home.attendance.stack.Apply Date')} : {item && item.applyDate && item.applyDate.split(' ')[0]}
          </Col>
          <Col sm={12}>
            {app.translate('routes.home.attendance.stack.Apply Time')} : {item && item.applyDate && item.applyDate.split(' ')[1]}
          </Col>

          <Col sm={24}>
            {app.translate('routes.home.attendance.stack.Calc Time')} :
            {item && ( item.calcType === 'second' ?
              <span><span
                dir="ltr">{item && item.calcTime > 0 ? '+' : '-'} {this._time(item.calcTime)}</span> {app.translate('routes.home.attendance.stack.Hour')}</span> :
              <span><span
                dir="ltr">{item && item.calcTime > 0 ? '+' : ''} {item.calcTime}</span> {app.translate('routes.home.attendance.stack.Day')}</span>)}
          </Col>
          <Col sm={24}>
            {app.translate('routes.home.attendance.stack.Description')} : {item && item.description}
          </Col>
        </Row>

      </Modal>
    );
  }
}
