import React from 'react';
import {Row, Col} from 'antd';
import List from './List';
import Form from './Form';
import ClockingTypes from '../ClockingTypes';
import RadenT41View from '../Modules/RadenT41/View';
import RadenRF900View from '../Modules/RadenRF900/View';
import V800View from '../Modules/V800/View';
import RadenT41Data from '../Modules/RadenT41/Data';
import RadenRF900Data from '../Modules/RadenRF900/Data';
import V800Data from '../Modules/V800/Data';
import RadenT41Settings from '../Modules/RadenT41/Settings';
import RadenRF900Settings from '../Modules/RadenRF900/Settings';
import V800Settings from '../Modules/V800/Settings';

@autobind
/**
 *
 */
export default class DeviceList extends React.PureComponent {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      device: null,
      status: null,
    };
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      device: null,
      status: null,
    }, () => callback());
  }

  /**
   *
   * @param {Object} device
   * @return {XML}
   * @private
   */
  _renderView(device) {
    switch (device.deviceGroupId) {
      case 2:
        return (
          <V800View
            device={device}
            onCancel={this._onCancel}
          />
        );
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <RadenRF900View
            device={device}
            onCancel={this._onCancel}
          />
        );
      case 1:
      case 3:
      default:
        return (
          <RadenT41View
            device={device}
            onCancel={this._onCancel}
          />
        );
    }
  }

  /**
   *
   * @param {Object} device
   * @return {XML}
   * @private
   */
  _renderData(device) {
    switch (device.deviceGroupId) {
      case 2:
        return (
          <V800Data
            device={device}
            onCancel={this._onCancel}
          />
        );
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <RadenRF900Data
            device={device}
            onCancel={this._onCancel}
          />
        );
      case 1:
      case 3:
      default:
        return (
          <RadenT41Data
            device={device}
            onCancel={this._onCancel}
          />
        );
    }
  }

  /**
   *
   * @param {Object} device
   * @return {XML}
   * @private
   */
  _renderSettings(device) {
    switch (device.deviceGroupId) {
      case 2:
        return (
          <V800Settings
            device={device}
            onCancel={this._onCancel}
          />
        );
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <RadenRF900Settings
            device={device}
            onCancel={this._onCancel}
          />
        );
      case 1:
      case 3:
      default:
        return (
          <RadenT41Settings
            device={device}
            onCancel={this._onCancel}
          />
        );
    }
  }

  /**
   *
   * @return {XML[]}
   * @private
   */
  _render() {
    const {device, status} = this.state;
    let children = [];

    const list = (
      <Col
        key="0"
        md={8}
        style={{
          height: '100%',
        }}
      >
        <List
          activeItem={device && device.id}
          onAdd={() => this._onCancel(() => this.setState({device: {}, status: 'adding'}))}
          onView={(device) => this._onCancel(() => this.setState({device, status: 'viewing'}))}
          onEdit={(device) => this._onCancel(() => this.setState({device, status: 'editing'}))}
          onClick={(device) => this._onCancel(() => this.setState({device, status: 'integrating'}))}
          onClockingTypes={(device) => this._onCancel(() => this.setState({device, status: 'clockingTypes'}))}
        />
      </Col>
    );

    switch (status) {
      case 'adding':
        children.push(list,
          <Col
            key="1"
            md={16}
          >
            <Form
              onCancel={this._onCancel}
            />
          </Col>);
        break;
      case 'viewing':
        children.push(list,
          <Col
            key="1"
            md={16}
            style={{
              height: '100%',
            }}
          >
            {this._renderView(device)}
          </Col>);
        break;
      case 'integrating':
        children.push(<Col
          key="1"
          md={24}
          style={{
            height: '100%',
          }}
        >
          {this._renderData(device)}
        </Col>);
        break;
      case 'editing':
        children.push(<Col
          key="1"
          md={24}
          style={{
            height: '100%',
          }}
        >
          {this._renderSettings(device)}
        </Col>);
        break;
      case 'clockingTypes':
        children.push(list,
          <Col
            key="1"
            md={16}
            style={{
              height: '100%',
            }}
          >
            <ClockingTypes
              device={device}
              onCancel={this._onCancel}
            />
          </Col>);
        break;
      default:
        children.push(list);
    }

    return children;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        className="devices"
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        {this._render()}
      </Row>
    );
  }
}
