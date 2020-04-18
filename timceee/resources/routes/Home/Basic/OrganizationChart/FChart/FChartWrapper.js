import React from 'react';
import {connect} from 'react-redux';
import {indexPositions} from './../Module';
import PropTypes from 'prop-types';
import PrimitiveCharts from 'components/common/PrimitiveCharts/PrimitiveCharts';
import Spin from 'components/common/Spin';

@connect((state) => ({
  positions: state.Basic.OrganizationChart.positions,
}), {
  indexPositions,
}, null, {withRef: true})
@autobind
/**
 *
 */
export default class FChartWrapper extends React.Component {
  static propTypes = {
    positions: PropTypes.array,
    items: PropTypes.array,
    indexPositions: PropTypes.func,
    buttons: PropTypes.array,
    selectable: PropTypes.bool,
    showAllCheckboxes: PropTypes.bool,
    onButtonClick: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onCursorChanged: PropTypes.func,
    cursorItem: PropTypes.number,
    selected: PropTypes.array,
  };

  static defaultProps = {
    positions: [],
    items: [],
    buttons: [
      new primitives.orgdiagram.ButtonConfig(
        'delete', 'ui-icon-trash', app.translate('main.Delete'), // ui-icon-close
      ),
      new primitives.orgdiagram.ButtonConfig(
        'add', 'ui-icon-person', app.translate('main.Add'),
      ),
      new primitives.orgdiagram.ButtonConfig(
        'edit', 'ui-icon-pencil', app.translate('main.Edit'),
      ),
      new primitives.orgdiagram.ButtonConfig(
        'move', 'ui-icon-arrow-4', app.translate('main.Move'),
      ),
    ],
    selectable: true,
    showAllCheckboxes: true,
    selected: [],
  };

  /**
   * This is constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      action: null,
      activeItem: null,
      items: props.items,
      spinning: props.items ? false : true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.items.length === 0) {
      this.setState({spinning: true});
      this.props.indexPositions('Chart', (err) => {
        this.setState({spinning: false});
      });
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (app._.isEmpty(np.items) && !app._.isEmpty(np.positions)) {
      if (!app._.isEqual(this.props.positions, np.positions) || !app._.isEqual(this.state.items, np.positions)) {
        this.setState({spinning: false, items: np.positions});
      }
    } else {
      if (!app._.isEqual(np.items, this.props.items)) {
        this.setState({spinning: false, items: np.items});
      }
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
   * @return {Array|*}
   */
  selected() {
    return this.fChart.selected;
  }
  /**
   *
   * @return {Array|*}
   */
  items() {
    return this.fChart.items;
  }

  _renderItem() {
    const {items} = this.state;
    let _items = [];
    if (!app._.isEmpty(items)) {
      items.map((item) => {
        _items.push(
          {
            id: item.id,
            title: item.name,
            description: item.user ? item.user.firstName ? `${item.user.firstName} ${item.user.lastName}` : item.user.profile ? `${item.user.profile.firstName} ${item.user.profile.lastName}` : '' : '',
            personnelId: item.user && item.user.profile ? `${item.user.profile.personnelId}` : '',
            roles: item.roles ? item.roles : [],
            parent: item.positionId,
            templateName: item.type,
            userId: item.userId,
            // itemType: item.userId === 57 || item.userId === 67 || item.userId === 89 ? 1 : 0,
            // adviserPlacementType: item.userId === 57 ||item.userId === 67 || item.userId === 89 ? 1 : 0,
            avatar: item.user ? (item.user.avatar ? item.user.avatar : (item.user.profile && item.user.profile.avatar ? item.user.profile.avatar : '')) : '', // 'http://cloud.jgpr.ir/storage/pictures/5940e2407c6d7.jpg',
          },
        );
      });
    }
    return _items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {spinning} = this.state;
    const {
      buttons,
      selectable,
      showAllCheckboxes,
      onButtonClick,
      onSelectionChanged,
      onCursorChanged,
      cursorItem,
      selected,
    } = this.props;

    return (
      <Spin
        spinning={spinning}
        style={{
          height: '100%',
        }}
        wrapperClassName='organizationChartLoading'
      >
        <PrimitiveCharts
          items={this._renderItem()}
          buttons={buttons}
          hasButtons={!!onButtonClick}
          selectable={selectable}
          showAllCheckboxes={showAllCheckboxes}
          onButtonClick={onButtonClick}
          onSelectionChanged={onSelectionChanged}
          onCursorChanged={onCursorChanged}
          cursorItem={cursorItem}
          selected={selected}
          ref={(input) => this.fChart = input}
        />
      </Spin>
    );
  }
}
