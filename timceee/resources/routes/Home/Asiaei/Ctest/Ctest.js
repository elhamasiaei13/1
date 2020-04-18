import React from 'react';
import {Row, Col} from 'antd';

@autobind
/**
 *
 */
export default class Ctest extends React.PureComponent {
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
   * @return {XML}
   */
  render() {
    return (
      <Row
        gutter={16}
        style={{
          margin: '0px',
        }}
      >
        <Col
          style={{
            margin: '8px 0px',
          }}>
            Ctest gdfgd
        </Col>
      </Row>
    );
  }
}
