import Assignment from 'components/classes/Assignment';
import {connect} from 'react-redux';
import {getPosition, updateContactUserPositions} from '../Module';

@connect((state) => ({
  position: state.Evaluation360.Settings.Contact.position,
}), {
  getPosition,
  updateContactUserPositions,
})
@autobind
/**
 *
 */
export default class Form extends Assignment.Form {
  static defaultProps = Object.assign({}, Assignment.Form.defaultProps, {
    position: {},
  });

  /**
   *
   */
  componentDidMount() {
    const {getPosition, item} = this.props;

    getPosition(item.id, {
      includes: [
        'contacts',
      ],
    }, this._loaded);
  }

  // /**
  //  *
  //  * @return {Array}
  //  * @private
  //  */
  // get _positions() {
  //   return this.props.position.positions || [];
  // }

  // /**
  //  *
  //  * @return {Object[]}
  //  * @private
  //  */
  // get _selectedOnlyUsers() {
  //   return this.props.position.users || [];
  // }

  /**
   *
   * @param {Object} err
   * @param {Object} res
   * @private
   */
  _loaded(err, res) {
    this.setState({
      positions: res && res.data && res.data.positions ? res.data.positions.pluck('contactableId') : [],
      users: res && res.data && res.data.users ? res.data.users.pluck('contactableId') : [],
    }, () => super._loaded());
  }

  /**
   *
   * @private
   */
  _submit() {
    const {updateContactUserPositions, item, onCancel} = this.props;
    this._submiting(() => {
      let users = this._selectedUsers;
      let positions = this._selectedPositions;

      updateContactUserPositions(item.id, {positions, users}, null, (err) => this._submited(err, onCancel));
    });
  }
}
