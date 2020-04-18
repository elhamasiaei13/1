import React from 'react';
import ListView from 'components/common/ListView';
import PropTypes from 'prop-types';

@autobind
/**
 * Devices List
 */
export default class List extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    reference: PropTypes.func,
    onSearch: PropTypes.func,
    onClick: PropTypes.func,
    menu: PropTypes.func,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    icon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
  };

  static defaultProps = {
    items: [],
    onSearch: () => {},
    extra: undefined,
    loading: true,
    pagination: {},
  };

  /**
   * render devices list
   * @function render
   * @return {XML}
   */
  render() {
    const { items, activeItem, onSearch, onClick, menu, extra, loading, pagination, icon, reference } = this.props;

    return (
      <ListView
        icon={icon}
        title={app.translate('routes.Devices')}
        primaryText={'name'}
        secondaryText={['address', 'description']}
        style={{height: '100%'}}
        items={items}
        activeItem={activeItem}
        onSearch={onSearch}
        onClick={onClick}
        menu={menu}
        extra={extra}
        loading={loading}
        pagination={pagination}
        ref={reference}
      />
    );
  }
}
