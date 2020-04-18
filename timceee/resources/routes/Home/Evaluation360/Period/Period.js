import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import {emptyPeriods} from './Module';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';

@authorize
@connect(null, {
  emptyPeriods,
})
@autobind
/**
 *
 */
export default class Period extends React.PureComponent {
  static propTypes = {
    emptyPeriods: PropTypes.func,
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      period: null,
      status: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPeriods();
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      period: null,
      status: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {period, status} = this.state;
    const {can} = this.props;

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
            statusForm={status}
            activeItem={period && period.id}
            onAdd={() => this.setState({status: 'editing'})}
            onClick={(period) => can('Period@update') && this.setState({period, status: 'editing'})}
            onEdit={(period) => this.setState({period, status: 'editing'})}
            onCancel={this._onCancel}
          />
        </Col>
        {
          status === 'editing' &&
          <Col
            md={8}
            style={{
              height: '100%',
            }}
          >
            <Form
              item={period}
              onCancel={this._onCancel}
            />
          </Col>
        }

      </Row>
    );
  }
}
