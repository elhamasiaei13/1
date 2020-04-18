import Assignment from 'components/classes/Assignment';
import { connect } from 'react-redux';
import { show } from 'routes/Home/Attendance/Policy/Definition/Module';
import { updateUsers, updatePositions } from './../Module';

@connect((state) => ({
  policy: state.Attendance.Policy.Definition.policy,
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
    return this.props.policy.positions || [];
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  get _selectedOnlyUsers() {
    return this.props.policy.users || [];
  }



  /**
   *
   * @param {Object} res
   * @private
   */
  _loaded(res) {
    this.setState({
      users: res.data.policy.users.pluck('id'),
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
