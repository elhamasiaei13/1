import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col} from 'antd';
import StateDiagram from 'components/common/StateDiagram';
import MaterialIcon from 'components/common/MaterialIcon';
import {getRequest, getRequestFormFields, getRequestStateDiagram, emptyRequest, emptyStateDiagram} from './../Module';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';
import {FormBuilder} from 'components/FormBuilder';


@connect((state) => ({
  request: state.Requests.Box.Inbox.request,
  requestStateDiagram: state.Requests.Box.Inbox.requestStateDiagram,
  requestFormFields: state.Requests.Box.Inbox.requestFormFields,
}), {
  getRequest,
  getRequestFormFields,
  emptyRequest,
  getRequestStateDiagram,
  emptyStateDiagram,
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
    emptyRequest: PropTypes.func,
    emptyStateDiagram: PropTypes.func,
    getRequestStateDiagram: PropTypes.func,
    editOnTouch: PropTypes.func,
    deleteOnTouch: PropTypes.func,
    visible: PropTypes.bool,
    request: PropTypes.object,
    requestStateDiagram: PropTypes.arrayOf(
      PropTypes.object,
    ),
    type: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    getRequestFormFields: PropTypes.func,
    requestFormFields: PropTypes.array,
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

    this.state = {
      render: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.props.getRequest(this.props.active[0].id, {
      includes: [
        'request.type.rule',
        'request.senderUser.profile',
        'request.senderPosition',
        'request.values',
        'request.writs',
        'request.positions',
        'request.user.profile',
        'request.form.fields',
      ],
    }, () => {
      this.props.getRequestStateDiagram(this.props.active[0].requestId, () => {
      });
    });
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRequest();
    this.props.emptyStateDiagram();
  }

  _notes() {
    let _notes = [];
    const {request} = this.props;
    app._.map(request.notes, (note) => {
      _notes.push(
        <div
          key={`${note.approver.id}-${Math.random()}`}
          className="notes"
        >
          <span
            className="position"
          >{note.approver.name}
          </span> : {note.note}
          <sapn className="dateInfo">
            {jMoment(note.approveDate, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')}
          </sapn>
        </div>,
      );
    });

    return _notes;
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
            {jMoment(rejectReason.approveDate, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')}
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


    if (!app._.isEmpty(request)) {
      return (
        <Modal
          title={app.translate('routes.home.requests.Request') + ' : ' + request.request.type && request.request.type.rule && request.request.type.rule.name}
          visible={visible}
          width='80%'
          wrapClassName="vertical-center-modal"
          onCancel={onCancel}
          footer={[
            <Button key="back" size="large" onClick={onCancel}>
              {app.translate('main.Cancel')}
            </Button>,
            <Button key="submit" disabled={!request.active || request.status === 'accepted' || !app.authorize.can('Request@approve')} onClick={() => onSubmit('accept')}
                    type="primary">{app.translate('routes.home.requests.Accept')}</Button>,
            <Button key="reject" disabled={!request.active || request.status === 'accepted' || !app.authorize.can('Request@approve')} onClick={() => onReject('reject')}
                    type="danger">{app.translate('routes.home.requests.Reject')}</Button>,
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
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="note-outline" size="tiny"/> {app.translate('routes.home.requests.Type')}
                </Col>
                <Col sm={16}>
                  {request.request.type.rule.name}
                </Col>

                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account" size="tiny"/> {app.translate('routes.home.requests.Sender','Sender')}
                </Col>
                <Col sm={16}>
                  {request.request.senderUser.profile.firstName} {request.request.senderUser.profile.lastName}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account-card-details" size="tiny"/> {app.translate('routes.home.requests.Position')}
                </Col>
                <Col sm={16}>
                  {request.request.senderPosition && request.request.senderPosition.name ? request.request.senderPosition.name : '-'}
                </Col>

                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account" size="tiny"/> {app.translate('routes.home.requests.Owner','Owner')}
                </Col>
                <Col sm={16}>
                  {request.request.user && request.request.user.profile && request.request.user.profile.firstName} {request.request.user && request.request.user.profile && request.request.user.profile.lastName}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="account-card-details" size="tiny"/> {app.translate('routes.home.requests.Position')}
                </Col>
                <Col sm={16}>
                  {request.request.position && request.request.position.name ? request.request.position.name : '-'}
                </Col>

                {request.request.writs && request.request.writs[0] && request.request.writs[0].id &&
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="barcode" size="tiny"/> {app.translate('routes.home.requests.writs')}
                </Col>
                }
                {request.request.writs && request.request.writs[0] && request.request.writs[0].id &&
                <Col sm={16}>
                  {request.request.writs[0].key}
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
                  {app.translate(`routes.home.requests.${ request.request.status}`)}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon name="qrcode" size="tiny"/> {app.translate('routes.home.requests.Key')}
                </Col>
                <Col sm={16}>
                  {request.request.key}
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon size="tiny" name="calendar"/> {app.translate('routes.home.requests.CreatedAt')}
                </Col>
                <Col sm={16}>
                  <span dir="ltr">{
                    jMoment(request.request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
                  }</span>
                </Col>
                <Col sm={8}
                     className="request-info-title">
                  <MaterialIcon size="tiny" name="calendar"/> {app.translate('routes.home.requests.UpdatedAt')}
                </Col>
                <Col sm={16}>
                  <span dir="ltr">{
                    jMoment(request.request.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
                  }</span>
                </Col>
              </Row>
            </Col>
            <div className="spacer"/>
            <Col sm={24}>
              <FormBuilder
                formFields={request.request.form}
                formValues={request.request.values}
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
               /> {app.translate('routes.home.requests.Description')} : </span>
              {request.request.description}
            </Col>
            {!app._.isEmpty(request.notes) &&
            <Col sm={24}>
              <div className="spacer"/>
              {this._notes()}
            </Col>
            }
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
