import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import List from 'routes/Home/Attendance/Stack/Packs/PacksList/PacksListWrapper';
import Form from './Form';
import {connect} from 'react-redux';
import {emptyPackRule, emptyPackRules} from './../Packs/Module';

@authorize
@connect(null, {
  emptyPackRules,
  emptyPackRule,
})
@autobind
/**
 *
 */
export default class Assignment extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
    emptyPackRule: PropTypes.func,
    emptyPackRules: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      packRule: null,
      editing: false,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPackRule();
    this.props.emptyPackRules();
  }
  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      packRule: null,
      editing: false,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {packRule, editing} = this.state;
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
            activeItem={packRule && packRule.id}
            onClick={ (packRule) => can('StackPackRuleAssignment') && this._onCancel(() => this.setState({packRule, editing: true}))}
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
              item={packRule}
              onCancel={this._onCancel}
            />
          </Col>
        }

      </Row>
    );
  }
}
