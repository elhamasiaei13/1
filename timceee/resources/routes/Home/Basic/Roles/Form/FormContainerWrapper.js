import React from 'react';
import {connect} from 'react-redux';
import {showRole, indexPermissions} from './../Module';
import PropTypes from 'prop-types';
import FormContainer from './FormContainer';
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
export default class FormContainerWrapper extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    showRole: PropTypes.func,
    indexPermissions: PropTypes.func,
    item: PropTypes.object,
    permissions: PropTypes.arrayOf(
      PropTypes.object,
    ),
    role: PropTypes.object,
    submitOnTouch: PropTypes.func,
    cancelOnTouch: PropTypes.func,
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
      searchValue: '',
      checkedKeys: !app._.isEmpty(props.item) && props.role.perms ? props.role.perms.pluck('id', this._toString) : [],
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
      checkedKeys: !app._.isEmpty(np.item) && np.role.perms ? np.role.perms.pluck('id', this._toString) : [],
      spinning: false,
    });
    if (!app._.isEqual(np.item, this.props.item)) {
      if (!app._.isEmpty(np.item)) {
        np.showRole(np.item.id);
      }
      np.indexPermissions();
    }
  }

  /**
   *
   * @param {String} searchValue
   * @private
   */
  _search(searchValue) {
  }

  /**
   *
   * @param {String} value
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
   // this.props.indexPermissions();
  }

  /**
   *
   * @param {Array} selectedKeys
   * @param {String} info
   */
  onTreeSelect(selectedKeys, info) {
  }


  /**
   *
   * @private
   */
  _onSubmit() {
    const data = this.form.formValue();

    if (data.name && data.name.length > 0) {
      this.props.submitOnTouch({role: data});
    }
  }

  /**
   *
   * @param {Number} item
   * @return {String}
   * @private
   */
  _toString(item) {
    return item.toString();
  }

  _permissions() {
    const {
      permissions,
    } = this.props;

    return permissions;
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {
      item,
      role,
      cancelOnTouch,
      title,
    } = this.props;
    const {spinning, titleValidating, titleHelp, checkedKeys} = this.state;

    return (
      <Spin
        spinning={spinning}
        wrapperClassName="jsSpin"
      >
        <FormContainer
          ruleTitle={title}
          onChangeSearchInput={this.onChangeSearchInput}
          onPressEnter={this.onPressEnter}
          onSearch={this.onSearch}
          onTreeSelect={this.onTreeSelect}
          item={!app._.isEmpty(item) ? role : {}}
          role={role}
          permissions={this._permissions()}
          cancelOnTouch={cancelOnTouch}
          submitOnTouch={this._onSubmit}
          titleOnChange={this._titleOnChange}
          descriptionOnChange={this._descriptionOnChange}
          defaultCheckedKeys={checkedKeys}
          ref={(input) => this.form = input}
        />
      </Spin>
    );
  }
}
