import React from 'react';
import PropTypes from 'prop-types';
import ClockingTableContainer from './ClockingTableContainer';
import {connect} from 'react-redux';
import {index, indexReasons, emptyClockings} from './../Module';
import {Types} from 'routes/General/Types';

@connect((state) => ({
  // reasons: state.Attendance.Clocking.reasons,
  clockings: state.Attendance.Clocking.clockings,
  meta: state.Attendance.Clocking.meta,
}), {
  index,
  // indexReasons,
  emptyClockings,
})
@autobind
/**
 *
 */
export default class ClockingTableContainerWrapper extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    clockings: PropTypes.arrayOf(
      PropTypes.object,
    ),
    reasons: PropTypes.arrayOf(
      PropTypes.object,
    ),
    index: PropTypes.func,
    indexReasons: PropTypes.func,
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
    approveAll: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onCancel: PropTypes.func,
    menu: PropTypes.func,
    onClickAccepted: PropTypes.func,
    onDevice: PropTypes.func,
    activeItem: PropTypes.number,
    personnel: PropTypes.array,
    meta: PropTypes.object,
  };

  static defaultProps = {
    clockings: [],
    reasons: [],
    columns: [],
    dataSource: [],
    personnel: [],
    meta: {},

    defaultValueDateTimeFilter: [],
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);


    this._limit = app.config.pagination.tableLimit;
    this._currentPage = 0;


    let _filter = {};
    let ids = [];
    if (props.personnel && props.personnel[0] && props.personnel[0].id) {
      ids = props.personnel.pluck('id');
    } else {
      ids = props.personnel;
    }
    if (ids[0]) {
      _filter = {key: 'user_id', value: ids, operator: 'in'};
    }
    this.state = {
      loading: !props.items,
      meta: props.meta ? props.meta : {},
      getData: false,
      reasons: [],
      params: {
        includes: ['user.profile'],
        filters: [_filter],
        sort: [{key: 'datetime', direction: 'DESC'}],
        // limit: 10,
        // page: 1,
      },
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {reasons, indexReasons, index, items, personnel} = this.props;
    this.setState({reasons: Types.items('Clocking')});
    // indexReasons({
    //   includes: [
    //     'children',
    //     'children.children',
    //   ],
    //   filterGroups: [{
    //     filters: [{
    //         key: 'clocking_reason_id',
    //         value: null,
    //         operator: 'eq',
    //       },
    //       {
    //         key: 'id',
    //         value: [1, 10, 19],
    //         operator: 'in',
    //       },
    //     ],
    //   }, ],
    // });
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
    this.props.emptyClockings();
  }

  _getData(force = false) {
    const {params} = this.state;
    let _params = this._setParams(params);
    if (force) {
      this.props.emptyClockings();
    }
    if (!this.state.getData || force) {
      this.setState({getData: true}, () => {
        this.props.index(_params);
      });

    }
  }

  _reasonId(item) {
    let items = [];
    if (item) {
      if (item.children && item.children[0]) {
        item.children.map((_item) => {
          if (_item.children && _item.children[0]) {
            items.push(...this._reasonId(_item));
          } else {
            items.push(_item.id);
          }
        });
      } else {
        items.push(item.id);
      }
    }
    return items;
  }

  _reason(name = 'normal') {
    const {reasons} = this.state;
    let _item = reasons.find((item) => item.name === name);
    return this._reasonId(_item);
  }

  _hardFilter(filters) {
    app._.map(filters, (filter) => {
      if (filter.key === 'type_id') {
        let val = [];
        filter.value.map((_value) => {
          switch (_value) {
            case 'NormalTravel':
              val.push(this._reason('normal')); // تردد عادی
              break;
            case 'Leave':
              val.push(...this._reason('leave')); // مرخصی
              break;
            case 'Mission':
              val.push(...this._reason('assignment')); // ماموریت
              break;
            default:
              val.push(_value);
          }
        });
        filter.value = val;
      }
    });
    return filters;
  }

  _setParams(params) {
    const {meta} = this.state;
    let _params = {};
    for (let x in params) {
      if (x !== 'filters') {
        _params[x] = params[x];
      } else {
        params[x] = this._hardFilter(params[x]);

        if (!app._.isEmpty(params[x])) {
          _params.filterGroups = [];
          _params.filterGroups.push({filters: params[x]});
        }

      }
    }

    _params['limit'] = meta && meta.limit ? meta.limit : this._limit;
    _params['page'] = meta && meta.currentPage ? meta.currentPage : this._currentPage;
    return _params;
  }

  _get(params) {
    this.setState({params}, () => {
      this._getData(true);
    });
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

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, params, reasons} = this.state;
    const {
      onAdd,
      onInfo,
      onEdit,
      onDelete,
      onChangeTable,
      onSelectAllTable,
      onSelectTable,
      onCancel,
      approveAll,
      onTableRowClick,
      menu,
      onMenuTouch,
      onClickAccepted,
      activeItem,
      onDevice,
      personnel,
      meta,
    } = this.props;
    const dataSource = this.props.items === undefined ? this.props.clockings : this.props.items;
    // console.log(reasons);
    return (
        <ClockingTableContainer
          params={params}
          get={this._get}
          loading={loading}
          reasons={reasons}
          dataSource={dataSource}
          menu={menu}
          onMenuTouch={onMenuTouch}
          onTableRowClick={onTableRowClick}
          activeItem={activeItem}
          onAdd={personnel.length === 1 && personnel[0].profile ? onAdd : undefined}
          onDelete={onDelete}
          onEdit={onEdit}
          onInfo={onInfo}
          onChangeTable={onChangeTable}
          onSelectAllTable={onSelectAllTable}
          onSelectTable={onSelectTable}
          onCancel={onCancel}
          onClickAccepted={onClickAccepted}
          onDevice={onDevice}
          personnel={personnel}
          // onSearch={console.log}
          approveAll={approveAll}
          meta={meta}
          onLimitCount={this._onLimitCount}
          onPagination={this._onPagination}
          title={personnel.length === 1 && personnel[0].profile ? `${personnel[0].profile.firstName} ${personnel[0].profile.lastName}` : `${personnel.length} ${app.translate('routes.home.attendance.clocking.personnel')} `}
        />
    );
  }
}
