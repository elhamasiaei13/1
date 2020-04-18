import React from 'react';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';

@autobind
/**
 * This Component only understands Personnel
 */
export default class List extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    onSearch: PropTypes.func,
    menu: PropTypes.func,
    getUsers: PropTypes.func,
    reference: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    height: PropTypes.string,
    activeItem: PropTypes.number,
  };

  static defaultProps = {
    loading: true,
    items: [],
    onSearch: () => {},
    reference: () => {},
    onClick: () => {},
    extra: undefined,
    activeItem: undefined,
    height: '100%',
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const { items, onSearch, onClick, menu, extra, loading, height, activeItem, reference, ...rest } = this.props;

    return (
      <ListView
        title={app.translate('routes.home.Personnel')}
        items={items}
        primaryText={(item) => `${item.profile.firstName} ${item.profile.lastName}`}
        secondaryText={(item) => `${app.translate('routes.home.basic.personnel.Personnel Code')}: ${item.profile.personnelId}`}
        loading={loading}
        onSearch={onSearch}
        onClick={onClick}
        menu={menu}
        extra={extra}
        avatar={{
          render: (item) => (item.profile ? item.profile.avatar : ''),
        }}
        style={{height: height}}
        activeItem={activeItem}
        pagination={{}}
        ref={reference}
        {...rest}
      />
    );
  }
}
