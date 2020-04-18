import React from 'react';
import {Row, Col, Modal, Button} from 'antd';
import PrimitiveChartsDevice from 'components/common/PrimitiveCharts/PrimitiveChartsDevice';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {testConnection, indexDeviceChart, emptyDevicesChart, updateDeviceChart, storeDeviceChart, destroyDeviceChart} from '../Module';
import Form from './Form';
import Image from './Image';

@connect((state) => ({
  devicesChart: state.Attendance.Device.devicesChart,
}), {
  indexDeviceChart,
  testConnection,
  emptyDevicesChart,
  storeDeviceChart,
  updateDeviceChart,
  destroyDeviceChart,
}, null, {withRef: true})
@autobind
/**
 *
 */
export default class DeviceChart extends React.PureComponent {
  static propTypes = {
    devicesChart: PropTypes.array,
    items: PropTypes.array,
    indexDeviceChart: PropTypes.func,
    buttons: PropTypes.array,
    selectable: PropTypes.bool,
    showAllCheckboxes: PropTypes.bool,
    onButtonClick: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onCursorChanged: PropTypes.func,
    testConnection: PropTypes.func,
    emptyDevicesChart: PropTypes.func,
    storeDeviceChart: PropTypes.func,
    updateDeviceChart: PropTypes.func,
    destroyDeviceChart: PropTypes.func,
    cursorItem: PropTypes.number,
    selected: PropTypes.array,
  };

  static defaultProps = {
    devicesChart: [],
    items: [],
    buttons: [
      new primitives.orgdiagram.ButtonConfig(
        'refresh', 'ui-icon-refresh', app.translate('main.Refresh'),
      ),
      new primitives.orgdiagram.ButtonConfig(
        'add', 'ui-icon-plus', app.translate('main.Add'),
      ),
      new primitives.orgdiagram.ButtonConfig(
        'edit', 'ui-icon-pencil', app.translate('main.Edit'),
      ),
      new primitives.orgdiagram.ButtonConfig(
        'delete', 'ui-icon-trash', app.translate('main.Delete'), // ui-icon-close
      ),
    ],
    selectable: false,
    showAllCheckboxes: false,
    selected: [],
  };

