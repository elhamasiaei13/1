import Assignment from 'components/classes/Assignment';
import { connect } from 'react-redux';
import { show } from 'routes/Home/Requests/Pattern/RulePack/Module';
import { updateUsers, updatePositions } from './../Module';

@connect((state) => ({
  rulePack: state.Requests.Pattern.RulePack.rulePack,
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
  static defaultProps = {
    rulePack: {},
  };

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
    return this.props.rulePack.positions || [];
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  get _selectedOnlyUsers() {
    return this.props.rulePack.users || [];
  }

  /**
   *
   * @param {Object} res
   * @private
   */
  _loaded(res) {
    this.setState({
      users: res.data.requestRulePack.users.pluck('id'),
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
