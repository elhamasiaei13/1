import React from 'react';
import {connect} from 'react-redux';
import {Card, Button, Row, Col} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
export default class Laboratory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          overflow: 'auto',
          margin: '0',
        }}>
        <Col sm={24}
             style={{
               height: '100%',
             }}
        >
          <Card
            title="Test"
            style={{
              height: '100%',
              position: 'relative',
            }}
          >
111
          </Card>
        </Col>
      </Row>
    );
  }
}
