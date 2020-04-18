import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/common/Avatar';
import MaterialIcon from 'components/common/MaterialIcon';
import {Dropdown, Card, Input, Table, Button} from 'antd';
import 'assets/styles/listview.styl';
// import 'react-contexify/dist/ReactContexify.min.css';
// import {ContextMenu, Item, Separator, IconFont, ContextMenuProvider} from 'react-contexify';

@autobind
/**
 *
 */
export default class ListView extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    items: PropTypes.arrayOf(PropTypes.object),
    onSearch: PropTypes.func,
    menu: PropTypes.func,
    action: PropTypes.func,
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
    status: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
    primaryText: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    secondaryText: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    selected: PropTypes.arrayOf(PropTypes.number),
    avatar: PropTypes.oneOfType([
      PropTypes.oneOf([
        'circle', 'square', true, false,
      ]),
      PropTypes.object,
    ]),
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    loading: PropTypes.bool,
    activeItem: PropTypes.number,
    style: PropTypes.object,
    rowKey: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    disabled: PropTypes.func,
    selectedAll: PropTypes.bool,
    searchValue: PropTypes.string,
  };

  static defaultProps = {
    disabled: () => false,
    items: [],
    rowKey: 'id',
    primaryText: 'primaryText',
    secondaryText: 'secondaryText',
    avatar: false,
    icon: false,
    pagination: false,
    loading: false,
    style: {},
    selectedAll: false,
    searchValue: '',
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      searchValue: props.searchValue,
      selected: props.selected,
      selectedRows: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    $('.listview .ant-pagination').prev('.ant-table').height('calc(100% - 100px)');
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.selected, np.selected)) {
      this.setState({
        selected: np.selected,
      });
    }
    if (!app._.isEqual(this.state.searchValue, np.searchValue)) {
      this.setState({
        searchValue: np.searchValue,
      });
    }
  }

  /**
   *
   */
  componentDidUpdate() {
    $('.listview .ant-pagination').prev('.ant-table').height('calc(100% - 100px)');
  }

  /**
   * get selected item's ids
   * @return {Number[]}
   * @deprecated
   */
  getSelected() {
    return this.state.selected;
  }

  /**
   * get selected item's ids
   * @return {Number[]}
   */
  selected() {
    return this.state.selected;
  }

  /**
   * get selected item's ids
   * @return {Number[]}
   */
  selectedRows() {
    return this.state.selectedRows;
  }

  /**
   *
   * @param {String} [searchValue='']
   */
  resetSearch(searchValue = '') {
    this.setState({searchValue});
  }

  /**
   *
   * @param {Object} item
   * @return {String}
   * @private
   */
  _primaryText(item) {
    const {primaryText} = this.props;
    let _text;

    if (app._.isString(primaryText)) {
      _text = item[primaryText];
    } else if (app._.isFunction(primaryText)) {
      _text = primaryText(item);
    } else {
      primaryText.map((text) => {
        if (item[text]) {
          if (_text) {
            _text += (' ' + item[text]);
          } else {
            _text = item[text];
          }
        }
      });
    }

    return _text;
  }

  /**
   *
   * @param {Object} item
   * @return {String}
   * @private
   */
  _secondaryText(item) {
    const {secondaryText} = this.props;
    let _text;

    if (app._.isString(secondaryText)) {
      _text = item[secondaryText];
    } else if (app._.isFunction(secondaryText)) {
      _text = secondaryText(item);
    } else {
      secondaryText.map((text) => {
        if (item[text]) {
          if (_text) {
            _text += (' ' + item[text]);
          } else {
            _text = item[text];
          }
        }
      });
    }

    return _text;
  }

  /**
   *
   * @param {Object} item
   * @return {String}
   * @private
   */
  _renderAvatarSrc(item) {
    const {avatar} = this.props;

    if (app._.isPlainObject(avatar)) {
      return avatar.render(item);
    }

    return item.avatar;
  }

  /**
   *
   * @param {Object} item
   * @return {String}
   * @private
   */
  _renderAvatarText(item) {
    const {primaryText} = this.props;
    let _avatar = '';

    if (app._.isString(primaryText)) {
      _avatar = primaryText;
    } else if (app._.isFunction(primaryText)) {
      _avatar = primaryText(item);
    } else {
      primaryText.map((text) => {
        if (item[text]) {
          _avatar = `${_avatar} ${item[text]}`;
        }
      });
    }

    return _avatar;
  }

  /**
   *
   * @param {{icon: ?(String|Node)}} item
   * @return {Node}
   * @private
   */
  _renderIcon(item) {
    const {icon} = this.props;
    let _icon;

    if (icon) {
      if (app._.isFunction(icon)) {
        _icon = icon(item);
      } else if (app._.isString(item.icon)) {
        _icon = <MaterialIcon name={item.icon}/>;
      } else {
        _icon = item.icon;
      }
    }

    return _icon;
  }

  /**
   *
   * @param {{icon: ?(String|Node)}} item
   * @return {Node}
   * @private
   */
  _renderStatus(item) {
    const {status} = this.props;
    let _status;

    if (status) {
      if (app._.isFunction(status)) {
        _status = status(item);
      } else if (app._.isString(item.status)) {
        _status = <MaterialIcon name={item.status}/>;
      } else {
        _status = item.status;
      }
    }

    return _status;
  }

  /**
   *
   * @private
   * @return {Object[]}
   */
  get _columns() {
    const {selected} = this.state;
    const {menu, action, avatar, icon, status, selectedAll} = this.props;
    let _columns = [{
      key: 'item',
      title: (
        <div>
          <div
            className="left"
            style={{
              lineHeight: '28px',
            }}
          >
            {app.translate('main.Select Page')}
          </div>
          {
            selected && selectedAll &&
            <Button
              className="right"
              type={selected.indexOf(0) === 0 ? 'primary' : 'ghost'}
              onClick={(event) => this.setState({selected: selected.indexOf(0) === -1 ? [0] : []})}
            >
              {app.translate('main.Select All')}
            </Button>
          }
        </div>
      ),
      render: (item) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {
            avatar ?
              <Avatar
                src={this._renderAvatarSrc(item)}
                text={this._renderAvatarText(item)}
                shape={app._.isString(avatar) ? avatar : 'circle'}
              />
              :
              icon &&
              <div className="icon">
                {this._renderIcon(item)}
              </div>
          }
          {
            status &&
            <div className="status">
              {this._renderStatus(item)}
            </div>
          }
          <div>
            <div>
              {this._primaryText(item)}
            </div>
            <div style={{color: 'rgba(0,0,0,.5)'}}>
              {this._secondaryText(item)}
            </div>
          </div>
        </div>
      ),
    }];

    if (menu) {
      _columns.push({
        key: 'action',
        width: 24,
        render: (item) => {
          let _overlay = menu(item);

          if (_overlay) {
            return (
              <Dropdown
                overlay={_overlay}
                trigger={['click']}
                onClick={(e) => e.stopPropagation()}
              >
                <a className="ant-dropdown-link">
                  <MaterialIcon
                    name="dots-vertical"
                    style={{
                      width: 24,
                      height: 24,
                      fontSize: 24,
                    }}
                  />
                </a>
              </Dropdown>
            );
          }
        },
      });
    } else if (action) {
      _columns.push({
        key: 'action',
        width: 24,
        render: (item) => (
          <div
            onClick={(e) => e.stopPropagation()}
          >
            {action(item)}
          </div>
        ),
      });
    }

    return _columns;
  }

  /**
   *
   * @private
   * @return {{onChange: Function, selectedRowKeys: Array}}
   */
  _getRowSelection() {
    const {selected} = this.state;
    const {disabled} = this.props;

    return {
      selectedRowKeys: selected,
      onChange: (selectedRowKeys, selectedRows) => this.setState({
        selected: selectedRowKeys.filter((key) => key !== 0),
        selectedRows: selectedRows,
      }),
      getCheckboxProps: (record) => ({
        disabled: disabled(record),
      }),
    };
  }

  /**
   *
   * @return {String}
   */
  get _title() {
    const {selected} = this.state;
    const {title, pagination} = this.props;

    if (selected) {
      const length = selected.length;

      if (length > 0) {
        if (selected.indexOf(0) === 0) {
          return [title, ' ', <small key={2}>{`(${pagination.total} ${app.translate('main.Selected')})`}</small>];
        }

        return [title, ' ', <small key={2}>{`(${length} ${app.translate('main.Selected')})`}</small>];
      }
    }

    return title;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {searchValue} = this.state;
    const {extra, items, onSearch, activeItem, selected, pagination, onClick, disabled, loading, style, rowKey} = this.props;

    return (
      <Card
        title={this._title}
        extra={extra}
        className="listview"
        style={style}
      >
        {
          onSearch &&
          <Input.Search
            placeholder={app.translate('main.Search')}
            value={searchValue}
            onChange={(event) => this.setState({searchValue: event.target.value})}
            onSearch={onSearch}
            style={{
              margin: 8,
              width: 'calc(100% - 16px)',
            }}
          />
        }

        <Table
          size="middle"
          rowKey={rowKey}
          showHeader={!!selected}
          // pagination={pagination}
          pagination={pagination && Object.assign({}, {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: app.config.pagination.limits,
          }, pagination)}
          onRowClick={(record) => {
            if (onClick && !disabled(record)) {
              onClick(record);
            }
          }}
          rowSelection={selected ? this._getRowSelection() : undefined}
          columns={this._columns}
          rowClassName={(item) => item.id === activeItem ? 'ant-table-row-hover' : undefined}
          dataSource={items}
          loading={loading}
          style={{
            margin: 8,
          }}
        />
      </Card>
    );
  }
}
