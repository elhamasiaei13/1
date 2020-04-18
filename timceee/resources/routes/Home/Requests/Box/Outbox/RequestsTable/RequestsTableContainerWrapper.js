import React from 'react';
import PropTypes from 'prop-types';
import RequestsTableContainer from './RequestsTableContainer';
import {connect} from 'react-redux';
import {getPostedRequests, emptyRequests} from './../Module';
import {Types} from 'routes/General/Types';

@connect((state) => ({
  requests: state.Requests.Box.Outbox.requests,
  meta: state.Requests.Box.Outbox.meta,
}), {
  getPostedRequests,
  emptyRequests,
})
@autobind
/**
 *
 */
export default class RequestsTableContainerWrapper extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    requests: PropTypes.arrayOf(
      PropTypes.object,
    ),
    getPostedRequests: PropTypes.func,
    onAdd: PropTypes.func,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSearch: PropTypes.func,
    onLimitCount: PropTypes.func,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    onChangeTable: PropTypes.func,
    onPagination: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onTableRowClick: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onCancel: PropTypes.func,
    menu: PropTypes.func,
    emptyRequests: PropTypes.func,
    activeItem: PropTypes.number,
    meta: PropTypes.object,
  };

  static defaultProps = {
    requests: {},
    requestTypes: [],
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
      getData: false,
      meta: props.meta ? props.meta : {},
      requestTypes: [],
      params: {
       // includes: ['values'],
        filters: [],
        sort: [{key: 'created_at', direction: 'DESC'}],
        // limit: 10,
        // page: 1,
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
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {

    if (!app._.isEqual(np.meta, this.state.meta)) {
      this.setState({meta: np.meta});
    }
    if (this.state.getData) {
      this.setState({
        loading: false,
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRequests();
  }

  _getData(force = false) {
    const {params} = this.state;
    let _params = this._setParams(params);
    this.setState({
      loading: true,
    }, () => {
      if (force) {
        this.props.emptyRequests();
      }
      if (!this.state.getData || force) {
        this.setState({getData: true});
        this.props.getPostedRequests(_params);
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  _setParams(params) {
    const {meta} = this.state;
    let _params = {};
    for (let x in params) {
      if (x !== 'filters') {
        _params[x] = params[x];
      } else {
        _params.filterGroups = [];
        _params.filterGroups.push({filters: params[x]});
      }
    }
    _params['limit'] = meta && meta.limit ? meta.limit : this._limit;
    _params['page'] = meta && meta.currentPage ? meta.currentPage : this._currentPage;
    //  console.log(_params);
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
      onAdd, onInfo, onEdit, onDelete, onChangeTable,
      onSelectAllTable, onSelectTable, onCancel,
      onTableRowClick, menu, onMenuTouch,
      activeItem, personnel,
      meta,
    } = this.props;
    const {loading, requestTypes, params} = this.state;
    return (
      <RequestsTableContainer
        loading={loading}
        dataSource={dataSource}
        requestTypes={requestTypes}
        menu={menu}
        onMenuTouch={onMenuTouch}
        onTableRowClick={onTableRowClick}
        activeItem={activeItem}
        onAdd={onAdd}
        onDelete={onDelete}
        onEdit={onEdit}
        onInfo={onInfo}
        onChangeTable={onChangeTable}
        onSelectAllTable={onSelectAllTable}
        onSelectTable={onSelectTable}
        onCancel={onCancel}
        params={params}
        get={this._get}
        meta={meta}
        onLimitCount={this._onLimitCount}
        onPagination={this._onPagination}
      />
    );
  }
}
