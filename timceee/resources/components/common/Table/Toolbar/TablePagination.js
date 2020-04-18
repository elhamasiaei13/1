import React from 'react';
import PropTypes from 'prop-types';
import {Pagination} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class TablePagination extends React.PureComponent {
  static propTypes = {
    pagination: PropTypes.func,
    totalRow: PropTypes.number,
    limit: PropTypes.number,
    current: PropTypes.number,
  };

  static defaultProps = {
    pagination: () => {
    },
    meta: {},
    totalRow: 10,
    limit: 10,
    current: 1,
  };


  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {current, totalRow, limit, pagination} = this.props;

    return (
      <Pagination
        simple
        defaultCurrent={current ? current : 1}
        current={current ? current : 1}
        total={totalRow ? totalRow : 10}
        pageSize={limit ? limit : 10}
        onChange={pagination}
      />
    );
  }
}
