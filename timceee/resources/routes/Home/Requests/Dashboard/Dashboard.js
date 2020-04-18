import React from 'react';
import {Row, Col, Card} from 'antd';
import PropTypes from 'prop-types';


@autobind
/**
 *
 */
export default class RDashboard extends React.PureComponent {

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <div
      style={{
        padding: '16px',
      }}
      >
      <Row
        gutter={16}
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
      >
        <Col sm={12} md={6}
             style={{
               overflowY: 'auto',
               marginBottom: '8px',
             }}
        >
          <Card
            title="تست"
            style={{
              overflowY: 'auto',
              height: '200px',
              background: '#f78e22',
              color: '#fff',
            }}
          >
            <h1 className='boxC'>23</h1>
          </Card>
        </Col>
        <Col sm={12} md={6}
             style={{
               overflowY: 'auto',
               marginBottom: '8px',
             }}
        >
          <Card
            title="تست 2"
            style={{
              overflowY: 'auto',
              height: '200px',
              background: '#3e91f9',
              color: '#fff',
            }}
          >
            <h1 className='boxC'>245</h1>
          </Card>
        </Col>
        <Col sm={12} md={6}
             style={{
               overflowY: 'auto',
               marginBottom: '8px',
             }}
        >
          <Card
            title="تست 3"
            style={{
              overflowY: 'auto',
              height: '200px',
              background: '#0ca233',
              color: '#fff',
            }}
          >
            <h1 className='boxC'>13</h1>
          </Card>
        </Col>
        <Col sm={12} md={6}
             style={{
               overflowY: 'auto',
               marginBottom: '8px',
             }}
        >
          <Card
            title="تست 4"
            style={{
              overflowY: 'auto',
              height: '200px',
              background: '#aa16ad',
              color: '#fff',
            }}
          >
            <h1 className='boxC'>17</h1>
          </Card>
        </Col>
        <Col sm={24} md={12}
             style={{
               overflowY: 'auto',
               marginBottom: '8px',
             }}
        >
          <Card
            title="t1"
            style={{
              overflowY: 'auto',
              height: '200px',
            }}
          >
            123
          </Card>
        </Col>
        <Col sm={24} md={12}
             style={{
               overflowY: 'auto',
               marginBottom: '8px',
             }}
        >
          <Card
            title="t1"
            style={{
              overflowY: 'auto',
              height: '200px',
            }}
          >
            123
          </Card>
        </Col>
        <Col sm={24}
             style={{
               overflowY: 'auto',
               marginBottom: '8px',
             }}
        >
          <Card
            title="t1"
            style={{
              overflowY: 'auto',
              height: '200px',
            }}
          >
            123
          </Card>
        </Col>
      </Row>
      </div>
    );
  }
}

