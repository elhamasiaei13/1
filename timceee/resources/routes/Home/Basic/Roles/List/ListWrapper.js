import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TreeView from 'components/common/TreeView';
import {indexRoles} from './../Module';
import Spin from 'components/common/Spin';

@connect((state) => ({
  roles: state.Basic.Roles.roles,
}), {
  indexRoles,
}, null, {withRef: true})
@autobind
/**
 *
 * @class ListWrapper
 * @extends PureComponent
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    indexRoles: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.object),
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
    const {indexRoles} = this.props;

    this.setState({loading: true});

    indexRoles({}, () => this.setState({loading: false}));
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
   * @param {Array} selected
   * @private
   */
  _onCheck(selected) {
    const {onCheck} = this.props;
    this.setState({
      selected,
    });
    onCheck(selected);
  }

  /**
   *permissions
   * @return {Array}
   * @private
   */
  _renderData() {
    const roles = this.props.roles;
    let items = [];

    roles.map((role) => {
      items.push({id: role.id, title: role.name, children: []});
    });

    return items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, selected} = this.state;
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
            defaultCheckedKeys={selected}
            checkAllButton={checkAll}
            treeStyle={{height: 'calc(100% - 40px)'}}
            ref={(input) => this.treeView = input}
          />
        </Spin>
      </div>
    );
  }
}
