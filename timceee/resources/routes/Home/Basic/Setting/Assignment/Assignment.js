import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import List from '../Definition/List/ListWrapper';
import Form from './Form';

@authorize
@autobind
/**
 *
 */
export default class Assignment extends React.PureComponent {
  static propTypes = {
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
      editing: false,
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
      setting: null,
      editing: false,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {setting, editing} = this.state;
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
            activeItem={setting && setting.id}
            onClick={(setting) => app.authorize.can('SettingAssignment@update') && this._onCancel(() => this.setState({setting, editing: true}))}
          />
        </Col>

        {
          editing &&
          <Col
            md={16}
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
