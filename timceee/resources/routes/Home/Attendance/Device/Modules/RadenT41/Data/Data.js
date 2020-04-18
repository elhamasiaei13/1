import React from 'react';
import Cards from './Cards';
import PropTypes from 'prop-types';
import Clockings from './Clockings';
import Personnel from './Personnel';
import Fingerprints from './Fingerprints';
import ListView from 'components/common/ListView';
import {Card, Button, Row, Col} from 'antd';

@autobind
/**
 *
 */
export default class Data extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    onCancel: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      active: 1,
    };
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  _getList() {
    return [
      {
        id: 1,
        primaryText: app.translate('routes.home.attendance.device.Clockings'),
        icon: 'swap-vertical',
      },
      {
        id: 2,
        primaryText: app.translate('routes.Personnel'),
        icon: 'account',
      },
      {
        id: 3,
        primaryText: app.translate('routes.home.attendance.device.Cards'),
        icon: 'credit-card',
      },
      {
        id: 4,
        primaryText: app.translate('routes.home.attendance.device.Fingerprints'),
        icon: 'fingerprint',
      },
    ];
  }

  /**
   *
   * @return {XML}
   * @private
   */
  _renderData() {
    const {active} = this.state;
    const {device} = this.props;

    switch (active) {
      case 1:
      default:
        return <Clockings device={device}/>;
      case 2:
        return <Personnel device={device}/>;
      case 3:
        return <Cards device={device}/>;
      case 4:
        return <Fingerprints device={device}/>;
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {device, onCancel} = this.props;
    const {active} = this.state;

    return (
      <Card
        className="wrapper data"
        title={app.translate('routes.home.attendance.device.Integrating with', {device: device.name})}
        extra={
          <Button
            type="dashed"
            onClick={() => onCancel()}
          >
            {app.translate('main.Back')}
          </Button>
        }
      >

        <Row
          gutter={16}
          style={{
            height: '100%',
          }}
        >

          <Col md={6}>
            <ListView
              items={this._getList()}
              activeItem={active}
              onClick={(item) => this.setState({active: item.id})}
              icon
            />
          </Col>

          <Col
            md={18}
            style={{
              height: '100%',
            }}
          >
            {this._renderData()}
          </Col>

        </Row>

      </Card>
    );
  }
}
