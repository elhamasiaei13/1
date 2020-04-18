import React from 'react';
import {Button, Card, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import Info from './Info';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class InfoContainer extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onChangeSearchInput: PropTypes.func,
    onPressEnter: PropTypes.func,
    onSearch: PropTypes.func,
    onTreeCheck: PropTypes.func,
    onTreeSelect: PropTypes.func,
    item: PropTypes.object,
    permissions: PropTypes.arrayOf(
      PropTypes.object,
    ),
    defaultCheckedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    editOnToush: PropTypes.func,
    deleteOnToush: PropTypes.func,
    cancelOnTouch: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    item: {},
    permissions: [],
    defaultSelectedKeys: [],
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
    const {
      title,
      permissions,
      onChangeSearchInput,
      onPressEnter,
      onSearch,
      onTreeCheck,
      onTreeSelect,
      item,
      cancelOnTouch,
      editOnToush,
      deleteOnToush,
      defaultCheckedKeys,
    } = this.props;
    return (
      <Card
        title={<span>
          <MaterialIcon size="tiny" name="format-color-fill" style={{fontSize: '24px', float: 'right', color: item.color ? item.color : '#ccc'}}/>
          {app.translate('routes.home.basic.roles.Info Role', {title: item.displayName})}
        </span>
        }
        style={{
          height: '100%',
        }}
        extra={
          <Button.Group>
            <Button
              type="default"
              onClick={() => cancelOnTouch()}
            >
              {app.translate('main.Cancel')}
            </Button>
            <Button
              type="primary"
              onClick={editOnToush}
            >
              {app.translate('main.Edit')}
            </Button>

            <Button
              type="danger"
              onClick={deleteOnToush}
            >{app.translate('main.Delete')}</Button>
          </Button.Group>
        }>
        <Info
          title={title}
          permissions={permissions}
          onChangeSearchInput={onChangeSearchInput}
          onPressEnter={onPressEnter}
          onSearch={onSearch}
          onCheck={onTreeCheck}
          onSelect={onTreeSelect}
          item={item}
          defaultCheckedKeys={defaultCheckedKeys}
        />
      </Card>
    );
  }
}
