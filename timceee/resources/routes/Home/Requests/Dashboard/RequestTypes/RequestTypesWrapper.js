import React from 'react';
import PropTypes from 'prop-types';
import TreeView from 'components/common/TreeView';
import {Types} from 'routes/General/Types';

@autobind
/**
 *
 */
export default class RequestTypesWrapper extends React.PureComponent {
  static propTypes = {
    types: PropTypes.array,
    selected: PropTypes.arrayOf(
      PropTypes.string,
    ),
    onCheck: PropTypes.func,
    checkAll: PropTypes.bool,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    types: [],
    selected: [],
    onCheck: () => {},
    checkAll: false,
    visible: true,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      requestTypes: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    if (app._.isEmpty(this.props.types)) {
      this.setState({requestTypes: Types.items('Request')});
      // this.props.getRequestTypes({
      //   includes: [
      //     'rule',
      //     'children',
      //     'children.children',
      //   ],
      //   filterGroups: [{
      //     filters: [{
      //       key: 'request_type_id',
      //       value: null,
      //       operator: 'eq',
      //     }],
      //   }],
      // });
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.selected, this.state.selected)) {
      this.setState({
        selected: np.selected,
      });
    }
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
    const { onCheck } = this.props;
    this.setState({
      selected,
    });
    onCheck(selected);
  }


  _renderObject(requestTypes){
    let items = [];

    requestTypes.map((requestType) => {
      items.push({ id: requestType.id, title: requestType.label, children: requestType.children ? this._renderObject(requestType.children) : [] });
    });

    return items;
  }

  /**
   *permissions
   * @return {Array}
   * @private
   */
  _renderData() {
    const requestTypes = app._.isEmpty(this.props.types) ? this.state.requestTypes : this.props.types;
    return this._renderObject(requestTypes);
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {selected} = this.state;
    const {checkAll, visible} = this.props;

    return (
      <div
        style={{
          height: 'calc(100% - 96px)',
          overflow: 'auto',
        }}
      >
        <TreeView
          checkable
          title={app.translate('routes.home.requests.Request Type')}
          showSearch={false}
          onCheck={this._onCheck}
          treeData={this._renderData()}
          defaultCheckedKeys={selected}
          checkAllButton={checkAll}
          ref={(input) => this.treeView = input}
          visible={visible}
        />
      </div>
    );
  }
}
