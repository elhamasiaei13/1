import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import List from 'routes/Home/Attendance/Shift/Definition/List/ListWrapper';
import { emptyUsers } from 'routes/Home/Basic/Personnel/Module';
import Form from './Form';

@authorize
@autobind
/**
 *
 */
export default class Assignment extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      shift: null,
      editing: false,
    };
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
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {}) {
    this.setState({
      shift: null,
      editing: false,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { shift, editing } = this.state;
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
            activeItem={shift && shift.id}
            onClick={(shift) => can('ShiftAssignment@update') && this._onCancel(() => this.setState({shift, editing: true}))}
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
              item={shift}
              onCancel={this._onCancel}
              showDateFromDateTo={true}
            />
          </Col>
        }

      </Row>
    );
  }
}
