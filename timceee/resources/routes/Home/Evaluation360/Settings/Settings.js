import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

@autobind
/**
 *
 */
export default class Settings extends React.PureComponent {
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
      status: null,
    };
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      status: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >

        {
          status === 'editing' ?
            <Col
              style={{
                height: '100%',
              }}
            >
              22
            </Col>
            :
            <Col
              md={8}
              style={{
                height: '100%',
              }}
            >
              11
            </Col>
        }

      </Row>
    );
  }
}
