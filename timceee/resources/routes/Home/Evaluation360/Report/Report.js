import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';

@authorize
@autobind
/**
 *
 */
export default class Report extends React.PureComponent {
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
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

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
        <Col
          md={8}
          style={{
            height: '100%',
          }}
        >
          test
        </Col>
      </Row>
    );
  }
}
