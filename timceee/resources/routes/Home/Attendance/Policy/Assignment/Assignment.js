import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Row, Col } from 'antd';
import List from 'routes/Home/Attendance/Policy/Definition/List/ListWrapper';
import { emptyUsers } from 'routes/Home/Basic/Personnel/Module';
import Form from './Form';
import { emptyPolicies} from './../Definition/Module';

@connect((state) => ({}), {
  emptyPolicies,
})
@authorize
@autobind
/**
 *
 */
export default class Assignment extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
    emptyPolicies: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      policy: null,
      editing: false,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPolicies();
    app.dispatch(emptyUsers());
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {}) {
    this.setState({
      policy: null,
      editing: false,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { policy, editing } = this.state;
    const { can } = this.props;

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
          <List
            activeItem={policy && policy.id}
            onClick={(policy) => can('PolicyAssignment@update') && this._onCancel(() => this.setState({policy, editing: true}))}
          />
        </Col>

        {
          editing &&
          <Col
            md={16}
            style={{
              height: '100%',
            }}
          >
            <Form
              item={policy}
              onCancel={this._onCancel}
            />
          </Col>
        }

      </Row>
    );
  }
}
