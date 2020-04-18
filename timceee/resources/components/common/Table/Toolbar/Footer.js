import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Select} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import TablePagination from './TablePagination';
import uuidv1 from 'uuid/v1';

@autobind
/**
 *
 */
export default class Footer extends React.PureComponent {
  static propTypes = {
    pagination: PropTypes.func,
    limitCount: PropTypes.func,
    selectedRows: PropTypes.array,
    totalRow: PropTypes.number,
    limit: PropTypes.number,
    current: PropTypes.number,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    rowSelection: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    pagination: () => {
    },
    limitCount: () => {
    },
    selectedRows: [],
    totalRow: 0,
    limit: 0,
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

  _limits(limits) {
    let _items = [];
    limits.map((item) => {
      _items.push(<Select.Option key={uuidv1()} value={`${item}`}>{item}</Select.Option>);
    });
    return _items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {selectedRows, totalRow, limit, current, limitCount, pagination, rowSelection} = this.props;
    let limits = app.config.pagination.tableLimits ? app.config.pagination.tableLimits : ['10', '20', '30'];
    return (
      <Row>
        {
          rowSelection &&
          <Col sm={4}
          > {app.translate('main.Selected')}:{selectedRows.length}
          </Col>
        }
        <Col sm={3}
        > {app.translate('main.Total')}:{totalRow}
        </Col>
        <Col sm={9}
        >{app.translate('main.PerPage')}:<Select
          defaultValue={`${limit ? limit : limits[0] }`}
          style={{width: 120}}
          onChange={limitCount}
        >
          {this._limits(limits)}
        </Select>
        </Col>
        <Col sm={8}
        >
          <TablePagination
            current={current}
            totalRow={totalRow}
            limit={limit}
            pagination={pagination}
          />
        </Col>
      </Row>
    );
  }
}
