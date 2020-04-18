import React from 'react';
import jMoment from 'moment-jalaali';
// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const INDEX_ATTENDANCE_REPORT_RULES_SUCCESS = 'INDEX_ATTENDANCE_REPORT_RULES_SUCCESS';
const INDEX_ATTENDANCE_REPORT_SUCCESS = 'INDEX_ATTENDANCE_REPORT_SUCCESS';
const GET_ATTENDANCE_REPORT_RULES_SUCCESS = 'GET_ATTENDANCE_REPORT_RULES_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_ATTENDANCE_REPORT_RULES_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _showSuccess(payload) {
  return {
    type: GET_ATTENDANCE_REPORT_RULES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _showReportSuccess(payload) {
  return {
    type: INDEX_ATTENDANCE_REPORT_SUCCESS,
    payload: payload, // payload OR {data: tables}
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Rule@index')) {
      api.get('/rules', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.rules', 'Rule',
            app.translate('routes.home.attendance.report.Indexing Rules Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} [id]
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(id, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Rule@index')) {
      api.get(`/rules/${id}`, {params})
        .then((res) => {
          //  console.log(res);
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.rules', 'Rule',
            app.translate('routes.home.attendance.report.Indexing Rules Failed'),
          );
          callback(err);
        });
    }
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 *
 * @param {Number} [id={}]
 * @param {Object} [data={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showReport(id, data = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Rule@index')) {
      api.post(`ta/reports/${id}/run`, {data})
        .then((res) => {
          dispatch(_showReportSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.rules', 'Rule',
            app.translate('routes.home.attendance.report.Indexing Rules Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyRules() {
  return _indexSuccess({data: {rules: []}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyRule() {
  return _showSuccess({data: {rule: {}}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyReport() {
  return _showReportSuccess({data: {}});
}

/**
 *
 * @param {*} text
 * @param {Object} record
 * @param {String} key
 * @return {*}
 * @private
 */
function _renderCel(text, record, key) {
  //
  // let style = {};
  // if (record._props && record._props.background) {
  //   style = Object.assign({}, style, {background: record._props.background});
  // }

  let item =`${record._props && record._props[key] && record._props[key].before ? record._props[key].before : ''}
  ${text}
  ${record._props && record._props[key] && record._props[key].after ? record._props[key].after : ''}`;
  return {
    children: item,
    props: Object.assign({}, {}, record.props),
  };
}

/**
 *
 * @param {Array} dataTable
 * @return {Array}
 */
function getColumns(dataTable) {
  let columns = [];
  let _column;
  let filter;
  let header = [];

  if (!app._.isEmpty(dataTable)) {
    if (dataTable.header) {
      header = dataTable.header.payload;
      header.sort(function (_a, _b) {
        let a = parseInt(_a.priority ? _a.priority : 1);
        let b = parseInt(_b.priority ? _b.priority : 1);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      app._.map(header, (column) => {
        filter = null;
        if (column.filter) {
          filter = [];
          column.filter.filterable.map((_filter) => {
            filter.push({text: _filter, value: _filter});
          });
        }
        _column = {};
        _column = {
          key: app._.camelCase(column.key),
          title: app.translate(`routes.home.attendance.reports.${column.value}`, `${column.value}`),
          // sorter: column.sortable ? column.sortable : false,
          width: column.props && column.props.width ? column.props.width : 145,
          valuesType: column.valuesType,
          children: column.children,
          colSpan: column.colSpan,
          // filters: filter,
        };

        if (column.valuesType === 'string' || (column.valuesType !== 'date' && column.valuesType !== 'datetime')) {
          _column = Object.assign({}, _column, {
            render: (text, record) => {
              return _renderCel((text ? app.translate(`routes.home.attendance.reports.${text}`, `${text}`) : ''), record, column.key);
            },
          });
        } else {
          if (column.valuesType === 'date') {
            _column = Object.assign({}, _column, {
              render: (text, record) => {
                return _renderCel((text ? jMoment(text, 'YYYY-M-D').format('jYYYY/jMM/jDD') : ''), record, column.key);
              },
            });
          }
          if (column.valuesType === 'datetime') {
            _column = Object.assign({}, _column, {
              render: (text, record) => {
                return _renderCel((text ? jMoment(text, 'YYYY-M-D HH:mm:ss').format('HH:mm:ss jYYYY/jMM/jDD') : ''), record, column.key);
              },
            });
          }
        }

        // if()

        columns.push(_column);
      });
    }
  }
  return columns;
}

/**
 *
 * @param {Array} dataTable
 * @return {Array}
 */
function getProperties(dataTable) {
  if (!app._.isEmpty(dataTable)) {
    return dataTable.props;
  }
  return {};
}

/**
 *
 * @param {Array} dataTable
 * @return {Array}
 */
function getDataReport(dataTable) {
  let data = [];
  let rows;
  let row = {};
  let i = 0;
  if (!app._.isEmpty(dataTable) && !app._.isEmpty(dataTable.payload)) {
    dataTable.payload.map((table) => {
      rows = [];
      table.body.map((_row) => {
        i++;
        row = _row.payload;
        row['props'] = [];
        row.key = i.toString();
        // row.valuesType = column.valuesType,
        row._props = _row.props;
        if (row._props && row._props.className && row._props.className !== '') {
          row.className = row._props.className;
        }
        rows.push(row);
      });
      table.footer.map((_row) => {
        i++;
        row = _row.payload;
        row['props'] = [];
        row.key = i.toString();
        row._props = Object.assign({}, _row.props, {type: 'footer'});
        row.className = 'reportTableFooter';
        rows.push(row);
      });
      data.push({body: rows, props: table.props});
    });
  }
  return data;
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  rules: [],
  rule: {},
  dataReport: [],
  columns: [],
  properties: {},
  meta: {},

}, action) {
  let columns = [];
  let properties = [];
  let dataReport = [];
  switch (action.type) {
    case INDEX_ATTENDANCE_REPORT_RULES_SUCCESS:
      return Object.assign({}, state, {
        rules: action.payload.data.rules,
        meta: action.payload.meta,
      });
    case GET_ATTENDANCE_REPORT_RULES_SUCCESS:
      return Object.assign({}, state, {
        rule: action.payload.rule,
      });
    case INDEX_ATTENDANCE_REPORT_SUCCESS:
      columns = getColumns(action.payload.data);
      properties = getProperties(action.payload.data);
      dataReport = getDataReport(action.payload.data);

      return Object.assign({}, state, {
        dataReport,
        properties,
        columns,
      });
    default:
      return state;
  }
}
