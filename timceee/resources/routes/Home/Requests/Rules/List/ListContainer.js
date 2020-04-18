import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import {Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';


@autobind
/**
 *
 * @class ListContainer
 * @extends PureComponent
 */
export default class ListContainer extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    onSearch: PropTypes.func,
    pagination: PropTypes.object,
    reload: PropTypes.func,
    menu: PropTypes.func,
    loading: PropTypes.bool,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {activeItem, loading, onClick, menu, items, onSearch, pagination, reload, ...rest} = this.props;

    return (
      <List
        items={items}
        loading={loading}
        onSearch={onSearch}
        pagination={pagination}
        activeItem={activeItem}
        onClick={onClick}
        menu={menu}
        extra={[
          <Button type="dashed" key="reload" onClick={reload}>
            <MaterialIcon name="reload" spin={loading}/>
          </Button>,
        ]}
        {...rest}
      />
    );
  }
}
