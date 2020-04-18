import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import Positions from '../Common/Positions';
import Form from './Form';

@authorize
@autobind
/**
 *
 */
export default class Contact extends React.PureComponent {
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
      position: null,
      status: false,
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
      position: null,
      status: false,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {position, status} = this.state;
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
          <Positions
            activeItem={position && position.id}
            onClick={(position) => can('EvaluationContact@update') && this._onCancel(() => this.setState({position, status: 'editing'}))}
          />
        </Col>

        {
          status &&
          <Col
            md={16}
            style={{
              height: '100%',
            }}
          >

            <Form
              item={position}
              onCancel={this._onCancel}
            />
          </Col>
        }

      </Row>
    );
  }
}
