import React from 'react';
import {Row, Col} from 'antd';
import PropTypes from 'prop-types';
import {ListContainerWrapper} from './List';

@autobind
/**
 *
 */
export default class Rules extends React.PureComponent {
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
          sm={24}
          md={8}
          style={{
            overflowY: 'auto',
            height: '100%',
          }}
        >
          <ListContainerWrapper/>
        </Col>

      </Row>
    );
  }
}

