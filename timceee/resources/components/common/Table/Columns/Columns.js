import React from 'react';
import PropTypes from 'prop-types';
import ColumnTitle from './../ColumnTitle';
import EditableCell from './../EditableCell';

@autobind
/**
 *
 */
export default class Columns {
  config = {};

  /**
   *
   * @param {object} props
   */
  constructor(props = null) {
    this.config = props;
    return this.render();
  }

  /**
   *
   * @param {string} key
   * @param {string} sort
   * @return {string}
   */
  isSortValue(key, sort) {
    let index = app._.findIndex(this.config.sortKeys, {key: app._.snakeCase(key)});
    if (index >= 0) {
      return this.config.sortKeys[index].direction;
    }
    return '';
  }

  /**
   *
   * @param {string} key
   * @param {string} filters
   * @return {string}
   */
  isFilterValue(key, filters) {
    let index = app._.findIndex(this.config.filterKeys, {key: app._.snakeCase(key)});
    if (index >= 0) {
      return this.config.filterKeys[index].value;
    }
    return [];
  }

  /**
   *
   * @param {string} key
   * @return {boolean}
   */
  isSortKey(key) {
    if (app._.findIndex(this.config.sortKeys, {key: app._.snakeCase(key)}) >= 0) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {string} key
   * @return {boolean}
   */
  isFilterKey(key) {
    if (app._.findIndex(this.config.filterKeys, {key: app._.snakeCase(key)}) >= 0) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {String} columnKey
   * @param {Array} filterKeys
   * @return {Array}
   * @private
   */
  _getColumnFilter(columnKey, filterKeys) {
    if (Array.isArray(filterKeys)) {
      filterKeys.map((filterKey) => {
        if (filterKeys.key === columnKey) {
          return filterKey.value;
        }
      });
    }
    return [];
  }

  isFilterDate(key, dateTimeFilter) {
    if (dateTimeFilter) {
      let index = app._.findIndex(this.config.filterKeys, {key: app._.camelCase(key)});
      if (index >= 0) {
        return this.config.filterKeys[index].value;
      }
      let _index = app._.findIndex(this.config.filterKeys, {key: app._.camelCase(dateTimeFilter)});
      if (_index >= 0) {
        return this.config.filterKeys[_index].value;
      }
      return [];
    }
    return false;
  }

  isFilterSearch(key, searchKey) {
    if (searchKey) {
      let index = app._.findIndex(this.config.filterKeys, {key: app._.camelCase(key)});
      if (index >= 0) {
        return this.config.filterKeys[index].value;
      }
      let _index = app._.findIndex(this.config.filterKeys, {key: app._.camelCase(searchKey)});
      if (_index >= 0) {
        return this.config.filterKeys[_index].value;
      }
      return '';
    }
    return '';
  }

  _render(configColumns) {
    let items = [];
    if (configColumns) {
      configColumns.map((column) => {
        let _key = column.key ? column.key : column.dataIndex;
        let sort = this.isSortValue(_key, column.sort);
        let filters = this.isFilterValue(_key, column.filters);
        let className = this.isSortKey(_key) ? `ant-table-column-sort ${column.className ? column.className : ''}` : `${column.className ? column.className : ''}`;
        let _filter = {};
        if (
          !this.config.selectedColumns ||
          app._.isEmpty(this.config.selectedColumns) ||
          (this.config.selectedColumns && !app._.isEmpty(this.config.selectedColumns) && this.config.selectedColumns.indexOf(_key) > -1 )
        ) {
          let item = {};
          if (this.config.jsSort || this.config.jsFilter) {
            item = {
              title: column.title,
              dataIndex: _key,
              width: column.width ? column.width : 100,
              className: className,
              render: column.render,
            };
            if (this.config.jsSort && column.sorter) {
              item = Object.assign({}, item, {
                sorter: (a, b) => {
                  let _a = 0;
                  let _b = 0;
                  let inputA = a[_key] ? a[_key] : '0';
                  let inputB = b[_key] ? b[_key] : '0';
                  if (parseInt(inputA) !== 'NaN') {
                    //  console.log('inputA', inputA, inputA * 1, parseInt(inputA));
                  }
                  let lengthAB = inputA - inputB;
                  // if (lengthAB !== 0) {
                  return lengthAB;
                  //}
                  for (let i = 0; i < inputA.length; i++) {
                    _a = (_a * 1) + parseInt(inputA[i].charCodeAt(0).toString(2), 2);
                  }
                  for (let i = 0; i < inputB.length; i++) {
                    _b = (_b * 1) + parseInt(inputB[i].charCodeAt(0).toString(2), 2);
                  }
                  return _a - _b;
                },
              });
            }
            if (this.config.jsFilter && column.filters) {
              item = Object.assign({}, item, {
                filters: column.filters,
                onFilter: (value, record) => {
                  //   console.log('value', value, record, _key);
                  return (record[_key] ? record[_key].indexOf(value) === 0 : 0);
                },
              });
            }
          } else {
            item = {
              title: <ColumnTitle
                title={column.title}
                sort={sort ? sort : ''}
                filters={column.filters}
                columnKey={_key}
                sortActive={this.isSortKey(_key)}
                sortOnClick={this.config.onSort}
                filterActive={this.isFilterKey(_key)}
                filterOnClick={this.config.onFilter}
                filterKeys={filters ? filters : []}
                filterMultiple={column.filterMultiple}
                dateTimeFilter={column.dateTimeFilter}
                dateTimeFilterValue={this.isFilterDate(_key, column.dateTimeFilter)}
                onDateTimeFilter={this.config.onDateTimeFilter}
                searchActive={this.isFilterKey(_key)}
                onSearch={this.config.onSearch}
                searchKey={column.searchKey}
                searchValue={this.isFilterSearch(_key, column.searchKey)}
              />,
              dataIndex: _key,
              width: column.width ? column.width : 100,
              className: className,
              render: column.render,
            };
          }
          if (!column.render && column.editable) {
            item = Object.assign({}, item, {
              render: (text, record) => (
                <EditableCell
                  value={text}
                  onChange={this.config.onCellChange(record.key, 'name')}
                />
              ),
            });
          }
          if (column.valuesType) {
            item = Object.assign({}, item, {
              valuesType: column.valuesType,
            });
          }
          if (column.visible) {
            item = Object.assign({}, item, {
              visible: column.visible,
            });
          }
          if (typeof column.colSpan !== 'undefined' ) {
            item = Object.assign({}, item, {colSpan: column.colSpan});
          }
          if (column.children) {
            item = Object.assign({}, item, {children: this._render(column.children)});
          }
          items.push(Object.assign(item, _filter));
        }
      });
    }

    return items;
  }

  /**
   *
   * @return {Array}
   */
  render() {
    return this._render(this.config.columns);
  }
}