import React from 'react';
import PropTypes from 'prop-types';
import {Button, Row, Col, Input, Menu, Popover, Tooltip} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import TableSearchInput from './TableSearchInput';
import TreeView from '../../TreeView';
import uuidv1 from 'uuid/v1';

@autobind
/**
 *
 */
export default class Header extends React.PureComponent {
  static propTypes = {
    rowSelection: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    selectedRows: PropTypes.array,
    onAdd: PropTypes.func,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSearch: PropTypes.func,
    extraLeft: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
    ]),
    extraRight: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
    ]),
    leftButtons: PropTypes.object,
    rightButtons: PropTypes.object,
    columns: PropTypes.array,
    extraButton: PropTypes.func,
    onSettingChange: PropTypes.func,
    onExport: PropTypes.func,
    onPrint: PropTypes.func,
    helpTable: PropTypes.any,
    haveSetting: PropTypes.bool,
    haveExport: PropTypes.bool,
    haveCustomExport: PropTypes.bool,
    havePrint: PropTypes.bool,
  };

  static defaultProps = {
    extraLeft: null,
    extraRight: null,
    rowSelection: {},
    leftButtons: {},
    rightButtons: {},
    selectedRows: [],
    extraButton: () => {
    },
    onSettingChange: () => {
    },
    haveSetting: false,
    haveExport: false,
    haveCustomExport: false,
    havePrint: false,
    helpTable: undefined,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectedColumn: this._selectedColumn(props.columns),
      render: false,
    };
  }

  _selectedColumn(columns) {
    let selected = [];
    app._.map(columns, (column) => {
      if (column.visible) {
        selected.push(column.key);
      }
    });
    return selected;
  }

  _renderLeftbtn() {
    const {selectedRows, onAdd, rowSelection} = this.props;
    const {leftButtons} = this.props;
    let btn = {
      add: {
        children: app.translate('main.Add'),
        disabled: selectedRows.length === 0 ? false : true,
        icon: 'plus',
        type: 'primary',
        shape: null, // 'circle',
        tooltip: app.translate('main.Add'),
        onClick: () => onAdd([{}], false),
      },
    };
    let leftBtn = [];
    let _btn;
    for (let _return in btn) {
      _btn = Object.assign(btn[_return], leftButtons[_return]);
      onAdd && leftBtn.push(
        <Tooltip
          key={_return}
          title={_btn.tooltip ? _btn.tooltip : undefined}
          placement="bottom"
        >
          <Button
            key={_return}
            disabled={_btn.disabled}
            type={_btn.type}
            shape={_btn.shape}
            onClick={_btn.onClick}
          >
            <MaterialIcon
              name={_btn.icon}
            />
            {_btn.children}
          </Button>
        </Tooltip>,
      );
    }
    return leftBtn;
  }

  _renderSettingTreeData() {
    const {columns} = this.props;
    let treeData = [];
    app._.map(columns, (column) => {
      column.title !== '' && treeData.push({id: column.key, title: column.title, children: []});
    });
    return treeData;
  }

  _onChecked(selected, type = 'checked') {
    let treeData = this._renderSettingTreeData();
    const {onSettingChange} = this.props;
    let {selectedColumn} = this.state;

    if (app._.isEmpty(selectedColumn)) {
      selectedColumn = treeData.pluck('id');
    }
    if (type === 'selected') {
      let index = selectedColumn.indexOf(selected[0]);
      if (index > -1) {
        selectedColumn.splice(index, 1);
      } else {
        selectedColumn.push(selected[0]);
      }
      selected = selectedColumn;
    }
    if (selected.length > 0) {
      this.setState({selectedColumn: selected}, () => onSettingChange({selectedColumns: selected}));
    } else {
      this.setState((prvState) => ({render: !prvState.render}));
      app.message(app.translate('components.common.table.one item should be selected at list'), 'error');
      onSettingChange({selectedColumns: this.state.selectedColumn});
    }
  }

  _print() {
    const {onPrint} = this.props;
    return (
      <Tooltip
        key='printBtn'
        title={app.translate('main.Print')}
        placement="bottom"
      >
        <Button onClick={onPrint}>
          <MaterialIcon name="printer" size="tiny"/>
        </Button>
      </Tooltip>);
  }

  _export() {
    const {onExport, haveCustomExport} = this.props;
    let content = <Menu
      onClick={onExport}
    >
      <Menu.Item key="sql"><MaterialIcon size="tiny" name="file-xml"/>SQL</Menu.Item>
      <Menu.Item key="txt"><MaterialIcon size="tiny" name="file-document"/>Text Document</Menu.Item>
      <Menu.Item key="csv"><MaterialIcon size="tiny" name="file-delimited"/>CSV</Menu.Item>
      <Menu.Item key="json"><MaterialIcon size="tiny" name="json"/>JSON</Menu.Item>
      <Menu.Item key="excel"><MaterialIcon size="tiny" name="file-excel"/>Microsoft Excel</Menu.Item>
      <Menu.Item key="powerpoint"><MaterialIcon size="tiny" name="file-powerpoint"/>Microsoft PowerPoint</Menu.Item>
      <Menu.Item key="doc"><MaterialIcon size="tiny" name="file-word"/>Microsoft Word</Menu.Item>
      {haveCustomExport && <Menu.Divider/>}
      {haveCustomExport && <Menu.Item key="more"><MaterialIcon size="tiny" name="more"/>Option</Menu.Item>}
    </Menu>;
    return (
      <Popover
        placement="bottomRight"
        overlayClassName="action-menu export"
        content={content}
        trigger="click"
      >
        <Tooltip
          key='exportBtn'
          title={app.translate('main.Export')}
          placement="bottom"
        >
          <Button>
            <MaterialIcon name="download" size="tiny"/>
          </Button>
        </Tooltip>
      </Popover>);
  }

  _setting() {
    const {selectedColumn} = this.state;
    let treeData = this._renderSettingTreeData();
    let content = <TreeView
      checkable
      showSearch={false}
      // onSelect={(selected, a, b) => this._onChecked(selected, 'selected')}
      onCheck={(selected) => this._onChecked(selected)}
      treeData={treeData}
      defaultCheckedKeys={!app._.isEmpty(selectedColumn) ? selectedColumn : treeData.pluck('id')}
      checkAllButton={true}
      ref={(input) => this.treeView = input}
      treeStyle={{height: '300px', overflow: 'auto'}}
    />;
    return (
      <Popover placement="bottomRight" content={content} trigger="click">

        <Tooltip
          key='settingsBtn'
          title={app.translate('main.Settings')}
          placement="bottom"
        >
          <Button>
            <MaterialIcon name="settings" size="tiny"/>
          </Button>
        </Tooltip>
      </Popover>);
  }

  _help() {
    const {helpTable} = this.props;
    let _items = [];
    helpTable.map((item) => {
      _items.push(
        <li key={`help-${uuidv1()}`} style={!item.content ? {borderBottom: '1px solid #ccc'} : {}}>
          {item.className && <span className={`helpBoxColor ${item.className}`}/>}
          {item.icon && <MaterialIcon
            name={item.icon}
            size="tiny"
            style={{
              color: item.color ? item.color : '#666',
            }}
          />
          }
          {item.content}
        </li>,
      );
    });
    return (
      <Popover title={app.translate('main.Help')} placement="bottomRight" content={
        <ul className="helpBox">
          {_items}
        </ul>
      } trigger="click">
        <Tooltip
          key='settingsBtn'
          title={app.translate('main.Help')}
          placement="bottom"
        >
          <Button>
            <MaterialIcon name="help-box" size="tiny"/>
          </Button>
        </Tooltip>
      </Popover>);
  }

  _renderRightBtn() {
    const {selectedRows, rightButtons, onInfo, onEdit, onDelete, rowSelection} = this.props;
    let btn = {
      info: {
        children: null,
        visible: onInfo && true,
        disabled: selectedRows.length === 1 ? false : true,
        icon: 'information',
        type: 'default',
        className: 'btnInfo',
        shape: null,
        tooltip: app.translate('main.Info'),
        onClick: () => onInfo(selectedRows),
      },
      edit: {
        children: null,
        visible: onEdit && true,
        disabled: selectedRows.length === 1 ? false : true,
        icon: 'pencil',
        type: 'primary',
        className: 'btnEdit',
        shape: null,
        tooltip: app.translate('main.Edit'),
        onClick: () => onEdit(selectedRows, true),
      },
      trash: {
        children: null,
        visible: onDelete && true,
        disabled: selectedRows.length > 0 ? false : true,
        icon: 'delete',
        type: 'danger',
        className: 'btnDelete',
        shape: null,
        tooltip: app.translate('main.Delete'),
        onClick: () => onDelete(selectedRows),
      },
    };
    let rightBtn = [];
    btn = Object.assign({}, btn, rightButtons);
    if (rowSelection) {
      let _btn;
      for (let _return in btn) {
        _btn = btn[_return];
        rightBtn.push(
          _btn.visible &&
          <Tooltip
            key={_return}
            title={_btn.tooltip ? _btn.tooltip : undefined}
            placement="bottom"
          >
            <Button
              key={_return}
              disabled={_btn.disabled}
              type={_btn.type}
              shape={_btn.shape}
              onClick={_btn.onClick}
              className={_btn.className ? _btn.className : 'btnTools'}
            >
              <MaterialIcon
                name={_btn.icon}
                size="tiny"
              />
              {_btn.children}
            </Button>
          </Tooltip>);
      }
    }
    return rightBtn;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {selectedRows, onSearch, extraLeft, extraRight, extraButton, haveSetting, haveExport, havePrint, helpTable} = this.props;

    return (
      <Row>
        <Col sm={8}
        >
          {
            extraLeft ? extraLeft : ''
          }
          {
            this._renderLeftbtn()
          }
          {
            onSearch ? <TableSearchInput
              onSearch={onSearch}
            /> : ''
          }

        </Col>
        <Col sm={16}
             className="extra-toolbar"
        >
          {extraRight ? extraRight : ''}
          <Button.Group
            style={{padding: '0px 8px 0px 8px'}}
          >
            {extraButton ? extraButton(selectedRows) : ''}
            {
              this._renderRightBtn()
            }
            {
              havePrint && this._print()
            }
            {
              haveExport && this._export()
            }
            {
              haveSetting && this._setting()
            }
            {
              helpTable && this._help()
            }
          </Button.Group>
        </Col>
      </Row>
    );
  }
}
