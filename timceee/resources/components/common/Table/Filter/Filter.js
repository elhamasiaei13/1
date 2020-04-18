import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Popover} from 'antd';
import FilterBox from './FilterBox';

@autobind
/**
 *
 */
export default class Filter extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    columnKey: PropTypes.string,
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
    filterActive: PropTypes.bool,
    filterMultiple: PropTypes.bool,
  };
  static defaultProps = {
    filterActive: false,
    filterMultiple: true,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      filterIcon: 'filter',
      filterActive: ( props.filterActive),
      visible: false,
    };
  }

  /**
   *
   * @param {Boolean} filterActive
   */
  changeActive(filterActive) {
    this.setState({filterActive});
  }

  /**
   *
   */
  hide() {
    this.setState({
      visible: false,
    });
  }

  /**
   *
   * @param {Boolean} visible
   */
  handleVisibleChange(visible) {
    this.setState({visible});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {filters, filterMultiple, filterOnClick, columnKey, filterKeys} = this.props;
    const {filterIcon, filterActive} = this.state;

    if (!app._.isEmpty(filters)) {
      return (
        <Popover
          content={
            <FilterBox
              columnKey={columnKey}
              filters={filters}
              filterMultiple={filterMultiple}
              filterOnClick={filterOnClick}
              filterHide={this.hide}
              filterKeys={filterKeys}
              changeActive={this.changeActive}
            />
          }
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
          placement="bottom"
          className="filterbox"
        >
          <MaterialIcon
            name={`${filterIcon}`}
            size="tiny"
            style={{
              cursor: 'pointer',
              color: (filterActive ? 'rgb(16, 142, 233)' : 'rgb(99, 99, 99)'),
            }}
          />
        </Popover>
      );
    }
    return null;
  }
}
