import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TreeView from 'components/common/TreeView';
import {index} from './../Module';
import Spin from 'components/common/Spin';

@connect((state) => ({
  rules: state.Attendance.Rules.rules,
  modules: state.General.modules,
}), {
  index,
}, null, {withRef: true})
@autobind
/**
 *
 * @class ListWrapper
 * @extends PureComponent
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    rules: PropTypes.arrayOf(PropTypes.object),
    modules: PropTypes.arrayOf(PropTypes.object),
    selected: PropTypes.arrayOf(
      PropTypes.string,
    ),
    onCheck: PropTypes.func,
    title: PropTypes.any,
    checkAll: PropTypes.bool,
  };

  static defaultProps = {
    selected: [],
    onCheck: () => {
    },
    checkAll: true,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selected: props.selected,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {index, modules} = this.props;

    this.setState({loading: true});

    let _modules = modules.find((item) => item.name === 'WorkingHour');
    index(
      {
        includes: [
          'rule',
        ],
        filterGroups: [
          {
            filters: [
              {
                key: 'module_id',
                value: _modules && _modules.id,
                operator: 'eq',
              },
            ],
          },
        ],
      }, () => this.setState({loading: false}));
  }

  /**
   *
   * @return {Array}
   */
  selected() {
    return this.treeView.selected();
  }

  /**
   *
   * @param {Array} _selected
   * @private
   */
  _onCheck(_selected) {
    const {onCheck, rules} = this.props;
    let selected = [];


    _selected.map((item) => {
      let _item = rules.find((_item) => _item.id === parseInt(item));
      if (_item && _item.rule) {
        selected.push(`${_item.rule.id}`);
      }
    });

    this.setState({
      selected,
    });

    onCheck(selected);
  }

  _renderItems(typeId) {
    let items = [];
    const types = this.props.rules;
    if (types && types[0]) {
      types.map((type) => {
        if (type.typeId === typeId && (!type.rule || !type.rule.isPrivate )) {
          items.push({id: type.id, title: type.label, children: this._renderItems(type.id)});
        }
      });
    }
    return items;
  }

  /**
   *permissions
   * @return {Array}
   * @private
   */
  _renderData() {
    return this._renderItems(null);
  }

  get _selected() {
    const {selected} = this.state;
    const {rules} = this.props;
    let _selected = [];

    selected.map((item) => {
      let _item = rules.find((_item) => _item.rule && _item.rule.id === parseInt(item));
      if (_item) {
        _selected.push(`${_item.id}`);
      }
    });

    return _selected;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {checkAll, title} = this.props;

    return (

      <div
        style={{
          height: 'calc(300px)',
          overflow: 'auto',
        }}
      >
        <Spin
          spinning={loading}
          style={{
            height: '100%',
          }}
        >
          <TreeView
            checkable
            title={title}
            showSearch={false}
            onCheck={this._onCheck}
            treeData={this._renderData()}
            defaultCheckedKeys={this._selected}
            checkAllButton={checkAll}
            treeStyle={{height: 'calc(100% - 44px)'}}
            ref={(input) => this.treeView = input}
          />
        </Spin>
      </div>
    );
  }
}
