import React from 'react';
import PropTypes from 'prop-types';
import AntTable from 'components/common/Table/';
import jMoment from 'moment-jalaali';


@autobind
/**
 *
 */
export default class RequestsTable extends React.PureComponent {
  static propTypes = {
    header: PropTypes.object,
    footer: PropTypes.object,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    dataSource: PropTypes.arrayOf(
      PropTypes.object,
    ),
    requestTypes: PropTypes.arrayOf(
      PropTypes.object,
    ),
    rowSelection: PropTypes.object,
    onTableRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    activeItem: PropTypes.number,
    menu: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onInfo: PropTypes.func,
    onChangeTable: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onClickAccepted: PropTypes.func,
    get: PropTypes.func,
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
    params: {},
    activeItem: undefined,
    onTableRowClick: () => {
    },
    onRowDoubleClick: () => {
    },
    onClickAccepted: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

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
   * @param {Array} array
   * @param {String} label
   * @return {Array}
   * @private
   */
  _toString(array, label = '') {
    let _return = [];
    array.map((_array) => {
      if (_array && _array.children && _array.children[0]) {
        _return.push(...this._toString(_array.children, `${label} ${_array.label}`));
      } else {
        _return.push({text: `${label} ${_array.label.toString()}`, value: _array.id.toString()});
      }
    });
    return _return;
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
   * @return {XML}
   */
  render() {
    const {
      dataSource, extraHeaderRight, extraHeaderLeft, requestTypes,
      onTableRowClick, activeItem, menu, onMenuTouch, loading,
      onAdd, onDelete, onEdit, onInfo, meta, onLimitCount, onPagination,
      onChangeTable, onSelectAllTable, params, get, onRowDoubleClick,
      onSelectTable,
    } = this.props;

    const columns = [
      {
        title: app.translate('routes.home.requests.Key'),
        key: 'key',
        width: 80,
      },
      {
        title: app.translate('routes.home.requests.Sender'),
        key: 'sender',
        width: 200,
        searchKey: 'sender',
        render: (text, record) => {
          let _return = '';
          _return += record && record.senderPosition && record.senderPosition.name ? record.senderPosition.name : '';
          _return += record &&
          record.senderUser &&
          record.senderUser.profile ?
            ` (${record.senderUser.profile.firstName} ${record.senderUser.profile.lastName})` : '';
          return _return;
        },
      },
      {
        title: app.translate('routes.home.requests.Type'),
        key: 'typeId',
        width: 150,
        filters: this._toString(requestTypes),
        render: (text, record) => {
          if (!record) {
            return 'undefined';
          }
          let _requestType = this.findObject(requestTypes, {id: record.typeId});
          return (_requestType !== undefined) ? _requestType : 'undefined';
        },
        // filterMultiple: false,
        // sort: 'asc',
      },
      {
        title: app.translate('routes.home.requests.Status'),
        key: 'status',
        width: 100,
        filters: [
          {
            text: app.translate('routes.home.requests.Waiting'),
            value: 'waiting',
          },
          {
            text: app.translate('routes.home.requests.Rejected'),
            value: 'rejected',
          },
          {
            text: app.translate('routes.home.requests.Accepted'),
            value: 'accepted',
          },
        ],
        render: (text, record) => (<span className={`request-${text}`}>{app.translate(`routes.home.requests.${text}`)}</span>),
      },
      {
        title: app.translate('routes.home.requests.CreatedAt'),
        key: 'createdAt',
        width: 100,
        render: (text, record) => text && <span dir="ltr">{jMoment(text, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')}</span>,
        sort: 'asc',
        dateTimeFilter: 'betweenDates',
      },
      {
        title: app.translate('routes.home.requests.Detail'),
        key: 'Detail',
        width: 150,
        render: (text, record) => {
          let _return = '';
          let i = 0;
          if (record.values) {
            let keys = Object.keys(record.values);
            keys.map((item) => {
              if (item) {
                if (item === 'date' || item === 'dateFrom' || item === 'dateTo') {
                  if (i > 0) {
                    _return += ` - `;
                  }
                  i++;
                  _return += `${jMoment(record.values[item], 'YYYY-M-D').format('dddd jYYYY/jMM/jDD')}`;
                }
              }
            });
          }
          return _return;
        },
        dateTimeFilter: 'range',
      },
    ];

    return (
      <AntTable
        loading={loading}
        pagination={{
          pageSize: 15,
        }}
        columns={columns}
        extraHeaderRight={extraHeaderRight}
        extraHeaderLeft={extraHeaderLeft}
        menu={menu}
        onMenuTouch={onMenuTouch}
        dataSource={dataSource}
        activeItem={activeItem}
        onInfo={() => this.props.get(this.table)} // onInfo}
        onChangeTable={onChangeTable}
        onSelectAllTable={onSelectAllTable}
        onSelectTable={onSelectTable}
        onRowDoubleClick={onRowDoubleClick}
        onTableRowClick={(record) => {
          onTableRowClick(record);
        }}
        header={null}
        rowSelection={false}
        // jsPagination={true}

        get={get}
        params={params}
        limit={meta && meta.limit}
        current={meta && meta.currentPage ? ( meta.currentPage + 1 ) : 1}
        totalRow={meta && meta.total}
        onLimitCount={onLimitCount}
        onPagination={onPagination}
        rowClassName='history'
      />);
  }
}
