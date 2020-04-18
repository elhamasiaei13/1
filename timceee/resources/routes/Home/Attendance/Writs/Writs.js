import React from 'react';
import {connect} from 'react-redux';
import {store, update, destroy, accept} from './Module';
import {show} from '../Device/Module';
import {Row, Col, Modal} from 'antd';
import {WritsTableContainerWrapper} from './WritsTable';
import PropTypes from 'prop-types';
import Form from './Form';
import Info from './Info';
import PersonnelList from 'routes/Home/Basic/Personnel/List/ListWrapper';

@authorize
@connect((state) => ({
  device: state.Attendance.Device.device,
}), {
  store,
  accept,
  destroy,
  update,
  show,
})
@autobind
/**
 *
 */
export default class Writs extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    personnel: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onCancel: PropTypes.func,
    accept: PropTypes.func,
    destroy: PropTypes.func,
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
      title: app.translate('routes.home.attendance.writs.Writs'),
      active: [],
      type: '',
      modalVisibility: false,
      personnel: props.personnel,

    };
    if (this.personnelsRef) {
      this.personnelsRef.empty();
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.personnelsRef) {
      this.personnelsRef.getWrappedInstance().getWrappedInstance().empty();
    }
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
    Modal.confirm({
      title: app.translate('routes.home.attendance.writs.Changing Status Writs'),
      content: app.translate('routes.home.attendance.writs.Are you sure about changing status writs', {writs: item.datetime}),
      onOk: () => accept(item.id, status, this._onCancel),
    });
  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _Delete(item) {
    const {destroy} = this.props;
    Modal.confirm({
      title: app.translate('routes.home.attendance.writs.Removing Writs'),
      content: app.translate('routes.home.attendance.writs.Are you sure about removing writs', {writs: item[0].datetime}),
      onOk: () => destroy(item[0].id, this._onCancel),
    });
  }

  /**
   *
   * @param {String} msg
   * @private
   */
  _notice(msg = '') {
    Modal.error({
      title: app.translate('routes.home.attendance.writs.Notice'),
      content: msg,
    });
  }

  /**
   *
   * @param {String} msg
   * @param {String} action
   * @private
   */
  _confirm(msg = '', action = 'store') {
    let _this = this;
    Modal.confirm({
      title: app.translate('routes.home.attendance.writs.Confirm'),
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

  /**
   *
   * @param {*} err
   * @param {*} result
   * @param {String} action
   * @private
   */
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
        this.setState({
          value: {},
          type: '',
          modalVisibility: false,
        });
      }
    }
  }

  /**
   *
   * @param {Object} value
   * @param {Boolean} acceptAll
   * @private
   */
  _onSubmit(value, acceptAll = false) {
    const {personnel} = this.state;
    let data = {
      writ: {
        typeId: value.typeId[value.typeId.length - 1],
        description: value.description,
        registrationDatetime: `${value.registrationDatetime}`,
        values: value.values,
        userId: personnel[0].id,
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
  _setPersonnel(item) {
    this.setState({personnel: [item]});
  }

  /**
   *
   * @private
   */
  _onCancelPersonnel() {
    this.setState({personnel: null});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {active, type, title, modalVisibility, personnel} = this.state;
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
        {app._.isEmpty(personnel) ?
          <Col sm={24} md={8}
               style={{
                 overflowY: 'auto',
                 height: '100%',
               }}
          >
            <PersonnelList
              onClick={(item) => can('Writ@index') && this._setPersonnel(item)}
              ref={(input) => this.personnelsRef = input && input.getWrappedInstance()}
            />
          </Col>
          :
          <Col
            style={{
              overflowY: 'auto',
              height: '100%',
            }}
          >
            <WritsTableContainerWrapper
              items={items}
              onInfo={this._Info}
              onDelete={this._Delete}
              onEdit={this._Form}
              onAdd={this._Form}
              onMenuTouch={this.onMenuTouch}
              onCancel={onCancel !== undefined ? onCancel : this._onCancelPersonnel}
              personnel={personnel}
              onClickAccepted={this._Accept}
              defaultValueDateTimeFilter={defaultValueDateTimeFilter}
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
        }
      </Row>
    );
  }
}


