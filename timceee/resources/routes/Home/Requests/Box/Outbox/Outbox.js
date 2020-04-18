import React from 'react';
import {connect} from 'react-redux';
import {store, update, destroy, emptyRequests, emptyRequest} from './Module';
import {Row, Col, Modal, Input} from 'antd';
import {RequestsTableContainerWrapper} from './RequestsTable';
import PropTypes from 'prop-types';
import Form from './Form';
import Info from './Info';
// import PersonnelList from 'routes/Home/Basic/Personnel/List/ListWrapper';


@connect(null, {
  store,
  destroy,
  update,
  emptyRequests,
  emptyRequest,
})
@autobind
/**
 *
 */
export default class Outbox extends React.PureComponent {
  static propTypes = {
    destroy: PropTypes.func,
    store: PropTypes.func,
    update: PropTypes.func,
    emptyRequests: PropTypes.func,
    emptyRequest: PropTypes.func,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      title: app.translate('routes.home.requests.Requests'),
      active: [],
      type: '',
      modalVisibility: false,
      personnel: null,
      value: {},
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRequests();
    this.props.emptyRequest();
  }

  /**
   *
   * @param {object} record
   * @param {object} menuItem
   */
  onMenuTouch(record, menuItem) {
    switch (menuItem.key) {
      case '1':
        this._Info(record);
        break;
      case '2':
        this._Form(record, true);
        break;
      case '3':
        this._Delete(record);
        break;
      case '4':
        this._Form(record);
        break;
    }
  }

  /**
   *
   * @param {object} record
   * @private
   */
  _Info(record) {
    this.setState({
      active: record,
      type: 'info',
      modalVisibility: true,
    });
  }

  /**
   *
   * @param {object} record
   * @param {bool} editable
   * @private
   */
  _Form(record, editable = false) {
    let type = (editable ? 'edit' : 'add');
    this.setState({
      modalVisibility: false,
    }, () => {
      this.setState({
        title: app.translate(`routes.home.requestsForm ${type}`),
        active: record,
        type: type,
        modalVisibility: true,
      });
    });
  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _Delete(item) {
    this.setState({active: item});
    const {destroy} = this.props;
    Modal.confirm({
      title: app.translate('routes.home.requests.Removing Request'),
      content: app.translate('routes.home.requests.Are you sure about removing request', {request: item[0].key}),
      onOk: () => destroy(item[0].id, {}, this._onCancel),
    });
  }

  _notice(msg = '') {
    let _msg = msg.replace('\r\n', '\n');
    _msg = _msg.replace('\\r\\n', '\n');
    _msg = _msg.replace('\\', '\n');
    Modal.error({
      title: app.translate('routes.home.requests.Notice'),
      content: _msg,
    });
  }

  _confirm(msg = '', action = 'store') {
    let _this = this;
    Modal.confirm({
      title: app.translate('routes.home.requests.Confirm'),
      content: msg.replace('\r\n', <br/>).replace('\\r\\n', <br/>),
      onOk: () => {
        switch (action) {
          case 'store':
          case 'update':
            _this._onSubmit(this.state.value, '?accept_all=true');
            break;
          case 'destroy':
            _this.props.destroy(this.state.active[0].id, {acceptAll: true}, this._onCancel);
            break;
          case 'accept':
            _this._onAccept(this.state.active[0].id, this.state.value, '?accept_all=true');
            break;
          case 'reject':
            _this._onReject(this.state.active[0].id, this.state.value, '?accept_all=true');
            break;
        }

      },
    });
  }

  _onCancel(result = null, action = 'store') {

    if (result) {
      if (result && result.code && result.code === 422) {
        this._notice(app.translate(`routes.home.requests.${result.message}`, `${result.message}`));
      } else {
        if (result.data && !app._.isEmpty(result.data)) {
          if (result.data.notice) {
            this._notice(result.data.notice.message);
          }
          if (result.data.confirm) {
            this._confirm(result.data.confirm.message, action);
          }
        } else {
          this.setState({
            value: {},
            type: '',
            modalVisibility: false,
          });
        }
      }
    } else {
      this.setState({
        value: {},
        type: '',
        modalVisibility: false,
      });
    }
  }

  /**
   *
   * @param {Object} value
   * @param {String} acceptAll
   * @private
   */
  _onSubmit(value, acceptAll = '') {
    if (!app._.isEqual(value, this.state.value)) {
      this.setState({value});
    }
    if (this.state.active && this.state.active[0].id && this.state.type === 'edit') {
      this.props.update(this.state.active[0].id, {request: value}, acceptAll, this._onCancel);
    } else {
      this.props.store({request: value}, acceptAll, this._onCancel);
    }
  }

  _onChangeFormPop(e) {
    this.setState({value: e.target.value});
  }

  _formPop(formType = 'accept') {
    let _this = this;
    let _form = <div><Input type="textarea" onChange={this._onChangeFormPop}/></div>;
    Modal.confirm({
      title: app.translate(`routes.home.requestsComment ${formType}`),
      iconType: 'exception',
      content: _form,
      onOk: () => {
        switch (formType) {
          case 'accept':
            _this._onAccept(this.state.value, 'acceptAll');
            break;
          case 'reject':
            _this._onReject(this.state.value, 'acceptAll');
            break;
        }

      },
    });
  }

  _onAccept(value, acceptAll = '') {
    if (app._.isEqual(value, this.state.value)) {
      this.setState({value});
    }
    this.props.accept(this.state.active[0].id, value, acceptAll, this._onCancel);
  }

  _onReject(value, acceptAll = '') {
    if (app._.isEqual(value, this.state.value)) {
      this.setState({value});
    }
    this.props.reject(this.state.active[0].id, value, acceptAll, this._onCancel);
  }

  /**
   *
   * @param {object} item
   * @private
   */
  _setPersonel(item) {
    this.setState({personnel: [item]});
  }

  /**
   *
   * @private
   */
  _onCancelPersnnel() {
    this.setState({personnel: null});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {active, type, title, modalVisibility, personnel} = this.state;
    return (
      <Row
        gutter={16}
        style={{
          overflowY: 'auto',
          height: '100%',
          margin: 0,
        }}
      >
        <Col
          style={{
            overflowY: 'auto',
            height: '100%',
          }}
        >
          <RequestsTableContainerWrapper
            onInfo={this._Info}
            onDelete={app.authorize.can('Request@destroy') ? this._Delete : undefined}
            onEdit={app.authorize.can('Request@update') ? this._Form : undefined}
            onAdd={app.authorize.can('Request@store') ? this._Form : undefined}
            onMenuTouch={this.onMenuTouch}
            onCancel={this._onCancelPersnnel}
          />
          {
            (type === 'edit' || type === 'add' ) ?
              <Form
                title={title}
                visible={modalVisibility}
                active={active}
                type={type}
                onSubmitTouch={this._onSubmit}
                onCancelTouch={this._onCancel}
              /> : ''
          }
          {
            (type === 'info') ?
              <Info
                title={title}
                visible={modalVisibility}
                active={active}
                type={type}
                onDelete={app.authorize.can('Request@destroy') ? this._Delete : undefined}
                onEdit={app.authorize.can('Request@update') ? this._Form : undefined}
                onCancel={this._onCancel}
                onSubmit={app.authorize.can('Request@approve') ? this._formPop : undefined}
                onReject={app.authorize.can('Request@approve') ? this._formPop : undefined}
              />
              : ''
          }
        </Col>
      </Row>
    );
  }
}

