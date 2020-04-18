import React from 'react';
import PropTypes from 'prop-types';
import {Table, Modal} from 'antd';
import {Header, Footer} from './Toolbar';
import {Columns} from './Columns';
import JsonExport from './JsonExport';
import ReportPrint from '../ReportPrint';
import CustomReport from './CustomReport';
import moment from 'moment-jalaali';

@autobind
/**
 *
 */
export default class AntTable extends React.PureComponent {
  static propTypes = {
    header: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    footer: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    dataSource: PropTypes.arrayOf(
      PropTypes.object,
    ),
    dataPrint: PropTypes.array,
    dataExport: PropTypes.array,
    columns: PropTypes.arrayOf(
      PropTypes.object,
    ),
    setSort: PropTypes.arrayOf(
      PropTypes.object,
    ),
    setFilter: PropTypes.arrayOf(
      PropTypes.object,
    ),
    getSort: PropTypes.func,
    getFilter: PropTypes.func,
    getMeta: PropTypes.func,
    rowSelection: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    onTableRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    onInfo: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSearch: PropTypes.func,
    activeItem: PropTypes.number,
    className: PropTypes.string,
    extraHeaderLeft: PropTypes.object,
    extraHeaderRight: PropTypes.object,
    totalRow: PropTypes.number,
    limit: PropTypes.number,
    current: PropTypes.number,
    onLimitCount: PropTypes.func,
    onPagination: PropTypes.func,
    onChangeTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onSelected: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    onMenuTouch: PropTypes.func,
    menu: PropTypes.func,
    loading: PropTypes.bool,
    jsPagination: PropTypes.bool,
    jsSort: PropTypes.bool,
    jsFilter: PropTypes.bool,
    haveSetting: PropTypes.bool,
    haveExport: PropTypes.bool,
    haveCustomExport: PropTypes.bool,
    havePrint: PropTypes.bool,
    helpTable: PropTypes.any,
    rowKey: PropTypes.string,
    printTitle: PropTypes.string,
    extraButton: PropTypes.func,
    add: PropTypes.object,
    info: PropTypes.object,
    edit: PropTypes.object,
    delete: PropTypes.object,
    leftButtons: PropTypes.object,
    rightButtons: PropTypes.object,
    properties: PropTypes.object,
    rowCounter: PropTypes.number,
    rowClassName: PropTypes.string,
    get: PropTypes.func,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
  };
  static defaultProps = {
    leftButtons: {},
    rightButtons: {},
    columns: [],
    dataSource: [],
    dataPrint: [],
    dataExport: [],
    activeItem: undefined,
    rowSelection: true,
    pagination: true,
    totalRow: 0,
    limit: 0,
    current: 1,
    rowCounter: 0,
    rowKey: 'id',
    rowClassName: undefined,
    onSort: () => {
    },
    onFilter: () => {
    },
    getSort: () => {
    },
    getFilter: () => {
    },
    getMeta: () => {
    },
    onChangeTable: () => {
    },
    onSelectTable: () => {
    },
    onSelectAllTable: () => {
    },
    menu: () => {
    },
    loading: false,
    onTableRowClick: () => {
    },
    onRowDoubleClick: () => {
    },
    setSort: [],
    setFilter: [],
    extraButton: () => {
    },
    header: true,
    footer: true,
    jsPagination: false,
    jsSort: false,
    jsFilter: false,
    haveSetting: false,
    haveExport: false,
    haveCustomExport: false,
    havePrint: false,
    properties: {},
    helpTable: undefined,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
      params: props.params,
      selectedRowKeys: [],
      selectedRows: [],
      sort: props.setSort,
      filter: props.setFilter,
      meta: {},
      tableChange: {
        current: 0, pageSize: 10,
      },
      selectedColumns: [],
      showCustomReport: false,
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      sort: np.setSort,
      filter: np.setFilter,
      dataSource: np.dataSource,
      tableChange: {
        current: 0, pageSize: 10,
      },
    });
  }

  /**
   *
   * @return {Array}
   */
  selected() {
    return this.state.selectedRows;
  }

  _onCellChange(key, dataIndex) {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({dataSource});
      }
    };
  }

  _setParams(type, key = '', value = '', operator = '') {
    let params = app._.cloneDeep(this.state.params);
    let find = false;
    let index = -1;
    key = app._.snakeCase(key);
    for (let x in params) {
      if (x === type) {
        app._.map(params[x], (param) => {
          index++;
          if (key !== '') {
            if (param && param.key && app._.snakeCase(param.key) === key) {
              find = true;
              if ((!app._.isArray(value) && app._.isEmpty(value) ) || (app._.isArray(value) && (!value[0] || value[0] === '' || value[0] === null))) {
                params[x].splice(index, 1);
              } else {
                if (operator === '') {
                  param.direction = value;
                } else {
                  param.value = value;
                }
              }
            }
          } else {
            if (value !== '') {
              if (param === value) {
                find = true;
              }
            }
          }
        });
        if (!find && ( ( !app._.isArray(value) && value !== '') || (app._.isArray(value) && value[0] && (value[0] !== '' || value[0] !== null) ))) {
          if (key !== '') {
            if (operator !== '') {
              if (operator === 'bt') {
                key = app._.camelCase(key);
              }
              params[x].push({key, value, operator});
            } else {
              params[x].push({key, direction: value});
            }
          } else {
            params[x].push(value);
          }
        }
      }
    }
    if (!app._.isEqual(params, this.state.params)) {
      this.setState({params}, () => {
        this.props.get(params);
      });
    }
  }

  /**
   *
   * @param {String} key
   * @param {String} value
   * @private
   */
  _onSort(key, value) {
    this._setParams('sort', key, value);
  }

  /**
   *
   * @param {string} key
   * @param {object} _filter
   * @private
   */
  _onFilter(key, _filter) {
    this._setParams('filters', key, _filter, 'in');
  }

  /**
   *
   * @param {string} value
   * @private
   */
  _onSearch(value) {
    this.setState({
      loading: true,
    });
    //  this.props.getReceiveRequests();
  }

  /**
   *
   * @param {Number} pageNumber
   * @private
   */
  _pagination(pageNumber) {
    this._setParams('page', '', pageNumber);
  }

  /**
   *
   * @param {Number} count
   * @private
   */
  _limitCount(count) {
    this._setParams('limit', '', count);
  }

  _onClickDateTimeFilter(key, rageDate) {
    this._setParams('filters', key, rageDate, 'bt');

  }

  _onClickSearch(key, value) {
    this._setParams('filters', key, value, 'eq');

  }

  _getRowSelected() {
    let {dataSource, rowKey} = this.props;
    let {selectedRowKeys} = this.state;
    let rowSelected;

    rowSelected = dataSource.filter((data) => {
      return selectedRowKeys.indexOf(data[rowKey]) > -1;
    });

    return rowSelected;
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _columns() {
    const {columns, menu, rowCounter, jsSort, jsFilter} = this.props;
    const {sort, filter, tableChange, params, selectedColumns} = this.state;

    const config = {
      columns: columns,
      sortKeys: params && params.sort ? params.sort : [],
      filterKeys: params && params.filters ? params.filters : [],
      onSort: this._onSort,
      onFilter: this._onFilter,
      onDateTimeFilter: this._onClickDateTimeFilter,
      onSearch: this._onClickSearch,
      jsSort: jsSort,
      jsFilter: jsFilter,
      selectedColumns: selectedColumns,
      onCellChange: this._onCellChange,
    };
    let __columns = new Columns(config);
    let _columns = [];
    if (rowCounter > 0) {
      let i = tableChange.current > 0 ? ((tableChange.current - 1) * tableChange.pageSize) + rowCounter : tableChange.pageSize + rowCounter;
      i = i - tableChange.pageSize;

      _columns.push({
        title: '',
        dataIndex: '_counter',
        key: '_counter',
        width: 50,
        render: (text, record) => <div style={{textAlign: 'center'}}>{i++}</div>,
      });
    }
    _columns.push(...__columns);
    if (menu) {
      _columns.push({
        title: '',
        dataIndex: '_more',
        key: '_more',
        width: 50,
        render: (text, record) => menu([record]),
      });
    }
    return _columns;
  }

  _onSettingChange(params = {}) {
    this.setState({selectedColumns: params.selectedColumns});
  }

  /**
   *
   * @return {Number}
   * @private
   */
  _xWidth() {
    const {columns} = this.props;
    const {selectedColumns} = this.state;
    let width = 100;
    if (app._.isEmpty(selectedColumns)) {
      app._.map(columns, (column) => {
        width += column.width ? parseInt(column.width) : 135;
      });
    } else {
      app._.map(selectedColumns, (column) => {
        width += column.width ? parseInt(column.width) : 135;
      });
    }

    return width;
  }

  exportReportDate(value) {
    const {dataExport, columns} = this.props;
    const {selectedColumns} = this.state;
    // console.log(dataSource, columns);
    // let table = ReactDom.findDOMNode(this.refs.table);
    // let table = $('.ant-table-body').html();
    // $(table).tableExport({type: 'excel', escape: 'true', consoleLog: 'true'});
    // console.log(selectedColumns);
    let exporter = new JsonExport(dataExport, columns, selectedColumns);

    exporter.exportAs(value, 'export');
  }

  _onExport(item) {
    if (item.key === 'more') {
      this.setState({showCustomReport: true});
    } else {
      this.exportReportDate(item.key);
    }
  }

  _onCustomReport(props) {
    const {dataExport, columns} = this.props;
    const {selectedColumns} = this.state;
    let exporter = new JsonExport(dataExport, columns, selectedColumns, props.data, {
      separator: props.config.separator,
      type: props.config.type,
      showTitle: props.config.showTitle,
      showFooter: props.config.showFooter,
      ignoreColumn: ['_more'],
      escape: 'false',
    });

    exporter.customExportAs(props.config.type, 'export');
  }

  _onCancelCustomReport() {
    this.setState({showCustomReport: false});
  }

  _opPrint(e) {
    const {selectedColumns} = this.state;
    let {dataPrint, printTitle, columns, properties} = this.props;
    //console.log('', this.props);
    let options = {};
    let tmpOptions = {};
    let header = {};

    app._.map(columns, (column) => {
      if (selectedColumns.indexOf(column.key) > -1 || app._.isEmpty(selectedColumns)) {
        header[column.key] = {title: column.title, type: column.valuesType};
      }
    });
    options.tables = [];
    options.footer = [];

    options.header = {
      pageTitle: 'پرینت ' + printTitle,
    };

    dataPrint.map((table, index) => {
      tmpOptions.tableLeader = {
        personName: table.props.user && table.props.user.profile ? table.props.user.profile.firstName : '',
        personFamily: table.props.user && table.props.user.profile ? table.props.user.profile.lastName : '',
        personCode: table.props.user && table.props.user.profile ? table.props.user.profile.personnelId : '',
        tableTitle: printTitle ? printTitle : 'گزارش ...',
        reportDate: properties && properties.date ? moment(properties.date).format('jDD-jMM-jYYYY') : moment(moment().format('YYYY/M/D')).format('jDD-jMM-jYYYY'),
        dateFrom: properties && properties.range ? moment(properties.range.start).format('jDD-jMM-jYYYY') : '',
        dateTo: properties && properties.range ? moment(properties.range.stop).format('jDD-jMM-jYYYY') : '',
        recruitmentType: table.props.recruitmentType ? table.props.recruitmentType : '-',
        pageNumber: index + 1,
      };
      tmpOptions.tableHeader = header;
      tmpOptions.tableBody = table.body;
      tmpOptions.tableFooter = {
        signers: properties && properties.signers ? properties.signers : [],
      };
      tmpOptions.setting = {
        rejectedCols: properties && properties.rejectedCols ? properties.rejectedCols : [],
      };
      options.tables.push(tmpOptions);
      tmpOptions = [];
    });

    options.footer = [];
    let rp = new ReportPrint(options);
    rp.print();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {selectedRows, selectedRowKeys, dataSource, showCustomReport} = this.state;
    const {
      loading, rowSelection, columns, haveExport, haveSetting, havePrint, helpTable,
      onPagination, header, footer, jsPagination, dataExport,
      onTableRowClick, activeItem, rowKey, pagination,
      className, extraHeaderLeft, extraHeaderRight, extraButton,
      onInfo, onAdd, onEdit, onDelete, onSearch, onSelected,
      totalRow, limit, current, onLimitCount, haveCustomExport,
      onChangeTable, onSelectTable, onSelectAllTable,
      leftButtons, rightButtons, onRowDoubleClick, rowClassName,
    } = this.props;

    const _rowSelection = (rowSelection ? {
      selectedRows, selectedRowKeys,
      getCheckboxProps: (record) => {
        if (record.rowSelectionDisabled) {
          let index = selectedRows.findIndex((item) => {
            return item[rowKey] === record[rowKey];
          });
          if (index > -1) {

            selectedRows.splice(index, 1);
            index = selectedRowKeys.findIndex((item) => {
              return item === record[rowKey];
            });
            if (index > -1) {
              selectedRowKeys.splice(index, 1);
            }
            onChangeTable(selectedRowKeys, selectedRows);
          }
        }

        return {
          disabled: record.rowSelectionDisabled ? record.rowSelectionDisabled : false,
          defaultChecked: record.rowSelectionDisabled ? !record.rowSelectionDisabled : null,
        };
      },
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('onChange:', selectedRows);
        this.setState({selectedRows, selectedRowKeys});
        onChangeTable(selectedRowKeys, selectedRows);
        onSelected(selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        //  console.log('onSelect:', record, selected, selectedRows);
        this.setState({selectedRows});
        onSelectTable(record, selected, selectedRows);
        onSelected(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        //   console.log('onSelectAll:', selected, selectedRows, changeRows);
        this.setState({selectedRows});
        onSelectAllTable(selected, selectedRows, changeRows);
        onSelected(selectedRows);
      },
    } : undefined);

    const _columns = this._columns();
    const xWidth = this._xWidth();

    return (
      <div
        id="jtbl"
        style={{
          height: '100%',
        }}>
        <Table
          onRowDoubleClick={onRowDoubleClick}
          onChange={(paging, filter, sort) => {
            this.setState({tableChange: paging});
          }}
          rowKey={rowKey}
          rowSelection={_rowSelection}
          columns={_columns}
          dataSource={dataSource}
          pagination={jsPagination && pagination}
          loading={loading}
          title={() =>
            (
              header === true ||
              haveSetting === true ||
              helpTable !== undefined ||
              (haveExport === true && !app._.isEmpty(dataExport) ) ||
              havePrint === true ||
              !app._.isEmpty(rightButtons) ||
              !app._.isEmpty(leftButtons) ||
              !app._.isEmpty(extraHeaderRight) ||
              !app._.isEmpty(extraHeaderLeft) ||
              !app._.isEmpty(extraButton)
            ) ? <Header
              leftButtons={leftButtons}
              rightButtons={rightButtons}
              selectedRows={this._getRowSelected()}
              rowSelection={rowSelection}
              extraRight={extraHeaderRight}
              extraLeft={extraHeaderLeft}
              extraButton={extraButton}
              onInfo={onInfo}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              onSearch={onSearch}
              haveSetting={haveSetting}
              helpTable={helpTable}
              haveExport={(haveExport && !app._.isEmpty(dataExport) )}
              haveCustomExport={haveCustomExport}
              onExport={this._onExport}
              havePrint={havePrint}
              onPrint={this._opPrint}
              columns={columns}
              onSettingChange={this._onSettingChange}
            /> : !header && header
          }
          footer={() =>
            ((footer === true ) ? !jsPagination && <Footer
              selectedRows={this._getRowSelected()}
              rowSelection={rowSelection}
              onInfo={onInfo}
              onEdit={onEdit}
              onDelete={onDelete}
              totalRow={totalRow}
              limit={limit}
              current={current}
              pagination={onPagination}
              limitCount={onLimitCount}
            /> : !jsPagination && footer)
          }
          rowClassName={(item) => activeItem && item.id === activeItem ? `${rowClassName} ant-table-row-hover ${item.className}` : item.className ? `${rowClassName} ${item.className}` : `${rowClassName}`}
          scroll={{x: xWidth, y: '100%'}}
          className={
            className ? className :
              `ant-jtable
              ${jsPagination ? 'ant-jtable-jsPagination' : ''}
              ${!jsPagination && footer ? 'ant-jtable-footer' : ''}
              ${!(jsPagination && pagination) && jsPagination ? 'ant-jtable-not-footer' : ''}
              ${(
                header === true ||
                haveSetting === true ||
                helpTable !== undefined ||
                (haveExport === true && !app._.isEmpty(dataExport) ) ||
                havePrint === true ||
                !app._.isEmpty(rightButtons) ||
                !app._.isEmpty(leftButtons) ||
                !app._.isEmpty(extraHeaderRight) ||
                !app._.isEmpty(extraHeaderLeft) ||
                !app._.isEmpty(extraButton)
              ) ? 'haveHeader' : ''}
          ctabel${dataSource.length}`
          }
          onRowClick={(record) => {
            onTableRowClick(record);
          }}
        />
        {
          haveExport && showCustomReport && haveCustomExport &&
          <CustomReport
            items={_columns}
            visible={showCustomReport}
            onCancel={this._onCancelCustomReport}
            onExport={this._onCustomReport}
          />
        }
      </div>);
  }
}
