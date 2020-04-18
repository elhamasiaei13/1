import React from 'react';
import {connect} from 'react-redux';
import {store, update, destroy, destroyAll, restore, accept, acceptAll} from './Module';
import {show} from '../Device/Module';
import {Row, Col, Modal} from 'antd';
import {ClockingTableContainerWrapper} from './ClockingTable';
import PropTypes from 'prop-types';
import Form from './Form';
import Info from './Info';
import PersonnelList from 'routes/Home/Basic/Personnel/List/ListWrapper';
import jMoment from 'moment-jalaali';

@authorize
@connect((state) => ({
  device: state.Attendance.Device.device,
  currentUser: state.Auth.currentUser,
}), {
  store,
  accept,
  acceptAll,
  destroy,
  destroyAll,
  restore,
  update,
  show,
})
@autobind
/**
 *
 */
export default class Clockings extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    personnel: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onCancel: PropTypes.func,
    accept: PropTypes.func,
    acceptAll: PropTypes.func,
    restore: PropTypes.func,
    destroy: PropTypes.func,
    destroyAll: PropTypes.func,
    store: PropTypes.func,
    update: PropTypes.func,
    show: PropTypes.func,
    device: PropTypes.object,
    can: PropTypes.func,
    defaultValueDateTimeFilter: PropTypes.array,
  };

  static defaultProps = {
    items: undefined,
    defaultValueDateTimeFilter: [],
    onCancel: undefined,
    personnel: [],
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      title: app.translate('routes.home.attendance.clocking.Clocking'),
      active: [],
      type: '',
      modalVisibility: false,
      reSubmit: false,
      personnel: Clockings._getPersonnel(props),

    };
  }

  componentWillReceiveProps(nextProps) {
    if (!app._.isEqual(nextProps.personnel, this.props.personnel) || !app._.isEqual(nextProps.currentUser, this.props.currentUser)) {
      this.setState({
        personnel: Clockings._getPersonnel(nextProps),
      });
    }
  }

  static _getPersonnel(props) {
    return app._.isEmpty(props.personnel) ? ( props.can('Clocking@index') && !props.can('User@index') ? [props.currentUser] : []) : props.personnel;
  }

  /**
   *
   * @param {Object} record
   * @param {Object} menuItem
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
        this._Restore(record);
        break;
    }
  }

  /**
   *
   * @param {Object} record
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
      active: record,
      type: type,
      modalVisibility: true,
    });
  }

  /**
   *
   * @param {Object} item - item to accept
   * @param {Object} status - item to status
   * @private
   */
  _Accept(item, status) {
    const {accept} = this.props;
    if (item.status !== status) {
      Modal.confirm({
        title: app.translate('routes.home.attendance.clocking.Changing Status Clocking'),
        content: app.translate('routes.home.attendance.clocking.Are you sure about changing status clocking', {clocking: item.datetim !== '0000-00-00 00:00:00' ? jMoment(item.datetime, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss') : '2000-01-01 00:00:00'}),
        onOk: () => accept(item.id, status, this._onCancel),
      });
    }
  }

  /**
   *
   * @param {Object} item - item to restor
   * @private
   */
  _Restore(item) {
    const {restore} = this.props;
    Modal.confirm({
      title: app.translate('routes.home.attendance.clocking.Restoring Clocking'),
      content: app.translate('routes.home.attendance.clocking.Are you sure about restoring clocking', {clocking: item[0].datetime!== '0000-00-00 00:00:00' ? jMoment(item[0].datetime, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss') : '2000-01-01 00:00:00'}),
      onOk: () => restore(item[0].id, this._onCancel),
    });
  }
  _approveAll(items, status) {
    const {acceptAll} = this.props;
    let _param = {};
    let _items = items.pluck('id');
    if (!app._.isEmpty(_items)) {
      _param = {
        filterGroups: [
          {
            filters: [
              {
                key: 'id',
                value: _items,
                operator: 'in',
              },
            ],
          },
        ],
      };
      Modal.confirm({
        title: app.translate('routes.home.attendance.clocking.Changing Status Clocking'),
        content: app.translate('routes.home.attendance.clocking.Are you sure about changing status clockings', {clocking: _items.length}),
        onOk: () => acceptAll(_param, status, this._onCancel),
      });
    }
  }
  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _Delete(item) {
    const {destroy, destroyAll} = this.props;
    if (item.length === 1) {
      Modal.confirm({
        maskClosable: true,
        title: app.translate('routes.home.attendance.clocking.Removing Clocking'),
        content: app.translate('routes.home.attendance.clocking.Are you sure about removing clocking', {clocking: item[0].datetime!== '0000-00-00 00:00:00' ? jMoment(item[0].datetime, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss') : '2000-01-01 00:00:00'}),
        onOk: () => destroy(item[0].id, this._onCancel),
      });
    } else {
      if (item.length > 1) {
        let _param = {};
        let _items = item.pluck('id');
        if (!app._.isEmpty(_items)) {
          _param = {
            filterGroups: [
              {
                filters: [
                  {
                    key: 'id',
                    value: _items,
                    operator: 'in',
                  },
                ],
              },
            ],
          };
          Modal.confirm({
            maskClosable: true,
            title: app.translate('routes.home.attendance.clocking.Removing Clocking'),
            content: app.translate('routes.home.attendance.clocking.Are you sure about removing clockings', {count: item.length}),
            onOk: () => {
              destroyAll(_param, this._onCancel);
            },
          });
        }
      }
    }
  }


  _notice(msg = '') {
    Modal.error({
      title: app.translate('routes.home.attendance.clocking.Notice'),
      content: msg,
    });
  }

  _confirm(msg = '', action = 'store') {
    let _this = this;
    Modal.confirm({
      title: app.translate('routes.home.attendance.clocking.Confirm'),
      content: msg,
      onOk: () => {
        switch (action) {
          case 'store':
          case 'update':
            _this._onSubmit(this.state.value, 'acceptAll');
            break;
        }

      },
    });
  }

  _onCancel(err = undefined, result = null, action = 'store') {
    if (!err) {
      if (result && result.data && !app._.isEmpty(result.data)) {
        if (result.data.notice) {
          this._notice(result.data.notice.msg);
        }
        if (result.data.confirm) {
          this._confirm(result.data.confirm.msg, action);
        }
      } else {
        if (this.state.reSubmit && err !== false) {
          this.setState({
            value: {},
          });
        } else {
          this.setState({
            value: {},
            type: '',
            modalVisibility: false,
          });
        }
      }
    }
  }

  /**
   *
   * @private
   */
  _onSubmit(value, acceptAll = false) {
    // const {personnel} = this.state;
    let data = {
      clocking: {
        typeId: value.typeId[value.typeId.length - 1],
        entryType: value.entryType,
        description: value.description,
        datetime: `${value.date} ${value.time}`,
      },
    };
    if (app._.isEqual(value, this.state.value)) {
      this.setState({value});
    }
    if (app._.isEmpty(this.state.active[0])) {
      this.props.store(data, acceptAll, this._onCancel);
    } else {
      this.props.update(this.state.active[0].id, data, acceptAll, this._onCancel);
    }
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
   * @private
   */
  _onReSubmit(reSubmit) {
    this.setState({reSubmit});
  }

  _showModalDevice(error, result) {
    if (!error) {
      Modal.info({
        maskClosable: true,
        title: app.translate('routes.home.attendance.clocking.Device Info'),
        content: (
          <Row
            style={{
              fontSize: '14px',
              lineHeight: '25px',
            }}
          >
            <Col sm={24}>{`${app.translate('routes.home.attendance.clocking.Device Name')} : ${result.data.device.name}`}</Col>
            <Col sm={24}>{`${app.translate('routes.home.attendance.clocking.Device Address')} : ${result.data.device.address}`}</Col>
            <Col sm={24}>{`${app.translate('routes.home.attendance.clocking.Device Port')} : ${result.data.device.port}`}</Col>
            <Col sm={24}>{`${app.translate('routes.home.attendance.clocking.Device Description')} : ${result.data.device.description}`}</Col>
          </Row>
        ),
        onOk() {
        },
        onCancel() {
        },
      });
    }
  }

  _onDevice(deviceId) {
    this.props.show(deviceId, null, this._showModalDevice);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {active, type, title, modalVisibility, personnel, reSubmit} = this.state;
    const {can, items, onCancel, defaultValueDateTimeFilter} = this.props;

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
          <ClockingTableContainerWrapper
            items={items}
            onInfo={this._Info}
            onDelete={can('Clocking@destroy') ? this._Delete : undefined}
            onEdit={can('Clocking@update') ? this._Form : undefined}
            onAdd={undefined}
            onMenuTouch={this.onMenuTouch}
            onCancel={undefined}
            personnel={personnel}
            onDevice={this._onDevice}
            onClickAccepted={this._Accept}
            defaultValueDateTimeFilter={defaultValueDateTimeFilter}
            approveAll={this._approveAll}
          />
          {
            (type === 'edit' || type === 'add' ) ?
              <Form
                title={title}
                visible={modalVisibility}
                item={active}
                type={type}
                onOk={this._onSubmit}
                onCancel={this._onCancel}
                reSubmit={reSubmit}
                onReSubmit={this._onReSubmit}
              /> : ''
          }
          {
            (type === 'info') ?
              <Info
                title={title}
                visible={modalVisibility}
                item={active}
                type={type}
                onDelete={this._Delete}
                onEdit={this._Form}
                onCancel={this._onCancel}
              />
              : ''
          }
        </Col>
      </Row>
    );
  }
}


