import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal, Menu, Dropdown} from 'antd';
import {show, emptyQuestionnaire, store, update} from './../../Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';
import Table from 'components/common/Table';

@connect((state) => ({
  questionCategories: state.Evaluation360.Question.QuestionCategory.questionCategories,
}), {
  show,
  emptyQuestionnaire,
  store,
  update,
})
@autobind
/**
 *
 */
export default class QuestionTable extends React.PureComponent {
  static propTypes = {
    onMenuTouch: PropTypes.func,
    questions: PropTypes.arrayOf(PropTypes.object),
    questionCategories: PropTypes.arrayOf(PropTypes.object),
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      receiving: false,
      isContesMenuOpen: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
  }


  /**
   *
   * @param {object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {onMenuTouch} = this.props;
    const menuItems = (<Menu
      onClick={(key) => {
        this.setState({isContesMenuOpen: false});
        onMenuTouch(item, key);
      }}
    >
      <Menu.Item key="1" disabled={!app.authorize.can('Question@index')}>
        <MaterialIcon name="information-outline"/>
        {app.translate('main.Info')}
      </Menu.Item>
      <Menu.Item key="2" disabled={!app.authorize.can('Question@update')}>
        <MaterialIcon name="pencil"/>
        {app.translate('main.Edit')}
      </Menu.Item>
      <Menu.Item key="3" disabled={!app.authorize.can('Question@destroy')}>
        <MaterialIcon name="delete"/>
        {app.translate('main.Delete')}
      </Menu.Item>
    </Menu> );
    return (
      <Dropdown
        overlay={menuItems}
        trigger={['click']}
        onVisibleChange={(isContesMenuOpen) => {
          this.setState({isContesMenuOpen});
        }}
      >
        <a className="ant-dropdown-link">
          <MaterialIcon
            name="dots-vertical"
            style={{
              width: 24,
              height: 24,
              fontSize: 24,
            }}
          />
        </a>
      </Dropdown>);
  }

  _category(id) {
    let item = this.props.questionCategories.find((item) => item.id === id);

    return item && item.title ? item.title : '';
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, questionnaire, statuses, events, showAddForm, error} = this.state;
    const {questions, menu} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Table
          rowCounter={1}
          menu={this._menu}
          columns={[
            {
              title: app.translate('routes.home.evaluation-360.Question'),
              key: 'title',
              width: '450px',
            },
            {
              title: app.translate('routes.home.evaluation-360.Question Category'),
              key: 'questionCategoryId',
              width: '150px',
              render: (text, record) => ( record.category ? record.category.title : this._category(text)),
            }]}
          dataSource={questions ? questions : []}
          haveExport={true}
          rowSelection={false}
        />

      </Spin>
    );
  }
}
