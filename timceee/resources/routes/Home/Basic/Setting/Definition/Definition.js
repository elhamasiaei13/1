import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import {emptySettings} from './Module';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';

@authorize
@connect(null, {
  emptySettings,
})
@autobind
/**
 *
 */
export default class Definition extends React.PureComponent {
  static propTypes = {
    emptySettings: PropTypes.func,
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      setting: null,
      status: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptySettings();
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      setting: null,
      status: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {setting, status} = this.state;
    const {can} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        <Col
          md={8}
          style={{
            height: '100%',
          }}
        >
          <List
            statusForm={status}
            activeItem={setting && setting.id}
            onAdd={() => this.setState({status: 'editing'})}
            onClick={(setting) => can('Setting@update') && this.setState({setting, status: 'editing'})}
            onEdit={(setting) => this.setState({setting, status: 'editing'})}
            onCancel={this._onCancel}
          />
        </Col>
        {
          status === 'editing' &&
          <Col
            md={8}
            style={{
              height: '100%',
            }}
          >
            <Form
              item={setting}
              onCancel={this._onCancel}
            />
          </Col>
        }

      </Row>
    );
  }
}
