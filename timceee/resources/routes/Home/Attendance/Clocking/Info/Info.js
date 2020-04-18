import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col} from 'antd';
import {show, emptyClocking} from './../Module';
import jMoment from 'moment-jalaali';
import MaterialIcon from 'components/common/MaterialIcon';


@connect((state) => ({
  clocking: state.Attendance.Clocking.clocking,
}), {
  show,
  emptyClocking,
})
@autobind
/**
 *
 */
export default class Info extends React.PureComponent {
  static propTypes = {
    item: PropTypes.arrayOf(
      PropTypes.object,
    ),
    clocking: PropTypes.object,
    show: PropTypes.func,
    emptyClocking: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string,
    visible: PropTypes.bool,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    item: [],
    onDelete: () => {
    },
    onEdit: () => {
    },
    onCancel: () => {
    },
    title: '',
    visible: false,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }


  /**
   *
   */
  componentDidMount() {
    if (this.props.item[0].id) {
      this.props.show(this.props.item[0].id);
    }
  }


  componentWillUnmount() {
    this.props.emptyClocking();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {title, visible, onCancel, clocking} = this.props;
    return (
      !app._.isEmpty(clocking) ?
        <Modal
          title={title}
          visible={visible}
          wrapClassName="vertical-center-modal"
          onCancel={() => onCancel()}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={() => onCancel()}>
              {app.translate('main.Close')}
            </Button>,
          ]}
        >
          <Row gutter={16}
               style={{
                 fontSize: '14px',
                 lineHeight: '25px',
               }}
          >

            <Col sm={24}>
              <span className="request-info-title">
                <MaterialIcon
                  size="tiny"
                  name="note-outline"
                /> {app.translate('routes.home.attendance.clocking.Reason')}
                :
              </span> {clocking.type.label}
            </Col>
            <Col sm={24} md={12} lg={8}>
              <span className="request-info-title"><MaterialIcon
                size="tiny"
                name={clocking.entryType === 'in' ? 'arrow-down-thick' : clocking.entryType === 'out' ? 'arrow-up-thick' : 'swap-vertical'}
                style={{color: clocking.entryType === 'in' ? '#559955' : clocking.entryType === 'out' ? '#995555' : '#ff9955'}}
              /> {app.translate('routes.home.attendance.clocking.Type')}
                :</span> {app.translate(`routes.home.attendance.clocking.${clocking.entryType}`)}
            </Col>

            <Col sm={24} md={12} lg={8}>
              <span className="request-info-title"><MaterialIcon size="tiny" name="calendar"/> {app.translate('routes.home.attendance.clocking.Date')}
                :</span> {jMoment(clocking.datetime, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD')}
            </Col>

            <Col sm={24} md={8} lg={8}>
              <span className="request-info-title"><MaterialIcon size="tiny" name="clock"/> {app.translate('routes.home.attendance.clocking.Time')}
                :</span> {jMoment(clocking.datetime, 'YYYY-M-D HH:mm:ss').format('HH:mm')}
            </Col>
            <Col sm={24} md={24} lg={24}>
              <span className="request-info-title"> <MaterialIcon size="tiny"
                                                                  name="comment-processing-outline"/> {app.translate('routes.home.attendance.clocking.Description')}
                :</span> {clocking.description}
            </Col>
          </Row>

        </Modal> :
        <div/>
    )
      ;
  }
}
