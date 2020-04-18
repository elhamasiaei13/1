import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col} from 'antd';
import FChartWrapper from './../FChart';

@autobind
/**
 *
 */
export default class Move extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    activeItem: PropTypes.number,
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
  };

  static defaultProps = {
    items: [],
    onCancel: () => {
    },
    onSubmit: () => {
    },
    activeItem: null,
    visible: false,
    confirmLoading: false,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    if (app._.isEmpty(props.items)) {
      props.onCancel();
    }
    this.state = {
      ModalText: 'Content of the modal',
      items: props.items,

      dialogMode: 'add',
      currentActiveItem: 0,
      saveAbility: false,
      hasGroup: false,
      title: '',
      selectedParent: null,
      currentSelectedUser: null,
      parent_id: null,
      applyToChildesFlag: false,
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.state.items, np.items)) {
      this.setState({
        items: np.items,
      });
    }
    if (!np.visible) {
      this.props.onCancel();
    }
  }

  /*
   * as
   * @param np
   * @param ns
   * @return {boolean}
   *
   componentShouldUpdate(np, ns) {
   return false;
   }
   */

  handleOk() {
    this.props.onSubmit(this.state.selectedParent);
  }


  locateCurrentItem() {
    let items = this.state.items;
    let currentItemId = this.props.activeItem;
    let currentItemObject = {};
    items.map((item) => {
      item.id === currentItemId && (currentItemObject = item);
    });
    return currentItemObject;
  }

  locateItemWithId(id) {
    let items = this.state.items;
    let itemToReturn = {};
    items.map((item) => {
      item.id === id && (itemToReturn = item);
    });
    return itemToReturn;
  }

  /**
   *
   * @param {Number} blackId
   * @return {[null]}
   * @private
   */
  _getBlackList(blackId) {
    let blackList = [blackId];
    let items = this.state.items;
    let _list;

    app._.map(items, (item) => {
      if (blackList.indexOf(item.id) < 0) {
        if (blackList.indexOf(item.positionId) > -1) {
          _list = this._getBlackList(item.id);
          if (!app._.isEmpty(_list)) {
            blackList.push(..._list);
          }
        }
      }
    });

    return blackList;
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _items() {
    let _items = [];
    let items = this.state.items;
    let blackList = this._getBlackList(this.props.activeItem);

    app._.map(items, (item) => {
      if (blackList.indexOf(item.id) < 0) {
        if (blackList.indexOf(item.positionId) < 0) {
          _items.push(item);
        }
      }
    });
    return _items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancel, visible, confirmLoading} = this.props;
    const {selectedParent} = this.state;

    return (
      <Modal
        title={app.translate('routes.home.basic.organization-chart.Move Form Title', {
          from: this.locateCurrentItem().name, to: (this.locateItemWithId(selectedParent).name ?
            this.locateItemWithId(selectedParent).name : '......'),
        })}
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
        maskClosable={false}
        className="modal-full"
        footer={[
          <Button
            key="Submit"
            onClick={this.handleOk}
            type="primary"
            loading={confirmLoading}
            disabled={selectedParent !== null ? false : true}>{app.translate('main.Submit')}</Button>,
          <Button
            key="onCancel"
            onClick={onCancel}>{app.translate('main.Cancel')}</Button>,
        ]}
      >
        <FChartWrapper
          items={this._items(this.props.activeItem)}
          onButtonClick={this._onButtonClick}
          onCursorChanged={
            (e, data) => this.setState({selectedParent: data.context.id})
            // console.log
          }
          selectable={false}
          showAllCheckboxes={false}
          hasButtons={false}
          wrappe={false}
        />
      </Modal>
    )
      ;
  }
}
