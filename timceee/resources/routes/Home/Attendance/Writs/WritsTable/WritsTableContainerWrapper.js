import React from 'react';
import PropTypes from 'prop-types';
import WritsTableContainer from './WritsTableContainer';
import {connect} from 'react-redux';
import {index, emptyWrits} from './../Module';
import {Types} from 'routes/General/Types';
@connect((state) => ({
  writs: state.Attendance.Writs.writs,
  meta: state.Attendance.Writs.meta,
}), {
  index,
  emptyWrits,
})
@autobind
/**
 *
 */
export default class WritsTableContainerWrapper extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    writs: PropTypes.arrayOf(
      PropTypes.object,
    ),
    index: PropTypes.func,
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
    onClickAccepted: PropTypes.func,
    activeItem: PropTypes.number,
    personnel: PropTypes.array,
    meta: PropTypes.object,
  };

  static defaultProps = {
    writs: [],
    reasons: [],
    columns: [],
    dataSource: [],
    personnel: [],
    meta: {},

    defaultValueDateTimeFilterFrom: [],
    defaultValueDateTimeFilterTo: [],
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
      loading: !props.items,
      meta: props.meta ? props.meta : {},
      params: {
        includes: [],
        filters: [{key: 'user_id', value: props.personnel.pluck('id'), operator: 'in',}],
        sort: [{key: 'registration_datetime', direction: 'DESC'}],
        // limit: 10,
        // page: 1,
      },
      getData: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {items} = this.props;
    this.setState({reasons: Types.items('Writ')});
    if (items === undefined) {
      this._getData();
    }

  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (np.items === undefined) {
      this._getData();
    }

    if (!app._.isEqual(np.meta, this.state.meta)) {
      this.setState({ meta: np.meta });
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

    this.props.emptyWrits();
  }

  _getData(force = false) {
    const {params} = this.state;
    let _params = this._setParams(params);
    if (force) {
      this.props.emptyWrits();
    }
    if (!this.state.getData || force) {
      this.setState({getData: true});
      this.props.index(_params);
    }
  }

  _setParams(params) {
    const { meta } = this.state;
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
    return _params;
  }

  _onLimitCount(limit) {
    let { meta } = this.state;
    meta.limit = parseInt(limit);
    this.setState({ meta }, () => {
      this._getData(true);
    });
  }

  _onPagination(currentPage, limit) {
    let { meta } = this.state;
    meta.limit = parseInt(limit);
    meta.currentPage = parseInt(currentPage) - 1;
    this.setState({ meta }, () => {
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
    const dataSource = this.props.items === undefined ? this.props.writs : this.props.items;
    const {
      onAdd, onInfo, onEdit, onDelete, onChangeTable,
      onSelectAllTable, onSelectTable, onCancel,
      onTableRowClick, menu, onMenuTouch, onClickAccepted,
      activeItem, personnel,
      meta,
    } = this.props;
    const {loading,reasons, params} = this.state;

    return (
      <WritsTableContainer
        loading={loading}
        reasons={reasons}
        dataSource={dataSource}
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
        onClickAccepted={onClickAccepted}
        get={this._get}
        params={params}
        meta={meta}
        onLimitCount={this._onLimitCount}
        onPagination={this._onPagination}
        title={personnel.length === 1 ? `${personnel[0].profile.firstName} ${personnel[0].profile.lastName}` : app.translate('main.Personnel') + personnel.length}
      />
    );
  }
}
