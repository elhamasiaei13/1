import React from 'react';
import PropTypes from 'prop-types';
import AntTable from 'components/common/Table/';
import MaterialIcon from 'components/common/MaterialIcon';
import ActionMenu from 'components/common/ActionMenu';
import jMoment from 'moment-jalaali';
import moment from 'moment';

@authorize
@autobind
/**
 *
 */
export default class ClockingTable extends React.PureComponent {
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
    onClickDevice: PropTypes.func,
    onSearch: PropTypes.func,
    onLimitCount: PropTypes.func,
    onPagination: PropTypes.func,
    meta: PropTypes.object,
    approveAll: PropTypes.func,
    get: PropTypes.func,
    params: PropTypes.object,
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
    personnel: PropTypes.array,
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
    personnel: [],
    // approveAll: () => {
    // },
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
      rightButton: {
        accept: {
          children: null,
          visible: true,
          disabled: true,
          icon: 'check',
          type: 'default',
          shape: null,
          className: 'btnAccept',
          tooltip: app.translate('routes.home.attendance.clocking.Accept'),
          onClick: undefined,
        },
        waiting: {
          children: null,
          visible: true,
          disabled: true,
          icon: 'alert',
          type: 'default',
          shape: null,
          className: 'btnWaiting',
          tooltip: app.translate('routes.home.attendance.clocking.Waiting'),
          onClick: undefined,
        },
        reject: {
          children: null,
          visible: true,
          disabled: true,
          icon: 'close',
          type: 'default',
          shape: null,
          className: 'btnReject',
          tooltip: app.translate('routes.home.attendance.clocking.Rejected'),
          onClick: undefined,
        },
      },
    };
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
            return items[x].label + '/' + result;
          }
        }
      }
      return undefined;
    } else {
      return result.label;
    }
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _reasonsFilter() {
    let _return = [];

    _return.push({text: app.translate('routes.home.attendance.clocking.Normal travel'), value: 'NormalTravel'});
    _return.push({text: app.translate('routes.home.attendance.clocking.Leave'), value: 'Leave'});
    _return.push({text: app.translate('routes.home.attendance.clocking.Mission'), value: 'Mission'});

    return _return;
  }

  _dataPrint() {
    let _reason;
    const {reasons, dataSource, personnel} = this.props;
    let _dataSource = app._.cloneDeep(dataSource);
    _dataSource.map((data) => {
      if (data.datetime) {
        data['day'] = data.datetime !== '0000-00-00 00:00:00' ? jMoment(data.datetime, 'YYYY-M-D HH:mm:ss').format('dddd') : '-';
        data['time'] = data.datetime !== '0000-00-00 00:00:00' ? jMoment(data.datetime, 'YYYY-M-D HH:mm:ss').format('HH:mm') : '-';
      }
      if (data.typeId) {
        _reason = this.findObject(reasons, {id: data.typeId});
        data.typeId = (_reason !== undefined) ? _reason : 'undefined';
      }
      if (data.deviceId) {
        data.device = '#';
      }
      data.type = app.translate(`routes.home.attendance.clocking.${(data.type === 'clock_in' ? 'In' : data.type === 'clock_out' ? 'Out' : 'Check-in')}`, `${(data.type === 'clock_in' ? 'In' : data.type === 'clock_out' ? 'Out' : 'Check-in')}`);
      data.status = app.translate(`routes.home.attendance.clocking.${data.status}`, `${data.status}`);
      data.personnel = data.user && data.user.profile ? `${data.user.profile.firstName} ${data.user.profile.lastName}` : '';
      data.personnelId = data.user && data.user.profile ? `${data.user.profile.personnelId}` : '';
    });
    return [{body: _dataSource, props: {user: personnel[0]}}];
  }

  onSelect(selectedRows) {
    const {approveAll} = this.props;
    let rightButton = {
      accept: {
        children: null,
        visible: true,
        disabled: (selectedRows.length === 0),
        icon: 'check',
        type: 'default',
        shape: null,
        className: 'btnAccept',
        tooltip: app.translate('routes.home.attendance.clocking.Accept'),
        onClick: () => approveAll(selectedRows, 'accepted'),
      },
      waiting: {
        children: null,
        visible: true,
        disabled: (selectedRows.length === 0),
        icon: 'alert',
        type: 'default',
        shape: null,
        className: 'btnWaiting',
        tooltip: app.translate('routes.home.attendance.clocking.Waiting'),
        onClick: () => approveAll(selectedRows, 'waiting'),
      },
      reject: {
        children: null,
        visible: true,
        disabled: (selectedRows.length === 0),
        icon: 'close',
        type: 'default',
        shape: null,
        className: 'btnReject',
        tooltip: app.translate('routes.home.attendance.clocking.Rejected'),
        onClick: () => approveAll(selectedRows, 'rejected'),
      },
    };
    this.setState({rightButton});
  }

  _help() {
    return [
      {
        content: app.translate('routes.home.attendance.clocking.Clocking Accept'),
        className: 'record-accept',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Clocking Waiting'),
        className: 'record-waiting',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Clocking Rejected'),
        className: 'record-rejected',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Clocking Deleted'),
        className: 'record-deleted',
      },
      {},
      {
        content: app.translate('routes.home.attendance.clocking.Accept'),
        icon: 'check',
        color: 'green',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Waiting'),
        icon: 'alert',
        color: 'orange',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Rejected'),
        icon: 'close',
        color: 'red',
      },
      {},
      {
        content: app.translate('routes.home.attendance.clocking.In'),
        icon: 'arrow-down-thick',
        color: 'green',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Out'),
        icon: 'arrow-up-thick',
        color: 'red',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Check-in'),
        icon: 'swap-vertical',
        color: 'orange',
      },
      {},
      {
        content: app.translate('routes.home.attendance.clocking.Get From Device'),
        icon: 'fingerprint',
        color: '#009900',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Get From Device & Edited'),
        icon: 'fingerprint',
        color: '#990000',
      },
      {
        content: app.translate('routes.home.attendance.clocking.Added By User'),
        icon: 'account',
        color: '#999999',
      },
    ];
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {rightButton} = this.state;
    const {
      dataSource, extraHeaderRight, extraHeaderLeft,
      onTableRowClick, activeItem, menu, onMenuTouch, loading,
      onAdd, onDelete, onEdit, onInfo, get, params, meta, onLimitCount, onPagination,
      onChangeTable, onSelectAllTable, personnel, onSearch,
      onSelectTable, onClickAccepted, onClickDevice, reasons, can,
    } = this.props;
    let i = 0;
    let columns = [
      {
        title: app.translate('routes.home.attendance.clocking.Accepted'),
        key: 'status',
        width: 80,
        filters: [
          {
            text: app.translate('routes.home.attendance.clocking.Accept'),
            value: 'accepted',
          },
          {
            text: app.translate('routes.home.attendance.clocking.Waiting'),
            value: 'waiting',
          },
          {
            text: app.translate('routes.home.attendance.clocking.Rejected'),
            value: 'rejected',
          },
        ],
        render: (text, record) => {
          let icon = text; // (!(record.deletedAt) ? text : '');
          return (
            <ActionMenu
              title={app.translate('routes.home.attendance.clocking.Accepted')}
              menu={
                [
                  {
                    icon: 'check',
                    label: app.translate('routes.home.attendance.clocking.Accept'),
                    value: 'accepted',
                    disabled: (!can('Clocking@approve') || !!record.deletedAt),
                    background: '#ffffff',
                    color: '#559955',
                  },
                  {
                    icon: 'alert',
                    label: app.translate('routes.home.attendance.clocking.Waiting'),
                    value: 'waiting',
                    disabled: (!can('Clocking@approve') || !!record.deletedAt),
                    background: '#ffffff',
                    color: '#ff9955',
                  },
                  {
                    icon: 'close',
                    label: app.translate('routes.home.attendance.clocking.Rejected'),
                    value: 'rejected',
                    disabled: (!can('Clocking@approve') || !!record.deletedAt),
                    background: '#ffffff',
                    color: '#995555',
                  },
                ]
              }
              showActiveLabel={false}
              defaultValue={icon}
              defaultIcon="delete-empty" // "dots-vertical"
              onClickItem={onClickAccepted}
              item={record}
              checkOpen={can('Clocking@approve')}
              valueKey="status"

            />

          )
            ;
        },
      },
    ];
    if (personnel.length !== 1) {
      columns.push(
        {
          title: app.translate('routes.home.attendance.clocking.personnel'),
          key: 'personnel',
          width: 150,
          render: (text, record) => {
            return (
              record.user && record.user.profile ? `${record.user.profile.firstName} ${record.user.profile.lastName}` : ''
            );
          },
        },
        {
          title: app.translate('routes.home.attendance.clocking.personnel_id'),
          key: 'personnelId',
          width: 100,
          render: (text, record) => {
            let str = '';
            if (record.user && record.user.profile) {
              str = record.user.profile.personnelId;
            }
            return str;
          },
        },
      );
    }
    columns.push(...[
      {
        title: app.translate('routes.home.attendance.clocking.Date'),
        key: 'datetime',
        width: 100,
        sort: 'asc',
        render: (text, record) => {
          return record.datetime !== '0000-00-00 00:00:00' ? jMoment(record.datetime, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD') : record.datetime;
        },
        dateTimeFilter: 'datetime', // 'betweenDates',
      },
      {
        title: app.translate('routes.home.attendance.clocking.Day'),
        key: 'day',
        width: 100,
        render: (text, record) => {
          return record.datetime !== '0000-00-00 00:00:00' ? jMoment(record.datetime, 'YYYY-M-D HH:mm:ss').format('dddd') : '-';
        },
      },
      {
        title: app.translate('routes.home.attendance.clocking.Time'),
        key: 'time',
        width: 100,
        render: (text, record) => {
          return record.datetime !== '0000-00-00 00:00:00' ? jMoment(record.datetime, 'YYYY-M-D HH:mm:ss').format('HH:mm') : '-';
        },
      },
      {
        title: app.translate('routes.home.attendance.clocking.ReasonType'),
        key: 'entryType',
        width: 100,
        filters: [
          {
            text: app.translate('routes.home.attendance.clocking.In'),
            value: 'in',
          },
          {
            text: app.translate('routes.home.attendance.clocking.Out'),
            value: 'out',
          },
          {
            text: app.translate('routes.home.attendance.clocking.Check-in'),
            value: 'indeterminate',
          },
        ],
        render: (text, record) => {
          let icon = text === 'in' ? 'arrow-down-thick' : text === 'out' ? 'arrow-up-thick' : 'swap-vertical';
          let color = text === 'in' ? 'green' : text === 'out' ? 'red' : 'orange';
          return (
            <MaterialIcon
              name={icon}
              style={{
                color: color,
                fontSize: '1.25rem',
              }}
            />
          );
        },
      },
      {
        title: app.translate('routes.home.attendance.clocking.Reason'),
        key: 'typeId',
        width: 250,
        filters: this._reasonsFilter(),
        render: (text, record) => {
          let _reason = this.findObject(reasons, {id: record.typeId});
          return (_reason !== undefined) ? _reason : 'undefined';
        },
      },
      {
        title: app.translate('routes.home.attendance.clocking.Device'),
        key: 'device',
        render: (text, record) => {
          let color = (!record.deviceId ? '#999999' : record.createdAt !== record.updatedAt ? '#990000' : '#009900' );
          return (
            <MaterialIcon
              name={!record.deviceId ? `account` : `fingerprint`}
              size="tiny"
              style={{
                color: color,
              }}
              onClick={(e) => record.deviceId && onClickDevice(record.deviceId)}
            />
          );
        },
      },
    ]);

    let _dataPrint = this._dataPrint();
    let _rengFilter = params.filters;
    _rengFilter = _rengFilter.find((item) => item.key === 'betweenDates');
    let properties = {
      date: moment().format('YYYY-MM-DD HH:mm:ss'), // moment().format('YYYY-MM-DD HH:ii:ss'), // '2017-11-04 14:06:04',
    };
    if (_rengFilter) {
      properties = Object.assign({}, properties, {
        range: {
          start: _rengFilter ? _rengFilter.value[0] : '',
          stop: _rengFilter ? _rengFilter.value[1] : '',
        },
      });
    }

    return (
      <AntTable
        // rowCounter={1}
        ref={(input) =>
          this.tbl = input
        }
        rowSelection={true}
        // jsPagination={true}
        pagination={{
          pageSize: 15,
        }}
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
        onSelected={this.onSelect}
        onTableRowClick={(record) => {
          onTableRowClick(record);
        }}
        dataPrint={_dataPrint}
        dataExport={_dataPrint ? _dataPrint[0].body : []}
        properties={properties}
        printTitle={app.translate('routes.home.attendance.clocking.Report Title')}
        havePrint={true}
        haveExport={true}
        haveSetting={true}
        get={get}
        params={params}
        rightButtons={rightButton}
        onSearch={onSearch}
        helpTable={this._help()}
        limit={meta && meta.limit}
        current={meta && meta.currentPage ? ( meta.currentPage + 1 ) : 1}
        totalRow={meta && meta.total}
        onLimitCount={onLimitCount}
        onPagination={onPagination}
      />
    );
  }
}
