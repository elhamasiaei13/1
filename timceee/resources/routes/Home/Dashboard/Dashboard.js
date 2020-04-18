import React from 'react';
import Charts from './Charts';
import {Row, Col} from 'antd';
import Bulletin from '../Bulletin';

@autobind
@authorize
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
          sm={24}
          style={{
            overflowY: 'auto',
            padding: 0,
            height: '100%',
            margin: 0,
          }}
        >
          <Row>
            { app.authorize.can('DashboardBulletin') &&
              <Col
                sm={24}
                style={{
                  overflowY: 'auto',
                  padding: 0,
                  margin: 0,
                }}>
                <Bulletin/>
              </Col>
            }
            { app.authorize.can('DashboardChart') &&
              <Col
                sm={24}
                style={{
                  overflowY: 'auto',
                  padding: '0px 4px',
                  margin: 0,
                }}
              >
                <Charts/>
              </Col>
            }
          </Row>
        </Col>
      </Row>
    );
  }
}
