import React from 'react';
import {Row, Col} from 'antd';
import List from './List';
import Form from './Form';

@autobind
/**
 *
 */
export default class Procedure extends React.PureComponent {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      procedure: null,
    };
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      procedure: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {procedure} = this.state;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >

        {
          !procedure ?
            <Col
              sm={24}
              md={12}
              lg={8}
              style={{height: '100%'}}
            >
              <List
                onAdd={() => this.setState({procedure: {}})}
                onClick={(procedure) => this.setState({procedure})}
                onEdit={(procedure) => this.setState({procedure})}
              />
            </Col>
            :
            <Col
              sm={24}
              style={{height: '100%'}}
            >
              <Form
                item={procedure}
                onCancel={this._onCancel}
              />
            </Col>
        }

      </Row>
    );
  }
}
