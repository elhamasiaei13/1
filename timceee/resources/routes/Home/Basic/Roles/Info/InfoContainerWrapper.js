import React from 'react';
import {connect} from 'react-redux';
import {showRole, indexPermissions} from './../Module';
import PropTypes from 'prop-types';
import InfoContainer from './InfoContainer';
import Spin from 'components/common/Spin';

@connect((state) => ({
  role: state.Basic.Roles.role,
  permissions: state.Basic.Roles.permissions,
}), {
  showRole,
  indexPermissions,
})
@autobind
/**
 *
 */
export default class InfoConainerWrapper extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    showRole: PropTypes.func,
    indexPermissions: PropTypes.func,
    item: PropTypes.object,
    permissions: PropTypes.arrayOf(
      PropTypes.object,
    ),
    role: PropTypes.object,
    editOnToush: PropTypes.func,
    cancelOnTouch: PropTypes.func,
    deleteOnToush: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    item: {},
    role: {},
    permissions: [],
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      render: 0,
      searchValue: '',
      spinning: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    if (!app._.isEmpty(this.props.item)) {
      this.props.showRole(this.props.item.id);
    }
    this.props.indexPermissions();
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      render: 1,
      spinning: false,
    });
    if (!app._.isEqual(np.item, this.props.item)) {
      if (!app._.isEmpty(np.item)) {
        this.setState({
          render: 0,
        });
        np.showRole(np.item.id);
      }
      np.indexPermissions();
    }
  }

  /**
   *
   * @param {string} searchValue
   * @private
   */
  _search(searchValue) {
  }

  /**
   *
   * @param {string} value
   */
  onSearch(value) {
  }

  /**
   *
   * @param {element} e
   */
  onChangeSearchInput(e) {
    const value = e.target.value;
    this._search(value);
  }

  /**
   *
   * @param {element} e
   */
  onPressEnter(e) {
    const value = e.target.value;
  }

  /**
   *
   * @param {array} selectedKeys
   * @param {string} info
   */
  onTreeSelect(selectedKeys, info) {
  }

  /**
   *
   * @private
   */
  _editOnToush() {
    this.props.editOnToush(this.props.item, true, 'info');
  }

  /**
   *
   * @private
   */
  _deleteOnToush() {
    this.props.deleteOnToush(this.props.item);
  }


  /**
   *
   * @param {Number} item
   * @return {string}
   * @private
   */
  _toString(item) {
    return item.toString();
  }

  _permissions() {
    const {
      permissions,
    } = this.props;

    return [{id: 0, displayName: app.translate('routes.home.basic.roles.All'), children: permissions}];
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      role,
      cancelOnTouch,
      title,
      permissions,
    } = this.props;
    const {render, spinning} = this.state;
    return (
      !app._.isEmpty(role) && render ?
        <Spin
          spinning={spinning}
          wrapperClassName="jsSpin"
        > <InfoContainer
          title={title}
          onChangeSearchInput={this.onChangeSearchInput}
          onPressEnter={this.onPressEnter}
          onSearch={this.onSearch}
          onCheck={this.onTreeCheck}
          onSelect={this.onTreeSelect}
          item={role}
          permissions={permissions}
          editOnToush={this._editOnToush}
          deleteOnToush={this._deleteOnToush}
          cancelOnTouch={cancelOnTouch}
          defaultCheckedKeys={!app._.isEmpty(role) ? role.perms.pluck('id', this._toString) : []}
        /></Spin> : <div/>
    );
  }
}
