import Assignment from 'components/classes/Assignment';
import { connect } from 'react-redux';
import { showPackRule } from 'routes/Home/Attendance/Stack/Packs/Module';
import { updateUsers, updatePositions } from './../Module';

@connect((state) => ({
  packRule: state.Attendance.Stack.Packs.packRule,
}), {
  showPackRule,
  updateUsers,
  updatePositions,
})
@autobind
/**
 *
 */
export default class Form extends Assignment.Form {
  static defaultProps = {
    packRule: {},
  };

  /**
   *
   */
  componentDidMount() {
    const { showPackRule, item } = this.props;

    showPackRule(item.id, {
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
    return this.props.packRule.positions || [];
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  get _selectedOnlyUsers() {
    return this.props.packRule.users || [];
  }

  /**
   *
   * @param {Object} err
   * @param {Object} res
   * @private
   */
  _loaded(err, res) {
    this.setState({
      users: res.data.stackPackRule.users.pluck('id'),
    }, () => super._loaded(err));
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
