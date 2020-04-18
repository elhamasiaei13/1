import React from 'react';
import { Card, Button, Tabs } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Personal from './Personal';
import User from './User';
import Insurance from './Insurance';
import Contract from './Contract';
import Financial from './Financial';
import Family from './Family';
import { showUser, emptyUser } from './../Module';
import Avatar from 'components/common/Avatar';
import Spin from 'components/common/Spin';

@connect((state) => ({
  user: state.Basic.Personnel.user,
}), {
  show: showUser,
  empty: emptyUser,
})
@autobind
/**
 *
 * @extends PureComponent
 */
export default class View extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    user: PropTypes.object,
    show: PropTypes.func,
    empty: PropTypes.func,
    onCancel: PropTypes.func,
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
    const { show, item } = this.props;

    show(item.id, {
      includes: [
        'taInfo',
        'profile',
        'phones',
      ],
    }, () => this.setState({ loading: false }));
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.empty();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { item, user, onCancel } = this.props;

    return (
      <Card
        className="wrapper"
        title={
          <div>
            <Avatar
              text={item.profile && `${item.profile.firstName} ${item.profile.lastName}`}
              src={item.profile && item.profile.avatar}
              style={{
                verticalAlign: 'middle',
              }}
            />&nbsp;&nbsp;&nbsp;{ item.profile && item.profile.firstName }&nbsp;{ item.profile && item.profile.lastName }
      </div>
    }
    extra = {
        <Button
            type="dashed"
            onClick={() => onCancel()}
          >
            {app.translate('main.Back')}
          </Button>
      } >
      <Spin
          wrapperClassName="wrapper"
          spinning={loading}
        >
          <Tabs
            style={{
              height: '100%',
            }}
          >
            <Tabs.TabPane
              tab={app.translate('routes.home.basic.personnel.Personal Information')}
              key="1"
            >
              <Personal user={user}/>
            </Tabs.TabPane>
            <Tabs.TabPane
              disabled={!app.authorize.can('Profile@index')}
              tab={app.translate('routes.home.basic.personnel.User Information')}
              key="2"
            >
              <User user={user}/>
            </Tabs.TabPane>
            <Tabs.TabPane
              disabled={!app.authorize.can('Insurance@index')}
              tab={app.translate('routes.home.basic.personnel.Insurance Information')}
              key="3"
            >
              <Insurance user={user}/>
            </Tabs.TabPane>
            <Tabs.TabPane
              disabled={!app.authorize.can('Contract@index')}
              tab={app.translate('routes.home.basic.personnel.Contract Information')}
              key="4"
            >
              <Contract user={user}/>
            </Tabs.TabPane>
            <Tabs.TabPane
              disabled={!app.authorize.can('FinancialInfo@index')}
              tab={app.translate('routes.home.basic.personnel.Financial Information')}
              key="5"
            >
              <Financial user={user}/>
            </Tabs.TabPane>
            <Tabs.TabPane
              disabled={!app.authorize.can('FamiliesInfo@index')}
              tab={app.translate('routes.home.basic.personnel.Families Information')}
              key="6"
            >
              <Family user={user}/>
            </Tabs.TabPane>
          </Tabs>
        </Spin> </Card>
  );
}
}
