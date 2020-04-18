import React from 'react';
import PropTypes from 'prop-types';
import AntTable from 'components/common/Table/';
import jMoment from 'moment-jalaali';

@autobind
/**
 *
 */
export default class StatusTable extends React.PureComponent {
  static propTypes = {
    header: PropTypes.object,
    footer: PropTypes.object,
    dataSource: PropTypes.arrayOf(
      PropTypes.object,
    ),
    requestTypes: PropTypes.arrayOf(
      PropTypes.object,
    ),
    rowSelection: PropTypes.object,
    onTableRowClick: PropTypes.func,
    activeItem: PropTypes.number,
    menu: PropTypes.func,
    onInfo: PropTypes.func,
    onChangeTable: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onClickAccepted: PropTypes.func,
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
    extraButton: PropTypes.func,
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
    activeItem: undefined,
    extraButton: () => {
    },
    onTableRowClick: () => {
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
   * @return {Object|undefined}
   */
  findObject(items, key) {
    let result = app._.find(items, key);
    let x;
    if (result === undefined) {
      for (x in items) {
        if (!app._.isEmpty(items[x].children)) {
          let result = this.findObject(items[x].children, key);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return undefined;
    } else {
      return result;
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      dataSource, extraHeaderRight, extraHeaderLeft, requestTypes,
      onTableRowClick, activeItem, menu, loading, onInfo, get, params,
      onChangeTable, onSelectAllTable,
      onSelectTable, extraButton, meta, onLimitCount, onPagination,
    } = this.props;

    const columns = [
      {
        title: app.translate('routes.home.requests.Sender'),
        key: 'sender',
        width: 250,
        render: (sender, record) => {
          return (record.senderUser && record.senderUser.profile &&
            <div>{`${record.senderUser.profile.firstName} ${record.senderUser.profile.lastName} (${record.senderPosition.name})`}</div>);
        },
      },
      {
        title: app.translate('routes.home.requests.CreatedAt'),
        key: 'createdAt',
        width: 150,
        render: (text, record) => <span dir="ltr">{jMoment(text, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')}</span>,
        sort: 'asc',
        dateTimeFilter: 'betweenDates',
      },
      {
        title: app.translate('routes.home.requests.Type'),
        key: 'typeId',
        width: 150,
        filters: this._toString(requestTypes),
        render: (text, record) => {
          let _requestType = this.findObject(requestTypes, {id: record.typeId});
          return (_requestType !== undefined) && _requestType ? _requestType.label : 'undefined';
        },
        // filterMultiple: false,
        // sort: 'asc',
      },
      {
        title: app.translate('routes.home.requests.Description'),
        key: 'description',
      },
    ];

    return (
      <AntTable
        loading={loading}
        columns={columns}
        extraHeaderRight={extraHeaderRight}
        extraHeaderLeft={extraHeaderLeft}
        menu={menu}
        dataSource={dataSource}
        activeItem={activeItem}
        onInfo={onInfo}
        onChangeTable={onChangeTable}
        onSelectAllTable={onSelectAllTable}
        onSelectTable={onSelectTable}
        extraButton={extraButton}
        onTableRowClick={(record) => {
          onTableRowClick(record);
        }}
        pagination={{
          pageSize: 15,
        }}
        // rowCounter={1}
        rowSelection={false}
        // jsPagination={true}
        get={get}
        params={params}
        limit={meta && meta.limit}
        current={meta && meta.currentPage ? ( meta.currentPage + 1 ) : 1}
        totalRow={meta && meta.total}
        onLimitCount={onLimitCount}
        onPagination={onPagination}
        header={null}
      />);
  }
}
