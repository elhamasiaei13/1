import React from 'react';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';

@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    style: PropTypes.object,
    onClick: PropTypes.func,
    onSearch: PropTypes.func,
    menu: PropTypes.func,
    extra: PropTypes.node,
    activeItem: PropTypes.number,
    reference: PropTypes.func,
  };

  static defaultProps = {
    users: [],
    style: {},
    onClick: () => {},
    reference: () => {},
  };

  /**
   *
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: (!this._users && props.users.length === 0) || this._users.length === 0,
    };
  }

  /**
   *
   * @param {Function} [callback=(function())]
   * @private
   */
  _load(callback = () => {}) {
    this.setState({ loading: true }, () => callback());
  }

  /**
   *
   * @private
   */
  _loaded() {
    this.setState({ loading: false });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { reference, style, users, onClick, onSearch, menu, extra, activeItem, pagination, ...rest } = this.props;

    return (
      <ListView
        title={app.translate('components.classes.user.Personnel')}
        primaryText={(item) => `${item.profile.firstName} ${item.profile.lastName}`}
        secondaryText={(item) => `${app.translate('components.classes.user.PersonnelId')}: ${item.profile.personnelId}`}
        avatar={{render: (item) => (item.profile ? item.profile.avatar : '')}}
        {...rest}
        items={this._users || users}
        onClick={this._onClick || onClick}
        onSearch={this._onSearch || onSearch}
        loading={loading}
        menu={this._menu || menu}
        extra={this._extra || extra}
        activeItem={this._activeItem || activeItem}
        pagination={this._pagination || pagination}
        ref={(input) => {
          this._list = input;
          reference && reference(input);
        }}
        style={Object.assign({}, {height: '100%'}, this._style || {}, style)}
      />
    );
  }
}
