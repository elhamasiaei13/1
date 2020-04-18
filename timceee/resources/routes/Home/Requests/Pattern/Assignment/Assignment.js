import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import List from '../RulePack/List/ListWrapper';
import Form from './Form';
import {connect} from 'react-redux';
import {emptyRulePack, emptyRulePacks} from './../RulePack/Module';

@connect(null, {
  emptyRulePacks,
  emptyRulePack,
})
@authorize
@autobind
/**
 *
 */
export default class Assignment extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
    emptyRulePacks: PropTypes.func,
    emptyRulePack: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      rulePack: null,
      editing: false,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRulePacks();
    this.props.emptyRulePack();
  }
  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      rulePack: null,
      editing: false,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {rulePack, editing} = this.state;
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
            activeItem={rulePack && rulePack.id}
            onClick={(rulePack) => can('RequestRulePackAssignment@update') && this._onCancel(() => this.setState({rulePack, editing: true}))}
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
              item={rulePack}
              onCancel={this._onCancel}
            />
          </Col>
        }

      </Row>
    );
  }
}
