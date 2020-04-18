import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Modal} from 'antd';
import {moveNode, store, update, destroyWithChild, destroy} from './Module';
import PropTypes from 'prop-types';
import FChartWrapper from './FChart';
import Delete from './Forms/Delete';
import Edit from './Forms/Edit';
import Move from './Forms/Move';
// import PrimitiveCharts from 'components/common/PrimitiveCharts/PrimitiveCharts';

@authorize
@connect((state) => ({
  positions: state.Basic.OrganizationChart.positions,
}), {
  moveNode,
  store,
  update,
  destroy,
  destroyWithChild,
})
@autobind
/**
 *
 */
export default class OrganizationChart extends React.Component {
  static propTypes = {
    can: PropTypes.func,
    moveNode: PropTypes.func,
    store: PropTypes.func,
    update: PropTypes.func,
    destroy: PropTypes.func,
    destroyWithChild: PropTypes.func,
    positions: PropTypes.array,
  };

  static defaultProps = {
    moveNode: () => {
    },
    getPositionChart: () => {
    },
    positions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      action: null,
      activeItem: null,
      items: props.positions,
      parentId: null,
      visible: false,
      confirmLoading: false,
      confirmLoadingDestroy: false,
      confirmLoadingDestroyWithChild: false,
    };
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.positions, np.positions)) {
      this.setState({items: np.positions});
    }
  }


  /**
   *
   * @param {Object} nextProps
   * @param {Object} nextState
   * @return {boolean}
   */

  shouldComponentUpdate(nextProps, nextState) {
    if (!app._.isEqual(this.props, nextProps)) {
      return true;
    }

    if (!app._.isEqual(this.state, nextState)) {
      return true;
    }

    return false;
  }

  /**
   *
   * @param {element} e
   * @param {object} chart
   * @private
   */
  _onButtonClick(e, chart) {
    let {items} = this.state;
    //  console.log('iii', this, items, chart.context.parent);
    items = items.pluck('id');
    let index = items.indexOf(chart.context.parent); // !chart.context.parent && !chart.context.parent
    if (index < 0 && (chart.name === 'delete' || chart.name === 'move')) {
      app.message(app.translate('routes.home.basic.organization-chart.Removing/Moving This Position Failed'), 'error');
    } else {
      this.setState({action: chart.name, activeItem: chart.context, visible: true});
    }
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _buttons() {
    const {can} = this.props;
    let buttons = [];

    if (can('Position@store')) {
      buttons.push(new primitives.orgdiagram.ButtonConfig('add', 'ui-icon-person', app.translate('main.Add')));
    }

    if (can('Position@destroy')) {
      buttons.push(new primitives.orgdiagram.ButtonConfig('delete', 'ui-icon-close', app.translate('main.Delete')));
    }

    if (can('Position@update')) {
      buttons.push(new primitives.orgdiagram.ButtonConfig('edit', 'ui-icon-pencil', app.translate('main.Edit')));
      buttons.push(new primitives.orgdiagram.ButtonConfig('move', 'ui-icon-arrow-4', app.translate('main.Move')));
    }

    return buttons;
  }

  _onCancel(err = undefined, result = null, action = null) {
    if (!err) {
      if (result && result.data && !app._.isEmpty(result.data)) {
        this.setState({visible: true, confirmLoading: false, confirmLoadingDestroyWithChild: false, confirmLoadingDestroy: false});
        this.setState({activeItem: null, action: null});
      } else {
        this.setState({
          // items: [],
          activeItem: null,
          visible: false,
          action: null,
          confirmLoading: false,
          confirmLoadingDestroyWithChild: false,
          confirmLoadingDestroy: false,
        });
      }
    } else {
      this.setState({visible: true, confirmLoading: false, confirmLoadingDestroyWithChild: false, confirmLoadingDestroy: false});
    }
  }

  onMoveOk(err) {
    if (!err) {
      let {items, activeItem, parentId} = this.state;
      this.setState({visible: false, activeItem: null, parentId: null, confirmLoading: false});
      app.message('Success');
      this._onCancel();
    } else {
      this.setState({visible: true, parentId: null, confirmLoading: false});
      app.message('Error', 'error');
    }
  }

  onMoveSubmit(parentId) {
    let {activeItem} = this.state;
    this.setState({parentId: parentId, confirmLoading: true});
    this.props.moveNode(activeItem.id, parentId, this.onMoveOk);
  }

  onFormSubmit(data, accseptAll = false) {
    const {activeItem, action} = this.state;

    if (action === 'edit') {
      this.props.update(activeItem.id, data, accseptAll, this._onCancel);
    } else {
      data['parentId'] = activeItem.id;
      this.props.store(data, accseptAll, this._onCancel);
    }
  }

  _haveChild() {
    let flag = true;
    const {activeItem, items} = this.state;
    if (items) {
      let index = items.findIndex((item) => item.positionId === activeItem.id);
      flag = (index !== -1);
    }
    return flag;
  }

  onSubmitDestroy() {
    const {activeItem} = this.state;
    if (!!activeItem.parent) {
      this.setState({confirmLoadingDestroy: true});
      this.props.destroy(activeItem.id, this._onCancel);
    } else {
      app.message(app.translate('routes.home.basic.organization-chart.Removing This Position Failed'), 'error');
    }
  }

  onSubmitDestroyWithChild() {
    const {activeItem} = this.state;
    if (!!activeItem.parent) {
      this.setState({confirmLoadingDestroyWithChild: true});
      this.props.destroyWithChild(activeItem.id, this._onCancel);
    } else {
      app.message(app.translate('routes.home.basic.organization-chart.Removing This Position Failed'), 'error');
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    let {items, visible, activeItem, action, confirmLoading, confirmLoadingDestroy, confirmLoadingDestroyWithChild} = this.state;
    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        <Col
          sm={24}
          style={{
            height: '100%',
          }}
        >
          <FChartWrapper
            items={[]}
            onButtonClick={this._onButtonClick}
            selectable={false}
            showAllCheckboxes={false}
            buttons={this._buttons()}
          />

          {
            action === 'delete' &&
            <Delete
              title={`${app.translate('main.Delete')} ${activeItem.title}`}
              confirmLoadingDestroyWithChild={confirmLoadingDestroyWithChild}
              confirmLoadingDestroy={confirmLoadingDestroy}
              onSubmitDestroyWithChild={this.onSubmitDestroyWithChild}
              onSubmitDestroy={this.onSubmitDestroy}
              onCancel={() => this._onCancel()}
              visible={visible}
              haveChild={this._haveChild()}
            />
          }

          {
            ( action === 'edit' || action === 'add' ) && visible &&
            <Edit
              onCancel={() => this._onCancel()}
              onSubmit={this.onFormSubmit}
              activeItem={activeItem}
              visible={visible}
              confirmLoading={confirmLoading}
              action={action}
              positions={items}
            />
          }

          {
            action === 'move' && visible &&
            <Move
              items={items}
              onCancel={() => this._onCancel()}
              onSubmit={this.onMoveSubmit}
              activeItem={activeItem.id}
              visible={visible}
              confirmLoading={confirmLoading}
            />
          }
        </Col>
      </Row>
    );
  }
}
