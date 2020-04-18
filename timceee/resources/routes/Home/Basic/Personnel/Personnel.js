import React from 'react';
import Form from './Form';
import View from './View';
import { Row, Col } from 'antd';
import { List } from './List';
import { emptyUsers } from './Module';

@autobind
/**
 * Personnel route
 */
export default class Personnel extends React.PureComponent {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      active: null,
      editing: false,
    };

    app.dispatch(emptyUsers());
  }

  /**
   *
   */
  onCancel() {
    this.setState({
      active: null,
      editing: false,
    });
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    app.dispatch(emptyUsers());
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { active, editing } = this.state;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        {
          (!active && !editing) &&
          <Col
            sm={24}
            md={8}
            style={{
              height: '100%',
            }}
          >
            <List
              onClick={(active) => this.setState({active, editing: false})}
              onView={(active) => this.setState({active, editing: false})}
              onEdit={(active) => app.authorize.can('User@update') && this.setState({active, editing: true})}
              onAdd={() => this.setState({active: null, editing: true})}
            />
          </Col>
        }

        {
          editing &&
          <Col
            sm={24}
            style={{
              height: '100%',
            }}
          >
            <Form
              item={active}
              onCancel={this.onCancel}
            />
          </Col>
        }

        {
          active && !editing &&
          <Col
            sm={24}
            style={{
              height: '100%',
            }}
          >

            <View
              item={active}
              onCancel={this.onCancel}
            />
          </Col>
        }
      </Row>
    );
  }
}
