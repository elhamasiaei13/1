import React from 'react';
import PropTypes from 'prop-types';
import AntTable from 'components/common/Table/';
import ActionMenu from 'components/common/ActionMenu';
import jMoment from 'moment-jalaali';

@authorize
@autobind
/**
 *
 */
export default class WritsTable extends React.PureComponent {
  static propTypes = {
    header: PropTypes.object,
    footer: PropTypes.object,
    dataSource: PropTypes.arrayOf(
      PropTypes.object,
    ),
    rowSelection: PropTypes.object,
    onTableRowClick: PropTypes.func,
    activeItem: PropTypes.number,
    menu: PropTypes.func,
    can: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onInfo: PropTypes.func,
    onChangeTable: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onClickAccepted: PropTypes.func,
    defaultValueDateTimeFilterFrom: PropTypes.array,
    onClickDateTimeFilterFrom: PropTypes.func,
    defaultValueDateTimeFilterTo: PropTypes.array,
    onClickDateTimeFilterTo: PropTypes.func,
    extraHeaderRight: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.node,
      PropTypes.string,
    ]),
    extraHeaderLeft: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.node,
      PropTypes.string,
    ]),
    loading: PropTypes.bool,

    reasons: PropTypes.arrayOf(
      PropTypes.object,
    ),
    get: PropTypes.func,
    params: PropTypes.object,
    onLimitCount: PropTypes.func,
    onPagination: PropTypes.func,
    meta: PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    columns: [],
    dataSource: [],
    header: {},
    footer: {},
    reasons: [],
    activeItem: undefined,
    onTableRowClick: () => {
    },
    onClickAccepted: () => {
    },
    onClickDevice: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    jMoment.loadPersian({dialect: 'persian-modern'});

    this.state = {
      currentIndex: 0,
      iconAccepted: 'close',
      iconType: 'close',
      iconDevice: 'close',
      filteredInfo: null,
      sortedInfo: null,
      filters: {
        sorter: [
          {
            order: null,
            field: null,
          },
        ],
      },
    };
  }

  /**
   *
   * @param {Object} items
   * @param {Object} key
   * @param {String} label
   * @return {Object|undefined}
   */
  findObject(items, key, label = '') {
    let result = app._.find(items, key);
    let x;
    if (result === undefined) {
      for (x in items) {
        if (!app._.isEmpty(items[x].children)) {
          let result = this.findObject(items[x].children, key, `${label} ${items[x].label}`);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return undefined;
    } else {
      return `${label} ${result.label}`;
    }
  }

  /**
   *
   * @param {Array} array
   * @param {String} parentName
   * @return {Array}
   * @private
   */
  _toString(array, parentName = '') {
    let _return = [];
    array.map((_array) => {
      if (!app._.isEmpty(_array.children)) {
        _return.push(...this._toString(_array.children, `${parentName}${_array.label.toString()} / `));
      } else {
        _return.push({text: `${parentName}${_array.label.toString()}`, value: _array.id.toString()});
      }
    });
    return _return;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      dataSource, extraHeaderRight, extraHeaderLeft, meta, onLimitCount, onPagination,
      onTableRowClick, activeItem, menu, onMenuTouch, loading,
       onAdd, onDelete, onEdit, onInfo, onChangeTable, onSelectAllTable,
      onSelectTable, onClickAccepted, reasons, can, get, params,
    } = this.props;
    const reasonsFilter = this._toString(reasons);
    let i = 0;
    const columns = [
      {
        title: app.translate('routes.home.attendance.writs.Status'),
        key: 'status',
        width: 50,
        render: (text, record) => {
          let icon = (!(record.deletedAt) ? text : '');
          return (
            <ActionMenu
              title={app.translate('routes.home.attendance.writs.Status')}
              menu={
                [
                  {
                    icon: 'check',
                    label: app.translate('routes.home.attendance.writs.Accept'),
                    value: 'accepted',
                    disabled: (!can('Writ@accept') && !!record.deletedAt),
                    color: '#559955',
                  },
                  {
                    icon: 'alert',
                    label: app.translate('routes.home.attendance.writs.Waiting'),
                    value: 'waiting',
                    disabled: (!can('Writ@accept') && !!record.deletedAt),
                    color: '#ff9955',
                  },
                  {
                    icon: 'close',
                    label: app.translate('routes.home.attendance.writs.Rejected'),
                    value: 'rejected',
                    disabled: (!can('Writ@accept') && !!record.deletedAt),
                    color: '#995555',
                  },
                ]
              }
              showActiveLabel={false}
              defaultValue={icon}
              defaultIcon="clock-alert" // "dots-vertical"
              onClickItem={onClickAccepted}
              item={record}
              valueKey="status"

            />
          )
            ;
        },
      },
      {
        title: app.translate('routes.home.attendance.writs.registrationDatetime'),
        key: 'registrationDatetime',
        width: 80,
        sort: 'asc',
        render: (text, record) => {
          return jMoment(record.registrationDatetime, 'YYYY-M-D').format('dddd jYYYY/jMM/jDD');
        },
      },
      {
        title: app.translate('routes.home.attendance.writs.clockingReasonId'),
        key: 'typeId',
        width: 150,
        filters: reasonsFilter,
        render: (text, record) => {
          let _reason = this.findObject(reasons, {id: record.typeId});
          return (_reason !== undefined) ? _reason : 'undefined';
        },
      },
      {
        title: app.translate('routes.home.attendance.writs.key'),
        key: 'key',
        width: 80,
      },
      // {
      //   title:app.translate('routes.home.attendance.writs.dateFrom'),
      //   key: 'dateFrom',
      //   width: 80,
      //   render: (text, record) => {
      //     return jMoment(record.values.dateFrom, 'YYYY-M-D').format('dddd jYYYY/jMM/jDD');
      //   },
      //   dateTimeFilter: 'betweenDatesFrom',
      // },
      // {
      //   title: app.translate('routes.home.attendance.writs.dateTo'),
      //   key: 'dateTo',
      //   width: 80,
      //   render: (text, record) => {
      //     return jMoment(record.values.dateTo, 'YYYY-M-D').format('dddd jYYYY/jMM/jDD');
      //   },
      //   dateTimeFilter: 'betweenDatesTo',
      // },
      {
        title: app.translate('routes.home.attendance.writs.description'),
        key: 'description',
      },
    ];

    return (
      <AntTable
        // rowCounter={1}
        rowSelection={false}
        // jsPagination={true}
        loading={loading}
        columns={columns}
        extraHeaderRight={extraHeaderRight}
        extraHeaderLeft={extraHeaderLeft}
        menu={menu}
        onMenuTouch={onMenuTouch}
        dataSource={dataSource}
        activeItem={activeItem}
        onAdd={onAdd}
        onDelete={onDelete}
        onEdit={onEdit}
        onInfo={onInfo}
        onChangeTable={onChangeTable}
        onSelectAllTable={onSelectAllTable}
        onSelectTable={onSelectTable}
        onTableRowClick={(record) => {
          onTableRowClick(record);
        }}
        get={get}
        params={params}
        limit={meta && meta.limit}
        current={meta && meta.currentPage ? ( meta.currentPage +1 ) : 1}
        totalRow={meta && meta.total}
        onLimitCount={onLimitCount}
        onPagination={onPagination}
      />
    );
  }
}
