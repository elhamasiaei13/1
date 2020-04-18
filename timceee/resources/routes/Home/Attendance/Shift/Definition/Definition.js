import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import {emptyShifts, copy} from './Module';
import {connect} from 'react-redux';
import {Row, Col, Modal} from 'antd';

@authorize
@connect(null, {
  emptyShifts,
  copy,
})
@autobind
/**
 *
 */
export default class Definition extends React.PureComponent {
  static propTypes = {
    emptyShifts: PropTypes.func,
    copy: PropTypes.func,
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      calendar: null,
      status: null,
    };
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      calendar: null,
      status: null,
    });
  }

  _onCopy() {
    const {copy} = this.props;
    const {calendar} = this.state;
    copy(calendar, {}, () => this._onCancel());
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {calendar, status} = this.state;
    const {can} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >

        {
          status === 'editing' ?
            <Col
              style={{
                height: '100%',
              }}
            >
              <Form
                item={calendar}
                onCancel={this._onCancel}
              />
            </Col>
            :
            <Col
              md={8}
              style={{
                height: '100%',
              }}
            >
              <List
                onAdd={() => this.setState({status: 'editing'})}
                onClick={(calendar) => can('Shift@update') && this.setState({calendar, status: 'editing'})}
                onEdit={(calendar) => this.setState({calendar, status: 'editing'})}
                onCopy={(calendar) => this.setState({calendar, status: 'copy'})}
              />
            </Col>
        }

        {
          status === 'copy' &&
          <Modal
            onOk={() => this._onCopy()}
            onCancel={() => this._onCancel()}
            okText={app.translate('main.Copy')}
            cancelText={app.translate('main.Cancel')}
            visible={status === 'copy'}
            title={`${app.translate('main.Copy')} ${app.translate('routes.Shifts')}`}>
            {app.translate('main.Are you sure copy??', {item: `${app.translate('routes.Shifts')} ${calendar ? calendar.name : ''}`})}
          </Modal>
        }

      </Row>
    );
  }
}
