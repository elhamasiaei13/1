import React from 'react';
import {Menu, Button, Modal} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';
import {indexPack, emptyPacks, destroyPack} from './../Module';

@authorize
@connect((state) => ({
  packs: state.Attendance.Stack.Packs.packs,
  meta: state.Attendance.Stack.Packs.metaPacks,
}), {
  index: indexPack,
  destroy: destroyPack,
  emptyPacks,
})
@autobind
/**
 *
 */
export default class PackRulesList extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    emptyPacks: PropTypes.func,
    destroy: PropTypes.func,
    packs: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    packRuleId: PropTypes.number,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onFormCancel: PropTypes.func,
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    if (app._.isEmpty(this.props.packs) && this.props.packRuleId) {
      this._onReload();
    } else {
      this.setState({loading: false});
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPacks();
  }

  /**
   *
   * @private
   */
  _onReload(page = 0, limit = app.config.pagination.limit) {
    const {index, packRuleId} = this.props;
    this.setState({loading: true});

    index({
      filterGroups: [
        {
          filters: [
            {
              key: 'pack_id',
              value: [packRuleId],
              operator: 'in',
            },
          ],
        },
      ],
      page,
      limit,
    }, (err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _onDelete(item) {
    const {destroy, onFormCancel} = this.props;

    Modal.confirm({
      title: app.translate('routes.home.attendance.stack.Removing Pack'),
      content: app.translate('routes.home.attendance.stack.Are you sure about removing pack', {pack: item.name}),
      onOk: () => destroy(item.id, (err) => !err && onFormCancel(item.id)),
    });
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {index, packRuleId, meta} = this.props;

    this.setState({loading: true}, () => index({
      filterGroups: [
        {
          filters: [
            {
              key: 'pack_id',
              value: [packRuleId],
              operator: 'in',
            },
          ],
        },
        {
          or: true,
          filters: [
            {
              key: 'name',
              value,
              operator: 'ct',
            },
            {
              key: 'description',
              value,
              operator: 'ct',
            },
          ],
        },
      ],
      limit: meta.limit,
    }, () => this.setState({loading: false})));
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _pagination() {
    const {meta} = this.props;

    return {
      total: meta.total,
      pageSize: meta.limit,
      showTotal: (total, range) => app.translate('main.showingFromToOf', {
        start: range[0],
        end: range[1],
        total,
      }),
      onChange: (page, limit) => this._onReload(page - 1, limit),
      onShowSizeChange: (page, limit) => this._onReload(page - 1, limit),
    };
  }

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {can, onEdit} = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'edit':
              onEdit(item);
              break;
            case 'delete':
            default:
              this._onDelete(item);
          }
        }}
      >
        <Menu.Item key="edit" disabled={!can('StackPack@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('StackPack@destroy')}>
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  _extra() {
    const {loading} = this.state;
    const {can, onAdd} = this.props;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={this._onReload}
          disabled={!can('StackPack@index') || loading}
        >
          <MaterialIcon name="reload" size="tiny" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          onClick={onAdd}
          disabled={!can('StackPack@store')}
        >
          {app.translate('main.Add')}
        </Button>
      </Button.Group>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {packs, activeItem, onClick} = this.props;
    const {loading} = this.state;

    return (
      <ListView
        title={app.translate('routes.home.attendance.stack.Packs')}
        items={packs}
        primaryText={'name'}
        style={{height: '100%'}}
        menu={this._menu}
        extra={this._extra()}
        onSearch={this._onSearch}
        loading={loading}
        pagination={this._pagination()}
        activeItem={activeItem}
        onClick={onClick}
      />
    );
  }
}
