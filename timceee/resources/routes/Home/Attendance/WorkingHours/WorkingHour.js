import React from 'react';
import FactorsList from './FactorsList';
import FactorForm from './FactorForm';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import {emptyWorkingHours, copy} from './Module';
import {connect} from 'react-redux';
import {Row, Col, Modal} from 'antd';

@authorize
@connect((state) => ({
  factor: state.Attendance.WorkingHours.factor,
}), {
  copy,
  emptyWorkingHours,
})
@autobind
/**
 *
 */
export default class WorkingHour extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
    copy: PropTypes.func,
    emptyWorkingHours: PropTypes.func,
    factor: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      workingHour: null,
      factor: null,
      status: null,
    };
  }

  _onCopy() {
    const {copy} = this.props;
    const {workingHour} = this.state;
    copy(workingHour, {}, () => this._onCancel());
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      workingHour: null,
      factor: null,
      status: null,
    }, callback);
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  get _render() {
    const {workingHour, factor, status} = this.state;
    const {can} = this.props;
    const fullFactor = this.props.factor;
    let children = [];

    const list = (<Col
      key="0"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <List
        onAdd={() => this.setState({workingHour: {}, status: 'adding'})}
        onEdit={(workingHour) => this.setState({workingHour, status: 'editing'})}
        onCopy={(workingHour) => this.setState({workingHour, status: 'copy'})}
        onClick={(workingHour) => can('WorkingHour@update') && this.setState({workingHour, status: 'editing'})}
      />
    </Col>);
    const copy = (<Col
      key="copy"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <Modal
        onOk={() => this._onCopy()}
        onCancel={() => this._onCancel()}
        okText={app.translate('main.Copy')}
        cancelText={app.translate('main.Cancel')}
        visible={status === 'copy'}
        title={`${app.translate('main.Copy')} ${app.translate('routes.Working Hours')}`}>
        {app.translate('main.Are you sure copy??', {item: `${app.translate('routes.Working Hours')} ${workingHour ? workingHour.name : ''}`})}
      </Modal>
    </Col>);

    let form = (<Col
      key="1"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <Form
        workingHourId={workingHour && workingHour.id}
        onCancel={this._onCancel}
        handleSubmit={(workingHour) => this.setState({workingHour, status: 'editing'})}
      />
    </Col>);

    let factorList = (<Col
      key="2"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <FactorsList
        activeItem={factor && factor.id}
        workingHour={workingHour}
        onAdd={() => this.setState({status: 'editing', factor: null}, () => this.setState({factor: {}, status: 'editingFactor'}))}
        onEdit={(factor) => this.setState({factor, status: 'editingFactor'})}
        onClick={(factor) => can('Factor@update') && this.setState({factor, status: 'editingFactor'})}
        onFormCancel={(id) => factor.id === id || fullFactor.id === id && this.setState({status: 'editing', factor: null})}
      />
    </Col>);

    let factorForm = (<Col
      key="3"
      md={8}
      style={{
        height: '100%',
      }}
    >
      <FactorForm
        factor={fullFactor}
        workingHour={workingHour}
        factorId={factor && factor.id}
        onCancel={() => this.setState({status: 'editing', factor: null})}
      />
    </Col>);

    switch (status) {
      case 'adding':
        children.push(form);
        break;
      case 'editing':
        children.push(form, factorList);
        break;
      case 'editingFactor':
        children.push(form, factorList, factorForm);
        break;
      case 'copy':
        children.push(list, copy);
        break;
      default:
        children.push(list);
    }

    return children;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        className="working-hours"
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >

        {this._render}

      </Row>
    );
  }
}
