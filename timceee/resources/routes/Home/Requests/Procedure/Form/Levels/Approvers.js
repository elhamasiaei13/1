import React from 'react';
import {connect} from 'react-redux';
import {Card, Button, Modal, Input, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import Chip from 'components/common/Chip';
import MaterialIcon from 'components/common/MaterialIcon';
import Avatar from 'components/common/Avatar';
import Toggle from 'components/common/Toggle';
import FChart from 'routes/Home/Basic/OrganizationChart/FChart';

@connect((state) => ({
  positions: state.Basic.OrganizationChart.positions,
}), {}, null, {withRef: true})
@autobind
/**
 *
 */
export default class Approvers extends React.PureComponent {
  static propTypes = {
    positions: PropTypes.arrayOf(PropTypes.object),
    onPriorityChange: PropTypes.func,
    procedureActive: PropTypes.bool,
    active: PropTypes.bool,
    deletable: PropTypes.bool,
    onDelete: PropTypes.func,
    onLevelStatusChange: PropTypes.func,
    index: PropTypes.number,
    priority: PropTypes.number,
    approvers: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    deletable: true,
    procedureActive: true,
    active: true,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false,
      selected: props.approvers,
      priority: undefined,
    };
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (this.props.priority !== np.priority && this.state.priority) {
      this.setState({priority: undefined});
    }

    if (!app._.isEqual(this.props.approvers, np.approvers)) {
      this.setState({selected: np.approvers});
    }
  }

  /**
   *
   * @return {Number[]}
   */
  selected() {
    return this.state.selected;
  }

  /**
   *
   * @private
   */
  _onAdd() {
    let selected = app._.clone(this.positionsChart.selected());
    selected = selected.map((id) => ({approverId: id, positionName: null}));

    let _selected = app._.clone(this.state.selected);
    if (_selected && _selected.length > 0) {
      let _index = _selected.findIndex((item) => item.positionName === 'manager');

      if (_index > -1) {
        selected.push({approverId: null, positionName: 'manager'});
      }
    }

    this.setState({
      selected,
      showAddForm: false,
    });
  }

  /**
   *
   * @param {Number} id
   * @private
   */
  _onDelete(id) {
    let selected = app._.clone(this.state.selected);
    if (selected && selected.length > 0) {
      let _index = selected.findIndex((item) => item.approverId === id);

      if (_index > -1) {
        selected.splice(_index, 1);

        this.setState({
          selected,
        });
      }
    }
  }

  /**
   *
   * @param {Boolean} flag
   * @private
   */
  _onChangeManager(flag) {
    if (flag) {
      this.setState((state) => ({
        selected: [...state.selected, {approverId: null, positionName: 'manager'}],
      }));
    } else {
      let selected = app._.clone(this.state.selected);
      if (selected && selected.length > 0) {
        let _index = selected.findIndex((item) => item.positionName === 'manager');

        if (_index > -1) {
          selected.splice(_index, 1);

          this.setState({
            selected,
          });
        }
      }
    }
  }

  /**
   * @return {boolean}
   * @private
   */
  _checkManager() {
    let selected = app._.clone(this.state.selected);
    if (selected && selected.length > 0) {
      let _index = selected.findIndex((item) => item.positionName === 'manager');
      if (_index > -1) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param {Number} index
   * @private
   */
  _onStatusChange(index) {
    let selected = app._.clone(this.state.selected);

    selected[index].active = selected[index].active === 0 ? 1 : 0;

    this.setState({
      selected,
    });
  }

  /**
   *
   * @return {Node[]}
   * @private
   */
  get _chips() {
    const {selected} = this.state;
    const {procedureActive, positions, deletable, active} = this.props;
    let _chips = [];

    if (deletable) {
      positions.map((position) => {
        if (selected && selected.length > 0 && selected.findIndex((item) => item.approverId === position.id) > -1) {
          let _chip = (
            <Chip
              key={position.id}
            >
              <Avatar
                src={position.avatar}
                text={position.name.split(' ').map((p) => p[0]).join('‌')}
              />
              {position.name}
              <MaterialIcon
                name="close-circle"
                onClick={() => this._onDelete(position.id)}
              />
            </Chip>
          );

          if (position.user) {
            _chip = (
              <Tooltip key={position.id} title={`${position.user.profile.firstName} ${position.user.profile.lastName}`}>
                {_chip}
              </Tooltip>
            );
          }

          _chips.push(_chip);
        }
      });
    } else {
      positions.map((position) => {
        let _index = -1;
        if (selected && selected.length > 0) {
          _index = selected.findIndex((item) => item.approverId === position.id);
        }

        if (_index > -1) {
          let _active = active && selected[_index].active;

          let _chip = (
            <Chip
              key={position.id}
            >
              <Avatar
                src={position.avatar}
                text={position.name.split(' ').map((p) => p[0]).join('‌')}
              />
              {position.name}
              <MaterialIcon
                name={procedureActive && _active ? 'check' : 'close'}
                disabled={!procedureActive || !active}
                onClick={() => this._onStatusChange(_index)}
                style={{
                  color: procedureActive && _active ? '#009688' : '#F44336',
                }}
              />
            </Chip>
          );

          if (position.user) {
            _chip = (
              <Tooltip key={position.id} title={`${position.user.profile.firstName} ${position.user.profile.lastName}`}>
                {_chip}
              </Tooltip>
            );
          }

          _chips.push(_chip);
        }
      });
    }

    if (_chips.length === 0) {
      _chips.push(
        <div
          key={0}
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          {app.translate('main.No data')}
        </div>,
      );
    }

    return _chips;
  }

  _pluck() {
    const {selected} = this.state;
    let _select = selected.pluck('approverId');
    let _return = [];
    _select.map((item) => {
      if (item !== null) {
        _return.push(item);
      }
    });
    return _return;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {selected, showAddForm} = this.state;
    const {procedureActive, onPriorityChange, deletable, onDelete, index, priority, active, positions, onLevelStatusChange} = this.props;

    return (
      <Card
        title={app.translate('routes.home.requests.procedure.Level', {level: index + 1})}
        extra={
          deletable ?
            <Button.Group>
              <Tooltip title={app.translate('main.Delete')}>
                <Button
                  type="danger"
                  icon="close"
                  onClick={() => onDelete(index)}
                />
              </Tooltip>
              <Button
                type="primary"
                icon="plus"
                onClick={() => this.setState({showAddForm: true})}
              >
                {app.translate('main.Add')}
              </Button>
            </Button.Group>
            :
            <MaterialIcon
              name={procedureActive && active ? 'check' : 'close'}
              disabled={!procedureActive}
              onClick={() => onLevelStatusChange(index)}
              style={{
                color: procedureActive && active ? '#009688' : '#F44336',
                fontSize: '1.5rem',
                // top: '-.5rem',
                position: 'relative',
              }}
            />
        }
      >

        {
          deletable ?
            <Input
              type="number"
              min={1}
              addonBefore={app.translate('routes.home.requests.procedure.Change priority', {priority})}
              addonAfter={
                <div
                  onClick={() => this.state.priority && onPriorityChange(index, this.state.priority)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {app.translate('main.Edit')}
                </div>
              }
              placeholder={app.translate('routes.home.requests.procedure.New Priority')}
              value={this.state.priority}
              onChange={(e) => this.setState({priority: e.target.value})}
              onPressEnter={(e) => e.target.value && onPriorityChange(index, e.target.value)}
              style={{
                width: '100%',
              }}
            />
            :
            <p
              key={0}
              style={{
                width: '100%',
                textAlign: 'center',
              }}
            >
              <b>
                {app.translate('routes.home.requests.procedure.Priority')}: {priority}
              </b>
            </p>

        }

        <div
          style={{
            position: 'relative',
            backgroundColor: '#e9e9e9',
            margin: '16px 0',
            width: '100%',
            height: 1,
          }}
        />
        <Toggle
          label={app.translate('routes.home.requests.procedure.Manager')}
          checked={this._checkManager()}
          onChange={(v) => {
            this._onChangeManager(v);
          }}
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {this._chips}
        </div>

        {
          showAddForm &&
          <Modal
            title={app.translate('routes.Requests')}
            visible={showAddForm}
            onOk={this._onAdd}
            onCancel={() => this.setState({showAddForm: false})}
            width="100%"
            style={{
              height: '100%',
            }}
          >
            <FChart
              ref={(input) => this.positionsChart = input && input.getWrappedInstance()}
              selected={this._pluck()}
              items={positions}
            />
          </Modal>
        }
      </Card>
    );
  }
}
