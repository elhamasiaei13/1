import React from 'react';
import {Row, Col} from 'antd';

@autobind
/**
 *
 */
export default class Dashboard extends React.PureComponent {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
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
          overflowY: 'auto',
          height: '100%',
          margin: 0,
        }}
      >
        <Col
          style={{
            overflowY: 'auto',
            height: '100%',
          }}
        >123
        </Col>
      </Row>
    );
  }
}
