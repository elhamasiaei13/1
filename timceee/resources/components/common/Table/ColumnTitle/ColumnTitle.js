import React from 'react';
import PropTypes from 'prop-types';
import Sort from '../Sort';
import {Filter} from '../Filter';
import {Search} from '../Search';
import {DateTimeFilter} from '../Filter/common';

@autobind
/**
 *
 */
export default class ColumnTitle extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    columnKey: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    dateTimeFilter: PropTypes.string,
    dateTimeFilterValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
    ]),
    sort: PropTypes.string,
    sortOnClick: PropTypes.func,
    sortActive: PropTypes.bool,
    filters: PropTypes.arrayOf(
      PropTypes.object,
    ),
    filterKeys: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.string,
      ),
      PropTypes.string,
    ]),
    filterOnClick: PropTypes.func,
    onDateTimeFilter: PropTypes.func,
    searchKey: PropTypes.string,
    searchValue: PropTypes.string,
    onSearch: PropTypes.func,
    searchActive: PropTypes.bool,
    filterActive: PropTypes.bool,
    filterMultiple: PropTypes.bool,
  };
  static defaultProps = {
    sortActive: false,
    filterActive: false,
    searchActive: false,
    filterMultiple: true,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      sortActive: ( props.sortActive),
      filterActive: ( props.filterActive),
      searchActive: ( props.searchActive),
    };
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      sortActive: ( np.sortActive ),
      filterActive: ( np.filterActive),
      searchActive: ( np.searchActive),
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {style, title, children, sort, filters, columnKey, sortOnClick, filterOnClick, filterMultiple, filterKeys, dateTimeFilter, onDateTimeFilter, dateTimeFilterValue, searchValue, onSearch, searchKey} = this.props;
    const {filterActive, searchActive, sortActive} = this.state;

    return (
      <span
        style={style}
      >
        {title}
        {children}
        <span
          style={{
            margin: '0px 5px',
          }}
        >
          {
            dateTimeFilter &&
            <DateTimeFilter
              columnKey={columnKey}
              defaultValue={dateTimeFilterValue}
              defaultKey={dateTimeFilter}
              onClick={onDateTimeFilter}
            />
          }
          <Sort
            sortActive={sortActive}
            title={title}
            sort={sort}
            sortOnClick={sortOnClick}
            columnKey={columnKey}
          />
          <Filter
            filterActive={filterActive}
            title={title}
            filters={filters}
            filterOnClick={filterOnClick}
            columnKey={columnKey}
            filterMultiple={filterMultiple}
            filterKeys={filterKeys}
          />
          {
            searchKey &&
            <Search
              columnKey={columnKey}
              defaultKey={searchKey}
              defaultValue={searchValue}
              searchActive={searchActive}
              onSearch={onSearch}
            />
          }
        </span>

      </span>
    );
  }
}
