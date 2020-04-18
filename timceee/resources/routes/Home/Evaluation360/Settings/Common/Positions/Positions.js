import React from 'react';
import PropTypes from 'prop-types';
import {getPositions} from '../Module';
import {connect} from 'react-redux';
import ListView from 'components/common/ListView';
import {Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@connect((state) => ({
  positions: state.Evaluation360.Settings.Common.positions,
  meta: state.Evaluation360.Settings.Common.meta,
}), {
  getPositions,
})

@autobind
/**
 *
 */
export default class Positions extends React.PureComponent {
  static propTypes = {
    positions: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    getPositions: PropTypes.func,
    onCancel: PropTypes.func,
    reference: PropTypes.func,
    type: PropTypes.arrayOf(
      PropTypes.string,
    ),
  };

  static defaultProps = {
    reference: () => {
    },
    type: ['department', 'post'],
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      value: '',
    };
  }

  /**
   *
   */
  componentDidMount() {
    this._onReload();
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    // console.log(np);
    // if (!app._.isEqual(np.period, this.props.period)) {
    //   let periodId = np.period && np.period.id;
    //   this._onReload(periodId);
    // }
  }

  /**
   * @param {String} value
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _onReload(value = '', page = 0, limit = app.config.pagination.limit) {
    const {getPositions, type} = this.props;
    let filterGroup = [];
    if (value !== '') {
      filterGroup = [
        {
          filters: [
            {
              key: 'type',
              value: type,
              operator: 'in',
            },
          ],
        },
        {
          or: true,
          filters: [
            {
              key: 'positions',
              value,
              operator: 'eq',
            },
          ],
        },
      ];
    } else {
      if (this.state.value !== '') {
        this.setState({value: ''});
      }
      filterGroup = [
        {
          filters: [
            {
              key: 'type',
              value: type,
              operator: 'in',
            },
          ],
        },
      ];
    }
    this.setState({loading: true}, () => getPositions({
      includes: ['user.profile'],
      filterGroups: filterGroup,
      sort: [
        {
          key: 'name',
          direction: 'ASC',
        },
      ],
      page, limit,
    }, (err) => this.setState({loading: false})));
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    this.setState({value});
    this._onReload(value);
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _renderPagination() {
    const {meta} = this.props;
    const {value} = this.state;

    return {
      total: meta && meta.total,
      pageSize: meta && meta.limit,
      showTotal: (total, range) => app.translate('main.showingFromToOf', {
        start: range[0],
        end: range[1],
        total,
      }),
      onChange: (page, limit) => this._onReload(value, page - 1, limit),
      onShowSizeChange: (page, limit) => this._onReload(value, page - 1, limit),
    };
  }

  /**
   *
   */
  _resetSearch() {
    this.setState({search: ''}, () => {
      if (this._list.resetSearch) {
        this._list.resetSearch();
      } else {
        this._list.getWrappedInstance().resetSearch();
      }

      app.dispatch(setSearchValue());
    });
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _items() {
    const {positions} = this.props;
    let _items = [];
    if (positions) {
      positions.map((position) => {
        if (position.type === 'post') {
          _items.push(Object.assign({}, position, {icon: 'account'}));
        } else {
          _items.push(Object.assign({}, position, {icon: 'sitemap'}));
        }
      });
    }
    return _items;
  }

  /**
   *
   * @return {Array}
   * @private
   */
  get _extra() {
    const {onCancel} = this.props;
    let items = [];
    const {loading} = this.state;
    items.push(<Button key='btnReload' type='dashed' onClick={() => {
      this._onReload();
    }}>
      <MaterialIcon name="reload" spin={loading}/>
    </Button>);
    if (onCancel) {
      items.push(<Button
        type="danger"
        key='onCancel'
        onClick={onCancel}
      >
        {app.translate('main.Cancel')}
      </Button>);
    }
    return items;
  }

  /**
   *
   * @function render
   * @return {XML}
   */
  render() {
    const {reference,...rest} = this.props;
    const {loading} = this.state;

    return (
      <ListView
        extra={[<Button.Group key='btngroup'>{this._extra}</Button.Group>]}
        loading={loading}
        items={this._items()}
        title={app.translate('routes.home.evaluation-360.positions')}
        primaryText={'name'}
        secondaryText={(item) => {
          return item && item.user && item.user.profile ? `${item.user.profile.firstName} ${item.user.profile.lastName}` : '';
        }}
        style={{height: '100%'}}
        pagination={this._renderPagination()}
        onSearch={this._onSearch}
        icon={true}
        ref={reference}
        {...rest}
      />
    );
  }
}
