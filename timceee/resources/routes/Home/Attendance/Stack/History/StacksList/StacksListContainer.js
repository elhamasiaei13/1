import React from 'react';
import {Button} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import StacksList from './StacksList';

@autobind
/**
 *
 */
export default class StacksListContainer extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onSearch: PropTypes.func,
    onClick: PropTypes.func,
    onReload: PropTypes.func,
    onCancel: PropTypes.func,
    onEdit: PropTypes.func,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    personnel: PropTypes.object,
  };

  /**
   *
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  _extra() {
    const {onReload, onCancel, loading} = this.props;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={onReload}
          disabled={loading}
        >
          <MaterialIcon name="reload" size="tiny" spin={loading}/>
        </Button>
        <Button
          onClick={()=>onCancel()}
        >
          {app.translate('main.Cancel')}
        </Button>
      </Button.Group>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {items, activeItem, onSearch, onClick, loading, personnel, pagination, ...rest} = this.props;

    return (
      <StacksList
        extra={this._extra()}
        items={items}
        activeItem={activeItem}
        onSearch={onSearch}
        onClick={onClick}
        loading={loading}
        pagination={pagination}
        personnel={personnel}
        {...rest}
      />
    );
  }
}
