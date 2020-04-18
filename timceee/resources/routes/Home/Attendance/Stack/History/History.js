import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import PersonnelList from 'routes/Home/Basic/Personnel/List/ListWrapper';
import StacksListContainerWrapper from './StacksList/StacksListContainerWrapper';
import StacksLogsListContainerWrapper from './StacksLogs/StacksLogsListContainerWrapper';
import Info from './Info/Info';
import Form from './Form/Form';
import {connect} from 'react-redux';
import {storeLog} from './Module';

@connect(null, {
  storeLog,
})
@autobind
/**
 *
 */
export default class History extends React.PureComponent {
  static propTypes = {
    storeLog: PropTypes.func,
  };

  /**
   *
   */
  constructor() {
    super();

    this.state = {
      selectedLog: {},
      personnel: null,
      stack: null,
      form: false,
      visible: false,
    };
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      selectedLog: {},
      personnel: null,
      stack: null,
      form: false,
      visible: false,
    }, callback);
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancelStack(callback = () => {
  }) {
    this.setState({
      selectedLog: null,
      stack: null,
      form: false,
      visible: false,
    }, callback);
  }

  /**
   *
   * @private
   */
  _onCancelModal() {
    this.setState({
      selectedLog: null,
      form: false,
      visible: false,
    });
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onInfo(item) {
    this.setState({
      selectedLog: item[0],
      visible: true,
      form: false,
    });
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onForm(item = []) {
    this.setState({
      selectedLog: item[0],
      visible: true,
      form: true,
    });
  }

  /**
   *
   * @param {*} err
   * @param {Object} item
   * @private
   */
  _onCancelInsert(err, item = undefined) {
    if (!err) {
      this._onCancelModal();
    }
  }

  /**
   *
   * @param {Object} value
   * @private
   */
  _onSubmit(value) {
    const {personnel, stack} = this.state;
    //console.log('value', value);
    let data = {
      stackLog: {
        ...value,
        userId: personnel.id,
        ruleId: stack.id,
      },
    };


    this.props.storeLog(personnel.id, stack.id, data, this._onCancelInsert);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {personnel, stack, form, visible, selectedLog} = this.state;

    return (
      <span>
        {
          personnel === null ?
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
                <PersonnelList
                  onClick={(personnel) => this.setState({personnel})}
                />

              </Col>
            </Row>
            :
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
                <StacksListContainerWrapper
                  personnel={personnel}
                  onCancel={this._onCancel}
                  onClick={(stack) => this.setState({stack})}
                  activeItem={stack && stack.id}
                />
              </Col>
              <Col
                md={16}
                style={{
                  height: '100%',
                }}
              >
                {!!stack &&
                <StacksLogsListContainerWrapper
                  personnel={personnel}
                  stackItem={stack}
                  onCancel={this._onCancelStack}
                  onAdd={this._onForm}
                  onEdit={this._onForm}
                  onInfo={this._onInfo}
                />
                }
                {!!selectedLog && !!stack && visible && !form &&
                <Info
                  item={selectedLog}
                  visible={visible}
                  onCancel={this._onCancelModal}
                />
                }
                {!!stack && visible && !!form &&
                <Form
                  item={selectedLog}
                  visible={visible}
                  onCancel={this._onCancelModal}
                  onSubmit={this._onSubmit}
                />
                }
              </Col>
            </Row>

        }
      </span>
    );
  }
}
