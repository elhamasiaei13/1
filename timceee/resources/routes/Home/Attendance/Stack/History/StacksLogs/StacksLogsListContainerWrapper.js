import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StacksLogsListContainer from './StacksLogsListContainer';
import {emptyLogs, indexLogs} from './../Module';

@connect((state) => ({
  logs: state.Attendance.Stack.History.logs,
}), {
  indexLogs,
  emptyLogs,
})
@autobind
/**
 *
 */
export default class StacksLogsListContainerWrapper extends React.PureComponent {
  static propTypes = {
    indexLogs: PropTypes.func,
    emptyLogs: PropTypes.func,
    destroy: PropTypes.func,
    logs: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onInfo: PropTypes.func,
    onCancel: PropTypes.func,
    personnel: PropTypes.object,
    stackItem: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    this._onReload();
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyLogs();
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.stackItem, np.stackItem)) {
      this.props.emptyLogs();
      this._onReload(np.stackItem);
    }
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
  }

  /**
   *
   * @private
   */
  _onReload(_stackItem = null) {
    const {indexLogs, personnel, stackItem} = this.props;
    this.setState({loading: true});

    let params = {
      includes: [
        'children',
      ],
      filterGroups: [
        {
          filters: [
            {
              key: 'ForUser',
              value: personnel.id,
              operator: 'eq',
            },
            {
              key: 'rule_id',
              value: _stackItem && _stackItem.id ? _stackItem.id : stackItem.id,
              operator: 'eq',
            },
            {
              key: 'WithChildren',
              value: null,
              operator: 'eq',
            },
          ],
        },
      ],
      sort: [
        {
          key: 'apply_date',
          direction: 'DESC',
        },
        {
          key: 'created_at',
          direction: 'DESC',
        },
      ],
    };
    indexLogs(params, (err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _pagination() {
    return {};
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {logs, activeItem, onClick, onAdd, onEdit, onInfo, onCancel, stackItem} = this.props;

    return (
      <StacksLogsListContainer
        title={app.translate('routes.home.attendance.stack.History Title', {title: stackItem.name})}
        items={logs}
        loading={loading}
        onSearch={this._onSearch}
        onReload={()=> this._onReload()}
        pagination={this._pagination()}
        onInfo={onInfo}
        activeItem={activeItem}
        onClick={onClick}
        onAdd={onAdd}
        onEdit={onEdit}
        onCancel={onCancel}
      />
    );
  }
}
