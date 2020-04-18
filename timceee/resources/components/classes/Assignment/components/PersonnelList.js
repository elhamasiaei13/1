import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import { Button, Tooltip } from 'antd';
import { List } from 'routes/Home/Basic/Personnel/List';

@autobind
/**
 *
 */
export default class PersonnelList extends List {
  /**
   *
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      selectedOnly: false,
    };
  }

  /**
   *
   * @return {Array}
   */
  get _users() {
    const { selectedOnly } = this.state || {};

    if (selectedOnly) {
      return this.props.users || [];
    }

    return app.state.Basic.Personnel.users;
  }

  _menu = undefined

  /**
   * renders extra for list
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  get _extra() {
    const { selectedOnly, loading } = this.state;
    const meta = app.state.Basic.Personnel.usersMeta;

    return (
      <Button.Group>
        <Tooltip title={app.translate('main.Reload')} placement="bottom">
          <Button
            type="dashed"
            onClick={() => this._onReload(meta.currentPage, meta.limit)}
            disabled={!app.authorize.can('User@index') || loading}
          >
            <MaterialIcon name="reload" spin={loading}/>
          </Button>
        </Tooltip>
        <Button
          type={selectedOnly ? 'primary' : 'default'}
          onClick={() => this.setState((prevState) => ({selectedOnly: !prevState.selectedOnly}))}
        >
          {app.translate('routes.home.basic.personnel.Selected Only')}
        </Button>
      </Button.Group>
    );
  }
}
