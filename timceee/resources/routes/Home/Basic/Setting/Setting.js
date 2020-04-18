import React from 'react';
import { Row, Col, Card } from 'antd';

@autobind
/**
 *
 */
export default class Setting extends React.PureComponent {
  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        gutter={16}
        style={{
          margin: 0,
        }}
      >
        <Col sm={24} md={12} lg={8} xl={6}>
          <Card>
            hello
          </Card>
        </Col>
      </Row>
    );
  }
}