  /**
   * This is constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      action: null,
      activeItem: null,
      items: props.items,
      statuses: {},
      spinning: props.items ? false : true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.items.length === 0) {
      this.setState({spinning: true});
      this.props.indexDeviceChart({includes: ['device', 'city', 'province']}, (err) => {
        this.setState({spinning: false});
        this._testConnection();
      });
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (app._.isEmpty(np.items) && !app._.isEmpty(np.devicesChart)) {
      if (!app._.isEqual(this.props.devicesChart, np.devicesChart) || !app._.isEqual(this.state.items, np.devicesChart)) {
        this.setState({spinning: false, items: np.devicesChart});
        this._testConnection();
      }
    } else {
      if (!app._.isEqual(np.items, this.props.items)) {
        this.setState({spinning: false, items: np.items});
        this._testConnection();
      }
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyDevicesChart();
  }

  _renderItem(statuses) {
    const {items} = this.state;
    let _items = [];
    if (!app._.isEmpty(items)) {
      items.map((item) => {
        _items.push(
          {
            id: item.id,
            title: item.name ? item.name : item.device ? item.device.name : item.type,
            description: `${item.province ? item.province.name : ''} ${item.city ? item.city.name : ''}`,
            parent: item.parentId,
            templateName: item.type,
            type: item.type,
            status: statuses && item.deviceId && statuses[item.deviceId],
            deviceId: item.deviceId,
            cityId: item.cityId,
            provinceId: item.provinceId,
            avatar: item.device ?
              item.device.deviceGroupId === 2 ? Image._v800() :
                item.device.deviceGroupId === 1 || item.device.deviceGroupId === 3 ? Image._t41() :
                  item.device.deviceGroupId > 3 ? Image._rf() :
                    ''
              : ''
            ,
          },
        );
      });
    }
    return _items;
  }

  _onCursorChanged(jQueryEvent, primitives) {
    const {onCursorChanged} = this.props;
    this.setState({activeItem: primitives.context});
    onCursorChanged && onCursorChanged(jQueryEvent, primitives);
  }

  _devices(activeItem) {
    let devices = [];
    const {items} = this.state;
    items.map((item) => {
      if (item.parentId === activeItem) {
        if (item.type === 'device') {
          if (item.device) {
            devices.push(item.deviceId);
          }
        } else {
          devices.push(...this._devices(item.id));
        }
      }
    });

    return devices;
  }

  _testConnection() {
    const {activeItem} = this.state;
    const {testConnection} = this.props;
    if (activeItem && activeItem.templateName === 'device') {
      this.setState({
        statuses: {...this.state.statuses, [activeItem.deviceId]: null},
      }, () => {
        testConnection(activeItem.deviceId, null, (err, res) => !err && this.setState({
          statuses: {...this.state.statuses, [activeItem.deviceId]: res},
        }));
      });
    } else {
      let devices = this._devices(activeItem && activeItem.parent);
      devices.map((deviceId) => {
        this.setState({
          statuses: {...this.state.statuses, [deviceId]: null},
        }, () => {
          testConnection(deviceId, null, (err, res) => !err && this.setState({
            statuses: {...this.state.statuses, [deviceId]: res},
          }));
        });
      });
    }
  }

  _form(action) {
    this.setState({action});
  }

  _delete() {
    const {destroyDeviceChart} = this.props;
    const {activeItem} = this.state;
    destroyDeviceChart(activeItem.id, (err) => !err && this._onCancel());
    this.setState({action: null, activeItem: null});
  }

  _tools() {
    let _items = [];
    const {activeItem, statuses} = this.state;
    _items.push(<div key={1} style={{float: 'left'}}>
      {activeItem && <span style={{
        color: '#333',
        padding: '5px',
      }}>{activeItem.title}</span>}
      <Button.Group>
        <Button
          type='primary'
          disabled={!(activeItem)}
          onClick={this._testConnection}
        >
          <MaterialIcon name='autorenew'/>
          {app.translate('main.Refresh')}
        </Button>
        <Button
          type='primary'
          disabled={!(activeItem && activeItem.templateName !== 'device')}
          onClick={() => this._form('add')}
        >
          <MaterialIcon name='plus'/>
          {app.translate('main.Add')}
        </Button>
        <Button
          type='primary'
          disabled={!(activeItem && activeItem.templateName !== 'company')}
          onClick={() => this._form('edit')}
        >
          <MaterialIcon name='pencil'/>
          {app.translate('main.Edit')}
        </Button>
        <Button
          type='danger'
          disabled={!(activeItem && activeItem.templateName !== 'company')}
          onClick={() => this._delete()}
        >
          <MaterialIcon name='delete'/>
          {app.translate('main.Delete')}
        </Button>
      </Button.Group>
    </div>);
    return _items;
  }

  _onCancel() {
    this.setState({action: null});
  }

  _onSubmit(value) {
    const {storeDeviceChart, updateDeviceChart} = this.props;
    const {action, activeItem} = this.state;
    if (action === 'add') {
      storeDeviceChart(value, (err) => !err && this._onCancel());
    } else {
      updateDeviceChart(activeItem.id, value, (err) => !err && this._onCancel());
    }
    this.fChart.setCursorItem(null);
    this.setState({action: null, activeItem: null});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {spinning, activeItem, action, statuses} = this.state;
    const {
      buttons,
      selectable,
      showAllCheckboxes,
      onButtonClick,
      onSelectionChanged,
      onCursorChanged,
      cursorItem,
      selected,
    } = this.props;

    return (
      <Row
        className="devices"
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        <PrimitiveChartsDevice
          items={this._renderItem(statuses)}
          buttons={buttons}
          hasButtons={!!onButtonClick}
          selectable={selectable}
          showAllCheckboxes={showAllCheckboxes}
          onButtonClick={onButtonClick}
          onSelectionChanged={onSelectionChanged}
          onCursorChanged={this._onCursorChanged}
          cursorItem={cursorItem}
          selected={selected}
          tools={this._tools()}
          ref={(input) => this.fChart = input}
        />
        {
          action &&
          <Form
            item={activeItem}
            action={action}
            onCancel={this._onCancel}
            onSubmit={this._onSubmit}
            visible={!!action}
          />
        }
      </Row>
    );
  }
}
