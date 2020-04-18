import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Modal, Button, Row, Col} from 'antd';
import StateDiagram from 'components/common/StateDiagram';
import {getRequest, getRequestStateDiagram, getRequestFormFields, emptyRequest} from './../Module';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';
import {FormBuilder} from 'components/FormBuilder';
import {Types} from 'routes/General/Types';


@connect((state) => ({
  request: state.Requests.Box.Outbox.request,
  requestStateDiagram: state.Requests.Box.Outbox.requestStateDiagram,
  requestFormFields: state.Requests.Box.Outbox.requestFormFields,
}), {
  getRequest,
  getRequestFormFields,
  emptyRequest,
  getRequestStateDiagram,
})
@autobind
/**
 *
 */
export default class Info extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    active: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    onReject: PropTypes.func,
    getRequest: PropTypes.func,
    getRequestFormFields: PropTypes.func,
    getRequestStateDiagram: PropTypes.func,
    editOnTouch: PropTypes.func,
    deleteOnTouch: PropTypes.func,
    emptyRequest: PropTypes.func,
    visible: PropTypes.bool,
    request: PropTypes.object,
    requestFormFields: PropTypes.array,
    requestStateDiagram: PropTypes.arrayOf(
      PropTypes.object,
    ),
    type: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    active: [],
    requestFormFields: [],
    visible: false,
    request: {},
    onOk: () => {
    },
    onCancel: () => {
    },
    editOnTouch: () => {
    },
    deleteOnTouch: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   *
   */
  componentDidMount() {
    this.props.getRequest(this.props.active[0].id, {
      includes: [
        'type.rule',
        'senderUser.profile',
        'senderPosition',
        'values',
        'writs',
        'position',
        'user.profile',
        'form.fields',
      ],
    }, () => {
      this.props.getRequestStateDiagram(this.props.active[0].id);
    });
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRequest();
  }

  _rejectReasons() {
    let _rejectReasons = [];
    const {request} = this.props;
    app._.map(request.rejectReasons, (rejectReason) => {
      _rejectReasons.push(
        <div
          key={`${rejectReason.approver.id}-${Math.random()}`}
          className="rejectReason"
        >
             <span
               className="position"
             >{rejectReason.approver.name}</span> : {rejectReason.reason}
          <sapn className="dateInfo">
            {rejectReason.approveDate}
          </sapn>
        </div>,
      );
    });
    return _rejectReasons;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancel, onSubmit, onReject, visible, request, active, onEdit, onDelete} = this.props;
    const items = this.props.requestStateDiagram;
    let name = Types.findObject({id: request && request.typeId});

    if (!app._.isEmpty(request)) {
      return (
        <Modal
          title={app.translate('routes.home.requests.Request') + ' : ' + name}
          visible={visible}
          width='80%'
          wrapClassName="vertical-center-modal"
          onCancel={onCancel}
          footer={[
            <Button key="back" size="large" onClick={onCancel}>
              {app.translate('main.Close')}
            </Button>,
          ]}
        >
          <Row
            className="request-info"
            style={{
              height: '100%',
            }}
          >
            <Col sm={24}
                 style={{
                   padding: '10px 0px',
                   height: '100%',
                 }}
            >

              <Button.Group>
                <Button
                  type="primary"
                  disabled={!request.active || request.status === 'accepted'}
                  onClick={() => onEdit(active, 'edit')}
                >
                  <MaterialIcon
                    size="tiny"
                    name="pencil"
                  />
                </Button>

                <Button
                  type="danger"
                  disabled={!request.active || request.status === 'accepted'}
                  onClick={() => onDelete(active)}
                >
                  <MaterialIcon
                    size="tiny"
                    name="delete"
                  />
                </Button>
              </Button.Group>
            </Col>
            <Col sm={24}
                 style={{
                   padding: '10px 0px',
                 }}
            >

              <StateDiagram
                items={items}
                priorityKey='priority'
              />
            </Col>
            <div className="spacer"/>
            <Col sm={24} md={12}>
              <Row>
                <Col
                  sm={8}
                  className="request-info-title"
                >
                  <MaterialIcon name="note-outline" size="tiny"/> {app.translate('routes.home.requests.Type')}
                </Col>
                <Col sm={16}>
                  {name}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account" size="tiny"/> {app.translate('routes.home.requests.Sender')}
                </Col>
                <Col sm={16}>
                  {request.senderUser && request.senderUser.profile && request.senderUser.profile.firstName} {request.senderUser && request.senderUser.profile && request.senderUser.profile.lastName}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account-card-details" size="tiny"/> {app.translate('routes.home.requests.Position')}
                </Col>
                <Col sm={16}>
                  {request.senderPosition && request.senderPosition.name ? request.senderPosition.name : '-'}
                </Col>

                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account" size="tiny"/> {app.translate('routes.home.requests.Owner')}
                </Col>
                <Col sm={16}>
                  {request.user && request.user.profile && request.user.profile.firstName} {request.user && request.user.profile && request.user.profile.lastName}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account-card-details" size="tiny"/> {app.translate('routes.home.requests.Position')}
                </Col>
                <Col sm={16}>
                  {request.position && request.position.name ? request.position.name : '-'}
                </Col>

                {request.writs && request.writs[0] && request.writs[0].id &&
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="barcode" size="tiny"/> {app.translate('routes.home.requests.writs')}
                </Col>
                }
                {request.writs && request.writs[0] && request.writs[0].id &&
                <Col sm={16}>
                  {request.writs[0].key}
                </Col>
                }
              </Row>
            </Col>
            <Col sm={24} md={12}>
              <Row>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon
                    size="tiny"
                    name={request.status === 'accepted' ? 'check' : request.status === 'rejected' ? 'close' : 'alert-outline'}
                    style={{color: request.status === 'accepted' ? '#559955' : request.status === 'rejected' ? '#995555' : '#ff9955'}}
                  /> {app.translate('routes.home.requests.Status')}
                </Col>
                <Col sm={16}>
                  {app.translate(`routes.home.requests.${request.status}`)}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="qrcode" size="tiny"/> {app.translate('routes.home.requests.Key')}
                </Col>
                <Col sm={16}>
                  {request.key}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon size="tiny" name="calendar"/> {app.translate('routes.home.requests.CreatedAt')}
                </Col>
                <Col sm={16}>
                  <span dir="ltr">{
                    jMoment(request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
                  }</span>
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon size="tiny" name="calendar"/> {app.translate('routes.home.requests.UpdatedAt')}
                </Col>
                <Col sm={16}>
                  <span dir="ltr">{
                    jMoment(request.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
                  }</span>
                </Col>
              </Row>
            </Col>
            <div className="spacer"/>
            <Col sm={24}>

              <FormBuilder
                formFields={request.form}
                formValues={request.values}
                editable={false}
                md={8}
              />
            </Col>
            <div className="spacer"/>
            <Col sm={24}>
              <span
                className="request-info-title">
                <MaterialIcon
                  size="tiny"
                  name="comment-processing-outline"
                /> {app.translate('routes.home.requests.Description')} :
              </span>
              {active[0].description}
            </Col>
            {!app._.isEmpty(request.rejectReasons) &&
            <Col sm={24}>
              <div className="spacer"/>
              {this._rejectReasons()}
            </Col>
            }
          </Row>
        </Modal>
      );
    } else {
      return <div/>;
    }
    ;
  }
}
