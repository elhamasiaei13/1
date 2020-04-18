import React from 'react';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';
import {Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
export default class PersonnelSelected extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    getUsers: PropTypes.func,
    reference: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
    items: [],
    reference: () => {},
    onClick: () => {},
    extra: undefined,
  };
  _menu(){
    const {onClick} = this.props;
    return (
      <Button
        shape="circle"
        onClick={onClick}
      >
        <MaterialIcon name="close" />
      </Button>
    );
  }
  /**
   *
   * @return {XML}
   */
  render() {
    const {items, loading, reference, ...rest} = this.props;

    return (
      <ListView
        title={app.translate('routes.home.basic.organization-chart.Personnel Selected')}
        items={items}
        primaryText={['firstName', 'lastName']}
        loading={loading}
        action={this._menu}
        avatar
        ref={(input) => reference(input)}
        {...rest}
      />
    );
  }
}
