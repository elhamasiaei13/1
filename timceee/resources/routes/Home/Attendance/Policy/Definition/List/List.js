import React from 'react';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';

@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onSearch: PropTypes.func,
    onClick: PropTypes.func,
    reference: PropTypes.func,
    menu: PropTypes.func,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    loading: PropTypes.bool,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    items: [],
    loading: true,
    pagination: {},
    reference: (input) => {
    },
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      items, activeItem, onSearch, onClick, menu,
      extra, loading, pagination, reference, ...rest
    } = this.props;
    return (
      <ListView
        ref={reference}
        title={app.translate('routes.Policy')}
        items={items}
        primaryText={'name'}
        secondaryText={'description'}
        style={{height: '100%'}}
        activeItem={activeItem}
        onSearch={onSearch}
        onClick={onClick}
        menu={menu}
        extra={extra}
        loading={loading}
        pagination={pagination}
        icon={true}
        {...rest}
      />
    );
  }
}
