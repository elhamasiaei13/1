import React from 'react';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';


@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    menu: PropTypes.func,
    loading: PropTypes.bool,
    onItemClick: PropTypes.func,
    onSearch: PropTypes.func,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    activeItem: PropTypes.number,
  };

  static defaultProps = {
    loading: true,
    title: '',
    extra: undefined,
    activeItem: null,
    rolesList: [],
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {title, activeItem, extra, items, menu, onItemClick, onSearch, pagination, loading} = this.props;

    return (
      <ListView
        activeItem={activeItem}
        title={title}
        extra={extra}
        items={items}
        loading={loading}
        primaryText="displayName"
        secondaryText="description"
        menu={menu}
        onClick={onItemClick}
        style={{height: '100%'}}
        onSearch={onSearch}
        pagination={pagination}
        icon={(item) => <MaterialIcon name="format-color-fill" style={{color: item.color ? item.color : '#ccc'}}/>}
      />
    );
  }
}
