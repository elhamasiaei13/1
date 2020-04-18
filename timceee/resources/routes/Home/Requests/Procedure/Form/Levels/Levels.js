import React from 'react';
import { Card, Button, Row, Col, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import Approvers from './Approvers';

@autobind
/**
 *
 */
export default class Levels extends React.PureComponent {
  static propTypes = {
    deletable: PropTypes.bool,
    active: PropTypes.bool,
    levels: PropTypes.array,
  };

  static defaultProps = {
    deletable: true,
    active: true,
    levels: [],
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      levels: props.levels,
      actives: [],
    };
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.levels, np.levels)) {
      let levels = np.levels;

      levels.sort((a, b) => a.priority > b.priority);

      this.setState({ levels });
    }
  }

  /**
   *
   * @return {Number[]}
   */
  levels() {
    const { levels } = this.state;
    let _levels = [];

    levels.map((level, index) => {
      let approvers = this[`level${index}`].selected();

      if (approvers.length === 0) {
        return;
      }

      _levels.push({
        ...level,
        id: level.id > 0 ? level.id : undefined,
        approvers,
      });
    });

    return _levels;
  }

  /**
   *
   * @param {Number} value
   * @return {Number}
   * @private
   */
  _newPriority(value = 10) {
    const { levels } = this.state;

    if (levels.findIndex((level) => level.priority === value) > -1) {
      value = this._newPriority(value + 10);
    }

    return value;
  }

  /**
   *
   * @param {Number} index
   * @param {String|Number} value
   * @private
   */
  _onLevelPriorityChange(index, value) {
    let levels = app._.clone(this.state.levels);

    levels[index].priority = value * 1;

    levels.sort((a, b) => a.priority > b.priority);

    this.setState({
      levels,
    });
  }

  /**
   *
   * @param {Number} index
   * @private
   */
  _onLevelStatusChange(index) {
    let levels = app._.clone(this.state.levels);

    levels[index].active = levels[index].active === 0 ? 1 : 0;

    this.setState({
      levels,
    });
  }

  /**
   *
   * @private
   */
  _onAdd() {
    let levels = app._.clone(this.state.levels);
    let priority = this._newPriority();

    levels.push({
      id: -1 * Math.random(),
      priority,
      approvers: [],
    });

    levels.sort((a, b) => a.priority > b.priority);

    this.setState({
      levels,
    });
  }

  /**
   *
   * @param {Number} index
   * @private
   */
  _onDelete(index) {
    let levels = app._.clone(this.state.levels);

    if (index > -1) {
      levels.splice(index, 1);

      this.setState({
        levels,
      });
    }
  }

  /**
   *
   * @return {Node[]}
   * @private
   */
  get _levels() {
    const { active, deletable } = this.props;
    let levels = app._.clone(this.state.levels);
    let _levels = [];

    levels.map((level, index) => _levels.push(
      <Col
        className="grid-item"
        key={level.id}
        xs={24}
        md={12}
        lg={8}
        style={{
          marginTop: 24,
        }}
      >
        <Approvers
          ref={(input) => this[`level${index}`] = input && input.getWrappedInstance()}
          index={index}
          approvers={level.approvers}
          priority={level.priority}
          procedureActive={active}
          active={!!level.active}
          deletable={deletable}
          onPriorityChange={this._onLevelPriorityChange}
          onLevelStatusChange={this._onLevelStatusChange}
          onDelete={this._onDelete}
        />
      </Col>,
    ));

    if (_levels.length === 0) {
      _levels.push(
        <div
          key={0}
          style={{
            marginTop: 24,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {app.translate('main.No data')}
        </div>,
      );
    }

    return _levels;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { deletable } = this.props;

    return (
      <Card
        title={app.translate('routes.home.requests.procedure.Approvers')}
        extra={
          deletable &&
          <Button
            type="primary"
            icon="plus"
            onClick={this._onAdd}
          >
            {app.translate('main.Add')}
          </Button>
        }
      >
        <Row
          className="grid"
          gutter={16}
          style={{
            marginTop: -24,
            height: '100%',
          }}
        >
          {this._levels}
        </Row>
      </Card>
    );
  }
}
