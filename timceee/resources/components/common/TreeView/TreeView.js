/* eslint-disable react/display-name */
import React from 'react';
import {Tree, Input, Checkbox} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

@autobind
/**
 * ListView component with tree viw capability
 */
export default class TreeView extends React.PureComponent {
  static propTypes = {
    title: PropTypes.any,
    treeData: PropTypes.arrayOf(
      PropTypes.object,
    ),
    checkable: PropTypes.bool,
    multiple: PropTypes.bool,
    visible: PropTypes.bool,
    defaultExpandAll: PropTypes.bool,
    defaultExpandedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    expandedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    autoExpandParent: PropTypes.bool,
    defaultCheckedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    checkedKeys: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.string,
      ),
      PropTypes.shape({
        checked: PropTypes.arrayOf(
          PropTypes.string,
        ),
        halfChecked: PropTypes.arrayOf(
          PropTypes.string,
        ),
      }),
    ]),
    checkStrictly: PropTypes.bool,
    defaultSelectedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    selectedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onSelect: PropTypes.func,
    filterTreeNode: PropTypes.func,
    loadData: PropTypes.func,
    onRightClick: PropTypes.func,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrop: PropTypes.func,
    showLine: PropTypes.bool,
    checkAllButton: PropTypes.bool,
    showIcon: PropTypes.bool,
    showSearch: PropTypes.bool,
    disableAll: PropTypes.bool,
    showCheckIcon: PropTypes.array,
    onSearch: PropTypes.func,
    onPressEnter: PropTypes.func,
    onChangeSearchInput: PropTypes.func,
    titleKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    nodeKey: PropTypes.string,
    childrenKey: PropTypes.string,
    renderItem: PropTypes.func,
    jsSearch: PropTypes.bool,
    className: PropTypes.string,
    treeStyle: PropTypes.object,
  };

  static defaultProps = {
    title: '',
    checkable: false,
    checkAllButton: false,
    multiple: false,
    defaultExpandAll: false,
    defaultExpandedKeys: [],
    expandedKeys: [],
    autoExpandParent: true,
    defaultCheckedKeys: [],
    checkedKeys: [],
    checkStrictly: false,
    defaultSelectedKeys: [],
    draggable: false,
    showLine: false,
    showIcon: false,
    showSearch: true,
    disableAll: false,
    showCheckIcon: [],
    titleKeys: ['title'],
    nodeKey: 'id',
    childrenKey: 'children',
    className: 'antTree',
    treeStyle: {},
    // onExpand: () => {
    // },
    onCheck: () => {
    },
    // onSelect: () => {
    // },
    // filterTreeNode: () => {
    // },
    // loadData: () => {
    // },
    // onRightClick: () => {
    // },
    // onDragStart: () => {
    // },
    // onDragEnter: () => {
    // },
    // onDragOver: () => {
    // },
    // onDragLeave: () => {
    // },
    // onDragEnd: () => {
    // },
    // onDrop: () => {
    // },
    // onSearch: () => {
    // },
    // onPressEnter: () => {
    // },
    // onChangeSearchInput: () => {
    // },
    renderItem: (text, record) => text,
    jsSearch: false,
    visible: true,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    let _treeData = this._treeData(props.treeData);
    this.state = {
      expandedKeys: props.expandedKeys,
      render: true,
      allKeys: _treeData,
      autoExpandParent: true,
      treeData: props.treeData,
      findItems: [],
      defaultCheckedKeys: props.defaultCheckedKeys,
      checkAll: props.defaultCheckedKeys.length === _treeData.length,
      indeterminate: !!props.defaultCheckedKeys.length && (props.defaultCheckedKeys.length < _treeData.length),
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    let _treeData = this._treeData(np.treeData);
    if (!app._.isEqual(np.treeData, this.props.treeData)) {
      this.setState((prevState, props) => ({
        expandedKeys: props.expandedKeys,
        render: !prevState.render,
        allKeys: _treeData,
        treeData: np.treeData,
        defaultCheckedKeys: np.defaultCheckedKeys,
        indeterminate: !!np.defaultCheckedKeys.length && (np.defaultCheckedKeys.length < _treeData.length),
        checkAll: np.defaultCheckedKeys.length === _treeData.length,
      }), () => {
        this.setState((prevState, props) => ({
          render: !prevState.render,
        }));
      });
    } else {
      if (!app._.isEqual(np.visible, this.props.visible)) {
        this.setState((prevState, props) => ({
          render: !prevState.render,
          defaultCheckedKeys: np.defaultCheckedKeys,
          indeterminate: !!np.defaultCheckedKeys.length && (np.defaultCheckedKeys.length < _treeData.length),
          checkAll: np.defaultCheckedKeys.length === _treeData.length,
        }), () => {
          this.setState((prevState, props) => ({
            render: !prevState.render,
          }));
        });
      }
    }
  }

  /**
   *
   * @param {Object} data
   * @return {Array}
   * @private
   */
  _treeData(data) {
    const {nodeKey, childrenKey} = this.props;
    let ids = [];
    app._.map(data, (_data) => {
      if (_data[nodeKey]) {
        ids.push(_data[nodeKey].toString());
        if (!app._.isEmpty(_data[childrenKey])) {
          ids.push(...this._treeData(_data[childrenKey]));
        }
      }
    });
    return ids;
  }

  /**
   *
   * @param {String} value
   * @param {object} list
   * @return {Array}
   * @private
   */
  _find(value, list) {
    const {titleKeys, nodeKey} = this.props;
    const findIndexs = [];
    list.map((item) => {
      for (let i = 0; i < titleKeys.length; i++) {
        let findIndex = item[titleKeys[i]].indexOf(value);
        if (findIndex > -1) {
          findIndexs.push(item[nodeKey].toString());
        }
      }
      if (item.children && !app._.isEmpty(this.renderItem(item.children))) {
        findIndexs.push(...this._find(value, item.children));
      }
    });
    return findIndexs;
  }

  /**
   *
   * @param {object} items
   * @return {{label: XML, value}}
   */
  renderItem(items) {
    const {titleKeys, nodeKey, childrenKey, showCheckIcon} = this.props;
    const _item = [];
    const _findItem = this.state.findItems;

    items.map((item) => {
      let title = '';
      titleKeys.map((titleKey) => {
        title += item[titleKey] + ' ';
      });
      title = title.substring(0, title.length - 1);
      if (item[nodeKey]) {
        _item.push(
          <TreeNode
            disableCheckbox={item.disableCheckbox ? item.disableCheckbox : this.props.disableAll}
            disabled={item.disableCheckbox ? item.disableCheckbox : this.props.disableAll}
            title=
              {( (_findItem.indexOf(item[nodeKey].toString()) > -1 )
                  ? <span style={{color: '#669900'}}>
                {showCheckIcon ? <MaterialIcon name={(showCheckIcon.indexOf(item[nodeKey].toString()) > -1 ? 'check' : 'none')}/> : ''}
                    {this.props.renderItem(title, item)}
                </span>
                  :
                  <span>
                {showCheckIcon ? <MaterialIcon name={(showCheckIcon.indexOf(item[nodeKey].toString()) > -1 ? 'check' : 'none')}/> : ''}
                    {this.props.renderItem(title, item)}
              </span>
              )}
            key={item[nodeKey].toString()}
          >{item[childrenKey] && !app._.isEmpty(item[childrenKey]) && (item['id'] !== 3) ? this.renderItem(item[childrenKey]) : ''}</TreeNode>,
        );
      }
    });

    return _item;
  }


  /**
   *
   * @param {Array} defaultCheckedKeys
   * @private
   */
  _onCheck(defaultCheckedKeys) {
    const {onCheck, treeData} = this.props;
    let _treeData = this._treeData(treeData);
    this.setState({
      defaultCheckedKeys,
      indeterminate: !!defaultCheckedKeys.length && (defaultCheckedKeys.length < _treeData.length),
      checkAll: defaultCheckedKeys.length === _treeData.length,
    });
    if (onCheck) {
      onCheck(defaultCheckedKeys);
    }
  }

  /**
   *
   * @return {Array}
   */
  selected() {
    return this.state.defaultCheckedKeys;
  }

  onCheckAllChange(e) {
    const {allKeys} = this.state;
    const {onCheck} = this.props;
    this.setState((prevState, props) => ({
        render: !prevState.render,
        defaultCheckedKeys: e.target.checked ? allKeys : [],
        indeterminate: false,
        checkAll: e.target.checked,
      }), () => {
        this.setState((prevState, props) => ({
          render: !prevState.render,
        }));
        if (onCheck) {
          onCheck(this.state.defaultCheckedKeys);
        }
      },
    );
  }

  onChange(e) {
    const {onChangeSearchInput, treeData} = this.props;
    const value = e.target.value;

    let find = (value.length > 0 ) ? this._find(value, treeData) : [];
    this.setState({
      findItems: find,
      expandedKeys: find,
      searchValue: value,
      autoExpandParent: true,
    });
    if (onChangeSearchInput) {
      onChangeSearchInput(e);
    }
  }

  onExpand(expandedKeys) {
    const {onExpand} = this.props;
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
    if (onExpand) {
      onExpand(expandedKeys);
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      title,
      checkable,
      checkAllButton,
      multiple,
      defaultExpandAll,
      defaultExpandedKeys,
      checkStrictly,
      defaultSelectedKeys,
      onExpand,
      onSelect,
      filterTreeNode,
      loadData,
      onRightClick,
      draggable,
      onDragStart,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDragEnd,
      onDrop,
      showLine,
      showIcon,
      showSearch,
      onSearch,
      onPressEnter,
      onChangeSearchInput,
      showCheckIcon,
      className,
      treeStyle,
      visible,
    } = this.props;

    const {treeData, allKeys, autoExpandParent, expandedKeys, render, defaultCheckedKeys, indeterminate, checkAll, findItems} = this.state;
    let height = 0;
    height += checkAllButton && 32;
    height += showSearch && 32;

    return (
      <div
        style={{
          height: `calc(100% - ${height}px`,
        }}
      >
        {
          title && visible ?
            <div
              style={{
                lineHeight: '32px',
              }}
            >{title}</div>
            : ''
        }
        {showSearch && visible ?
          <div
            className="jTreeSearch"
          >
            <Search
              style={{width: '100%'}}
              placeholder={app.translate('main.Search')}
              onPressEnter={onPressEnter}
              onSearch={onSearch}
              onChange={this.onChange}
            />
            {!!findItems.length &&
            <span
              className={`find find${findItems.length}`}
            >{app.translate('main.Result')} : {findItems.length}</span>
            }
          </div>
          : ''
        }

        {checkAllButton && visible &&
        <div style={{borderBottom: '1px solid #E9E9E9', padding: '5px'}}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.onCheckAllChange}
            checked={checkAll}
            disabled={this.props.disableAll}
          >
            {app.translate('main.All')} ({allKeys.length} / {defaultCheckedKeys.length})
          </Checkbox>
        </div>
        }

        {render && visible ?
          <div
            style={Object.assign({}, {height: '100%'}, treeStyle)}
          >
            <Tree
              checkable={checkable}
              multiple={multiple}
              defaultExpandAll={defaultExpandAll}
              autoExpandParent={autoExpandParent}
              defaultCheckedKeys={defaultCheckedKeys}
              checkStrictly={checkStrictly}
              defaultSelectedKeys={defaultSelectedKeys}
              onExpand={this.onExpand}
              onCheck={this._onCheck}
              onSelect={onSelect}
              filterTreeNode={filterTreeNode}
              loadData={loadData}
              onRightClick={onRightClick}
              draggable={draggable}
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDragEnd={onDragEnd}
              onDrop={onDrop}
              showLine={showLine}
              showIcon={showIcon}
              defaultExpandedKeys={!app._.isEmpty(findItems) ? findItems : defaultCheckedKeys}
              expandedKeys={expandedKeys}
              className={className}
            >
              {this.renderItem(treeData)}
            </Tree></div> : ''
        }
      </div>
    )
      ;
  }
}
