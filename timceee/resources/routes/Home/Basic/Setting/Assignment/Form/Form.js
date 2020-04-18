import Assignment from 'components/classes/Assignment';
import { connect } from 'react-redux';
import { show } from '../../Definition/Module';
import { updateUsers, updatePositions } from './../Module';

@connect((state) => ({
  setting: state.Basic.Setting.Definition.setting,
}), {
  show,
  updateUsers,
  updatePositions,
})
@autobind
/**
 *
 */
export default class Form extends Assignment.Form {
  static defaultProps = Object.assign({}, Assignment.Form.defaultProps, {
    setting: {},
  });

  /**
   *
   */
  componentDidMount() {
    const { show, item } = this.props;

    show(item.id, {
      includes: [
        'positions,ids',
        'users.profile',
      ],
    }, this._loaded);
  }

  /**
   *
   * @return {Array}
   * @private
   */
  get _positions() {
    return this.props.setting.positions || [];
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  get _selectedOnlyUsers() {
    return this.props.setting.users || [];
  }

  /**
   *
   * @param {Object} err
   * @param {Object} res
   * @private
   */
  _loaded(err, res) {
    this.setState({
      users: res.data.setting.users.pluck('id'),
    }, () => super._loaded());
  }

  /**
   *
   * @private
   */
  _submit() {
    const { updateUsers, updatePositions, item, onCancel } = this.props;

    this._submiting(() => {
      let users = this._selectedUsers;
      let positions = this._selectedPositions;

      updateUsers(item.id, users, null, (err) => !err && updatePositions(item.id, positions, null, (err) => this._submited(err, onCancel)));
    });
  }
}
