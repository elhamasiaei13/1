import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col} from 'antd';
import {show, emptyWrit, getStateDiagram, emptyStateDiagram} from './../Module';
import jMoment from 'moment-jalaali';
import MaterialIcon from 'components/common/MaterialIcon';
import StateDiagram from 'components/common/StateDiagram';
import Print from 'components/common/Print';
import {FormBuilder} from 'components/FormBuilder';
import Types from 'routes/General/Types';
import uuidv1 from 'uuid/v1';

@connect((state) => ({
  writ: state.Attendance.Writs.writ,
  stateDiagram: state.Attendance.Writs.stateDiagram,
}), {
  show,
  emptyWrit,
  getStateDiagram,
  emptyStateDiagram,
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
    stateDiagram: PropTypes.arrayOf(
      PropTypes.object,
    ),
    writ: PropTypes.object,
    show: PropTypes.func,
    emptyWrit: PropTypes.func,
    getStateDiagram: PropTypes.func,
    emptyStateDiagram: PropTypes.func,
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
    stateDiagram: [],
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    jMoment.loadPersian({dialect: 'persian-modern'});
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.item[0].id) {
      this.props.show(this.props.item[0].id, {
        includes: ['type', 'form.fields', 'requests', 'requests.type.rule', 'requests.senderUser.profile', 'requests.senderPosition', 'requests.values'],
      }, () => {
        if (this.props.writ && this.props.writ.requests && !app._.isEmpty(this.props.writ.requests[0])) {
          this.props.getStateDiagram(this.props.writ.requests[0].id);
        }
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyWrit();
    this.props.emptyStateDiagram();
  }


  _print() {
    const {writ} = this.props;
    let data = $('#infoWrits').html();
    let options = {
      pageTitle: `${app.translate('routes.home.attendance.writs.print writs')}`,
      title: `${app.translate('routes.home.attendance.writs.writs')} ${writ.type.name}`,
      data: [`${data}`,],
    };
    let rp = new Print(options);
    rp.print();
  }

  _renderRequest(requests) {
    let items = [];
    if (requests && requests[0]) {
      requests.map((request) => {

        let requestName = Types.findObject({id: request && request.typeId});
        items.push(<Row
        key={uuidv1()}
        >
          <div className='spacer'/>
          <Col sm={24} md={12}>
              <span className='request-info-title'>
              <MaterialIcon name='note-outline' size='tiny'/> {app.translate('routes.home.requestsType')} :
              </span>{requestName}
          </Col>
          <Col sm={24} md={12}>
            <div>
              <span className="request-info-title">
                <MaterialIcon
                  size="tiny"
                  name="qrcode"/>
                {app.translate('routes.home.attendance.writs.request key')} :
              </span> {request.key ? request.key : '-'}
            </div>
          </Col>
          <Col sm={24} md={12}>
              <span className="request-info-title">
              <MaterialIcon name="account" size="tiny"/> {app.translate('routes.home.requestsSender')} :
              </span>{request.senderUser && request.senderUser.profile && request.senderUser.profile.firstName} {request.senderUser && request.senderUser.profile && request.senderUser.profile.lastName}
          </Col>
          <Col sm={24} md={12}>
              <span className="request-info-title">
              <MaterialIcon name="account-card-details" size="tiny"/> {app.translate('routes.home.requestsPosition')} :
              </span>{request.senderPosition.name}
          </Col>
          <Col sm={24} md={12}>
              <span className="request-info-title">
              <MaterialIcon
                size="tiny"
                name={request.status === 'accepted' ? 'check' : request.status === 'rejected' ? 'close' : 'alert-outline'}
                style={{color: request.status === 'accepted' ? '#559955' : request.status === 'rejected' ? '#995555' : '#ff9955'}}
              /> {app.translate('routes.home.requestsStatus')} :
              </span>{app.translate(`routes.home.requests${request.status}`)}
          </Col>
          <Col sm={24} md={12}>
              <span className="request-info-title">
              <MaterialIcon size="tiny" name="calendar"/>{app.translate('routes.home.requestsCreatedAt')} :
              </span>
            <span dir="ltr">{
              jMoment(request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
            }</span>
          </Col>
          <Col sm={24} md={12}>
              <span className="request-info-title">
              <MaterialIcon size="tiny" name="calendar"/>{app.translate('routes.home.requestsUpdatedAt')} :
              </span>
            <span dir="ltr">{
              jMoment(request.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
            }</span>
          </Col>
          <Col sm={24}>
            {
              // this._requestInfo()
            }
          </Col>
          <Col sm={24}>
              <span className="request-info-title">
              <MaterialIcon
                size="tiny"
                name="comment-processing-outline"
              /> {app.translate('routes.home.requestsDescription')} :
              </span>
            {request.description}
          </Col>
        </Row>);

      });
    }
    return items;
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {title, visible, onCancel, writ} = this.props;


    let writName = Types.findObject({id: writ && writ.typeId});

    return (
      !app._.isEmpty(writ) ?
        <Modal
          title={title}
          visible={visible}
          wrapClassName="vertical-center-modal"
          onCancel={() => onCancel()}
          width='80%'
          footer={[
            <Button key="submit" type="primary" size="large" onClick={() => onCancel()}>
              {app.translate('main.Close')}
            </Button>,
            <Button key="print" size="large" onClick={() => this._print()}>
              {app.translate('main.Print')}
            </Button>,
          ]}
        >
          <Row gutter={16}
               style={{
                 fontSize: '14px',
                 lineHeight: '25px',
               }}
               id="infoWrits"
          >

            <Col sm={24} md={12}>
              <div>
              <span className="request-info-title">
                <MaterialIcon
                  size="tiny"
                  name="note-outline"
                /> {app.translate('routes.home.attendance.writs.reason')} :
              </span>{writName}
              </div>
            </Col>

            <Col sm={24} md={12}>
              <div>
              <span className="request-info-title">
                <MaterialIcon
                  size="tiny"
                  name="barcode"
                /> {app.translate('routes.home.attendance.writs.key')} :
              </span> {writ.key ? writ.key : '-'}
              </div>
            </Col>

            <Col sm={24} md={12}>
              <div>
              <span className="request-info-title">
                <MaterialIcon
                  size="tiny"
                  name="calendar"/>
                {app.translate('routes.home.attendance.writs.registrationDatetime')} :
              </span>{jMoment(writ.registrationDatetime, 'YYYY-M-D').format('dddd jYYYY/jMM/jDD')}
              </div>
            </Col>

            {
              <FormBuilder
                formFields={writ.form}
                editable={false}
                formValues={writ.values ? writ.values : {}}
              />
            }
            <Col sm={24}>
              <div>
              <span className="request-info-title">
                <MaterialIcon
                  size="tiny"
                  name="comment-processing-outline"
                />{app.translate('routes.home.attendance.writs.description')} :
              </span> {writ.description}
              </div>
            </Col>

            {
              this._renderRequest(writ.requests)
            }
            {
              writ.requests && writ.requests[0] &&
              <Row>
                <div className="spacer"/>
                <StateDiagram
                  items={this.props.stateDiagram}
                  priorityKey='priority'
                  viewMode='list'
                />
              </Row>
            }

          </Row>

        </Modal> :
        <div/>
    )
      ;
  }
}
