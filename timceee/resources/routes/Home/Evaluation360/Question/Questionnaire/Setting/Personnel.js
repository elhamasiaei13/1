import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {indexQuestionnaireAssignedUser, emptyQuestionnaireAssignedUser} from './../Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';
import Avatar from 'components/common/Avatar';
import Chip from 'components/common/Chip';
import uuidv1 from 'uuid/v1';
import PersonnelList from 'routes/Home/Basic/Personnel/List';
import ListView from 'components/common/ListView';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  users: state.Evaluation360.Question.Questionnaire.questionnaireAssignmentAssignedUser,
  meta: state.Evaluation360.Question.Questionnaire.questionnaireAssignmentAssignedUserMeta,
}), {
  indexQuestionnaireAssignedUser,
  emptyQuestionnaireAssignedUser,
})
@autobind
/**
 *
 */
export default class Personnel extends React.PureComponent {
  static propTypes = {
    rest: PropTypes.object,
    item: PropTypes.object,
    meta: PropTypes.object,
    users: PropTypes.array,
    onCancel: PropTypes.func,
    onClick: PropTypes.func,
    emptyQuestionnaireAssignedUser: PropTypes.func,
    indexQuestionnaireAssignedUser: PropTypes.func,
    activeItem: PropTypes.any,
    reference: PropTypes.any,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      receiving: true,
      value: '',
    };
  }

  /**
   *
   */
  componentDidMount() {
    this._onReload(this.props);
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!np.activeItem) {
      if (
        !app._.isEqual(np.item, this.props.item)
      ) {
        this._onReload(np);
      }
      if (!app._.isEqual(np.users, this.state.users)) {
        this.setState({
          users: np.users,
        });
      }
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyQuestionnaireAssignedUser} = this.props;

    emptyQuestionnaireAssignedUser();
  }


  /**
   * @param {Object} props
   * @param {String} value
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _onReload(props, value = '', page = 0, limit = app.config.pagination.limit) {
    const {indexQuestionnaireAssignedUser} = this.props;
    let filterGroup = [];
    if (value !== '') {
      filterGroup = [
        {
          or: true,
          filters: [
            {
              key: 'search',
              value,
              operator: 'ct',
            },
          ],
        },
      ];
    } else {
      if (this.state.value !== '') {
        this.setState({value: ''});
      }
      filterGroup = [];
    }
    this.setState({
      receiving: true,
    }, () => {
      if (props && props.item && props.item.id) {
        indexQuestionnaireAssignedUser(props.item.id, {
          includes: ['profile'],
          filterGroups: filterGroup,
          // sort: [
          //   {
          //     key: 'id',
          //     direction: 'ASC',
          //   },
          // ],
          page, limit,
        }, () => {
          this.setState({
            receiving: false,
          });
        });
      } else {
        this.setState({
          receiving: false,
        });
      }
    });
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    this.setState({value});
    this._onReload(this.props, value);
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
      onChange: (page, limit) => this._onReload(this.props, value, page - 1, limit),
      onShowSizeChange: (page, limit) => this._onReload(this.props, value, page - 1, limit),
    };
  }

  get _extra() {
    const {onCancel, activeItem} = this.props;
    let items = [];
    const {loading} = this.state;
    items.push(<Button
      key='btnReload'
      type='dashed'
      disabled={!!activeItem}
      onClick={() => {
        this._onReload(this.props);
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


  _users() {
    const {users} = this.props;
    let _users = [];
    if (users) {
      users.map((user) => {
        let index = -1;
        if (_users && _users[0]) {
          index = _users.findIndex((item) => item.id === user.assignedUser.id);
        }
        if (index === -1) {
          _users.push(user.assignedUser);
        }
      });
    }
    return _users;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {users, ...rest} = this.props;
    const {receiving} = this.state;
    return (
      <Spin
        spinning={receiving}
      >
        <ListView
          extra={[<Button.Group key='btngroup'>{this._extra}</Button.Group>]}
          loading={receiving}
          items={users}
          title={app.translate('routes.home.evaluation-360.positions')}
          primaryText={(item) => {
            return item && item.profile ? `${item.profile.firstName} ${item.profile.lastName}` : '';
          }}
          secondaryText={(item) => {
            return item && item.profile ? `${app.translate('routes.home.evaluation-360.Personnel Code', 'Personnel Code')} : ${item.profile.personnelId}` : '';
          }}
          style={{height: '100%'}}
          pagination={this._renderPagination()}
          onSearch={this._onSearch}
          avatar={{render: (item) => ( item && item.profile ? item.profile.avatar : item && item.profile ? `${item.profile.firstName} ${item.profile.lastName}` : '')}}
          {...rest}
        />
      </Spin>
    );
  }
}