import React from 'react';
import {connect} from 'react-redux';
import {store, update, destroy, accept, reject, emptyRequests, emptyRequest} from './Module';
import {Row, Col, Modal, Input} from 'antd';
import {RequestsTableContainerWrapper} from './RequestsTable';
import PropTypes from 'prop-types';
import Info from './Info';
// import PersonnelList from 'routes/Home/Basic/Personnel/List/ListWrapper';


@connect(null, {
  store,
  destroy,
  update,
  accept,
  reject,
  emptyRequests,
  emptyRequest,
})
@autobind
/**
 *
 */
export default class Inbox extends React.PureComponent {
  static propTypes = {
    destroy: PropTypes.func,
    store: PropTypes.func,
    update: PropTypes.func,
    accept: PropTypes.func,
    reject: PropTypes.func,
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
        this.setState({
          active: record,
        }, () => this._formPop('accept'));
        break;
      case '3':
        this.setState({
          active: record,
        }, () => this._formPop('reject'));
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



  _notice(msg = '') {
    Modal.error({
      title: app.translate('routes.home.requests.Notice'),
      content: msg,
    });
  }

  _confirm(msg = '', action = 'store') {
    let _this = this;
    Modal.confirm({
      title: app.translate('routes.home.requests.Confirm'),
      content: msg,
      onOk: () => {
        switch (action) {
          case 'accept':
            _this._onAccept(this.state.value, '?accept_all=true');
            break;
          case 'reject':
            _this._onReject(this.state.value, '?accept_all=true');
            break;
        }

      },
    });
  }

  _onCancel(result = null, action = 'store') {
    if (result && result.data && !app._.isEmpty(result.data)) {
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
            _this._onAccept(this.state.value, '');
            break;
          case 'reject':
            _this._onReject(this.state.value, '');
            break;
        }

      },
    });
  }

  _onAccept(value, acceptAll = '') {
    if (app._.isEqual(value, this.state.value)) {
      this.setState({value});
    }
    let _value = {
        approvedRequestId: this.state.active[0].id,
        acceptance: 'accepted',
        description: !app._.isEmpty(value) ? value : '',
    };
    this.props.accept(this.state.active[0].id, _value, acceptAll, this._onCancel);
  }

  _onReject(value, acceptAll = '') {
    if (app._.isEqual(value, this.state.value)) {
      this.setState({value});
    }
    let _value = {
        approvedRequestId: this.state.active[0].id,
        acceptance: 'rejected',
        description: !app._.isEmpty(value) ? value : '',
    };
    this.props.reject(this.state.active[0].id, _value, acceptAll, this._onCancel);
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
            onMenuTouch={this.onMenuTouch}
            onCancel={this._onCancelPersnnel}
          />
          {
            (type === 'info') ?
              <Info
                title={title}
                visible={modalVisibility}
                active={active}
                type={type}
                onCancel={this._onCancel}
                onSubmit={app.authorize.can('Request@destroy') ? this._formPop : undefined}
                onReject={app.authorize.can('Request@approve') ? this._formPop: undefined}
              />
              : ''
          }
        </Col>
      </Row>
    );
  }
}

