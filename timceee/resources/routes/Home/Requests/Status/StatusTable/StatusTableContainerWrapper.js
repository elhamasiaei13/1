import React from 'react';
import PropTypes from 'prop-types';
import StatusTableContainer from './StatusTableContainer';
import {connect} from 'react-redux';
import {indexRequestsStatus, emptyRequestsStatus} from './../Module';
import {Types} from 'routes/General/Types';

@connect((state) => ({
  requests: state.Requests.Status.requests,
  meta: state.Requests.Status.meta,
}), {
  indexRequestsStatus,
  emptyRequestsStatus,
})
@autobind
/**
 *
 */
export default class StatusTableContainerWrapper extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    requests: PropTypes.arrayOf(
      PropTypes.object,
    ),
    emptyRequestsStatus: PropTypes.func,
    indexRequestsStatus: PropTypes.func,
    onAccept: PropTypes.func,
    onInfo: PropTypes.func,
    onChangeTable: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onTableRowClick: PropTypes.func,
    onMenuTouch: PropTypes.func,
    menu: PropTypes.func,
    activeItem: PropTypes.number,
    personnel: PropTypes.arrayOf(
      PropTypes.object,
    ),
    meta: PropTypes.object,
  };

  static defaultProps = {
    requests: {},
    columns: [],
    dataSource: [],
    personnel: [],
    meta: {},
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this._limit = app.config.pagination.tableLimit;
    this._currentPage = 0;

    this.state = {
      loading: true,
      requestTypes: [],
      defaultValueDateTimeFilter: [],
      getData: false,
      unprocessed: false,
      sortKey: 'created_at',
      sortValue: 'DESC',
      meta: props.meta ? props.meta : {},
      filters: [
        // {
        //   key: 'status',
        //   value: 'rejected',
        //   operator: 'eq',
        // },
      ],
      params: {
        includes: [
          // 'values',
          // 'values.field',
          'senderUser.profile',
          'senderPosition',
        ],
        filters: [],
        sort: [{key: 'created_at', direction: 'DESC'}],
        limit: 10,
        page: 1,
      },
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {items} = this.props;
    const {requestTypes} = this.state;
    if (app._.isEmpty(requestTypes)) {
      this.setState({requestTypes: Types.items('Request')}, () => {
        if (items === undefined) {
          this._getData();
        }
      });
    } else {
      if (items === undefined) {
        this._getData();
      }
    }
  }

  /**
   * @param {Boolean} unprocessed
   * @private
   */
  _unprocessed(unprocessed) {
    this.setState({unprocessed}, () => {
      this._getData(true);
    });
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.meta, this.state.meta)) {
      this.setState({meta: np.meta});
    }
    // if (this.state.getData) {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  _getData(force = false) {

    const {params} = this.state;
    this.setState({loading: true});
    let _params = this._setParams(params);
    if (force) {
      this.props.emptyRequestsStatus();
    }
    if (!this.state.getData || force) {
      this.setState({getData: true}, () => {
        this.props.indexRequestsStatus(_params, () => {
          this.setState({loading: false});
        });
      });
    }
  }

  _setParams(params) {
    const {meta, unprocessed} = this.state;
    let _params = {};
    for (let x in params) {
      if (x !== 'filters') {
        _params[x] = params[x];
      } else {
        _params.filterGroups = [];
        _params.filterGroups.push({filters: params[x]});
      }
    }
    _params.filterGroups = [];
    _params.filterGroups.push({
      filters: [{
        key: 'done',
        value: unprocessed ? '1' : '0',
        operator: 'eq',
      }],
    });
    _params['limit'] = meta && meta.limit ? meta.limit : this._limit;
    _params['page'] = meta && meta.currentPage ? meta.currentPage : this._currentPage;
    return _params;
  }

  _onLimitCount(limit) {
    let {meta} = this.state;
    meta.limit = parseInt(limit);
    this.setState({meta}, () => {
      this._getData(true);
    });
  }

  _onPagination(currentPage, limit) {
    let {meta} = this.state;
    meta.limit = parseInt(limit);
    meta.currentPage = parseInt(currentPage) - 1;
    this.setState({meta}, () => {
      this._getData(true);
    });
  }

  _get(params) {
    this.setState({loading: true});
    this.setState({params}, () => {
      this._getData(true);
    });
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const dataSource = this.props.requests;
    const {
      onAccept, onInfo, onChangeTable,
      onSelectAllTable, onSelectTable,
      onTableRowClick, menu, onMenuTouch,
      activeItem,
      meta,
    } = this.props;
    const {loading, params, requestTypes, unprocessed} = this.state;
    return (
      <StatusTableContainer
        loading={loading}
        dataSource={dataSource}
        requestTypes={requestTypes}
        menu={menu}
        onMenuTouch={onMenuTouch}
        onTableRowClick={onTableRowClick}
        activeItem={activeItem}
        onInfo={onInfo}
        onAccept={onAccept}
        onChangeTable={onChangeTable}
        onSelectAllTable={onSelectAllTable}
        onSelectTable={onSelectTable}
        title={app.translate('routes.Personnel')}
        get={this._get}
        params={params}
        meta={meta}
        onLimitCount={this._onLimitCount}
        onPagination={this._onPagination}
        onUnprocessed={this._unprocessed}
        unprocessed={unprocessed}
      />
    );
  }
}
