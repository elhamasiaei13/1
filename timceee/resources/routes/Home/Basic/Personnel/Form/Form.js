import React from 'react';
import { Steps, Button, Icon, Row, Col, Card } from 'antd';
import { reduxForm, getFormValues, submit } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import Personal from './Personal';
import User from './User';
import Check from './Check';
import { showUser, emptyUser, storeUser, updateUser } from './../Module';

@reduxForm({
  form: 'personnel-form',
})
@connect((state) => ({
  user: state.Basic.Personnel.user,
  personalInformationValues: getFormValues('personnel-form-personal-information')(state),
  userInformationValues: getFormValues('personnel-form-user-information')(state),
}), {
  submit,
  show: showUser,
  empty: emptyUser,
  store: storeUser,
  update: updateUser,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    submit: PropTypes.func,
    show: PropTypes.func,
    empty: PropTypes.func,
    store: PropTypes.func,
    update: PropTypes.func,
    destroy: PropTypes.func,
    onCancel: PropTypes.func,
    item: PropTypes.object,
    user: PropTypes.object,
    personalInformationValues: PropTypes.object,
    userInformationValues: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      currentIndex: 0,
      status: 'process',
    };
  }

  /**
   *
   */
  componentDidMount() {
    const { item, show } = this.props;

    if (item) {
      show(item.id, {
        includes: [
          'profile',
          'phones',
          'contracts',
          'insurances',
          'financialInfos',
          'taInfo',
        ],
      });
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.user, np.user)) {
      this.setState({
        user: np.user,
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const { destroy, empty } = this.props;

    destroy('personnel-form-personal-information');
    destroy('personnel-form-user-information');
    empty();
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _getSteps() {
    const { user } = this.state;
    // const {item} = this.props;

    let _steps = [{
        key: 1,
        step: (
          <Steps.Step
            key={1}
            title={app.translate('routes.home.basic.personnel.Personal Information')}
            icon={<MaterialIcon name="account"/>}
          />
        ),
        component: (
          <Personal
            user={user}
            onSuccess={() => this.setState({currentIndex: 1, status: 'process'})}
            onFailure={() => this.setState({status: 'error'})}
          />
        ),
      },
      {
        key: 2,
        step: (
          <Steps.Step
            key={2}
            title={app.translate('routes.home.basic.personnel.User Information')}
            icon={<MaterialIcon name="account-card-details"/>}
          />
        ),
        component: (
          <User
            user={user}
            onSuccess={() => this.setState({currentIndex: 2, status: 'process'})}
            onFailure={() => this.setState({status: 'error'})}
          />
        ),
      },
    ];

    // if (item) {
    //   _steps.push(
    //     {
    //       key: 3,
    //       step: (
    //         <Steps.Step
    //           key={3}
    //           title={app.translate('routes.home.basic.personnel.Contract Information')}
    //           icon={<MaterialIcon name="content-paste"/>}
    //         />
    //       ),
    //       component: (
    //         <Contract
    //           user={user}
    //           onSuccess={() => this.setState({currentIndex: 3, status: 'process'})}
    //           onFailure={() => this.setState({status: 'error'})}
    //         />
    //       ),
    //     },
    //     {
    //       key: 4,
    //       step: (
    //         <Steps.Step
    //           key={4}
    //           title={app.translate('routes.home.basic.personnel.Financial Information')}
    //           icon={<MaterialIcon name="credit-card"/>}
    //         />
    //       ),
    //       component: (
    //         <Financial
    //           user={user}
    //           onSuccess={() => this.setState({currentIndex: 4, status: 'process'})}
    //           onFailure={() => this.setState({status: 'error'})}
    //         />
    //       ),
    //     },
    //   );
    // }

    _steps.push({
      key: 5,
      step: (
        <Steps.Step
          key={5}
          title={app.translate('routes.home.basic.personnel.Check & Submit')}
          icon={<MaterialIcon name="check-all"/>}
        />
      ),
      component: (
        <Check
          personalInformationValues={this.props.personalInformationValues}
          userInformationValues={this.props.userInformationValues}
        />
      ),
    });

    return _steps;
  }

  /**
   *
   * @private
   */
  _goPrevious() {
    const { currentIndex } = this.state;

    this.setState({
      currentIndex: currentIndex - 1,
      status: 'process',
    });
  }

  /**
   *
   * @private
   */
  _goNext() {
    const { currentIndex } = this.state;

    switch (currentIndex) {
      case 0:
        this.props.submit('personnel-form-personal-information');
        break;
      case 1:
        this.props.submit('personnel-form-user-information');
        break;
      case 2:
        this.props.submit('personnel-form-contract-information');
        break;
      case 3:
        this.props.submit('personnel-form-financial-information');
        break;
    }
  }

  /**
   *
   * @private
   */
  _submit() {
    const {
      item,
      store,
      update,
      personalInformationValues,
      userInformationValues,
    } = this.props;

    let _data = {
      email: userInformationValues.email,
      password: userInformationValues.password,
      phones: personalInformationValues.phones,
      profile: {
        ...app._.omit(personalInformationValues, ['education', 'military', 'phones']),
        ...app._.omit(userInformationValues, ['email', 'password', 'identificationCode', 'nightShift']),
        companyId: 1,
        education: personalInformationValues.education && (personalInformationValues.education * 1),
        military: personalInformationValues.military && (personalInformationValues.military * 1),
      },
      taInfo: {
        identificationCode: userInformationValues.identificationCode,
        nightShift: userInformationValues.nightShift,
      },
    };

    if (item) {
      update(item.id, _data, (err) => !err && this._onCancel());
    } else {
      store(_data, (err) => !err && this._onCancel());
    }
  }

  /**
   *
   * @private
   */
  _onCancel() {
    const { destroy, onCancel } = this.props;

    destroy('personnel-form-personal-information');
    destroy('personnel-form-user-information');
    onCancel();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { currentIndex, status } = this.state;

    return (
      <Card
        className="wrapper"
        title={app.translate('routes.home.basic.personnel.Personnel Form')}
        extra={
          <Button
            type="dashed"
            onClick={this._onCancel}
          >
            {app.translate('main.Cancel')}
          </Button>
        }
      >
        <Row
          style={{
            height: '100%',
          }}
        >

          <Col
            sm={8}
            md={4}
            style={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <Steps direction="vertical" current={currentIndex} status={status}>
              {app._.map(this._getSteps(), (item) => item.step)}
            </Steps>

            <Button.Group>

              <Button
                type="dashed"
                onClick={this._goPrevious}
                disabled={currentIndex === 0}
              >
                <Icon type="up" className="left"/>
                <span className="right">{app.translate('main.Previous')}</span>
              </Button>

              {
                currentIndex !== (this._getSteps().length - 1) ?
                  <Button
                    type="primary"
                    onClick={this._goNext}
                  >
                    <span className="left">{app.translate('main.Next')}</span>
                    <Icon type="down" className="right"/>
                  </Button>
                  :
                  <Button
                    type="primary"
                    onClick={this._submit}
                  >
                    <span className="left">{app.translate('main.Submit')}</span>
                    <Icon type="check" className="right"/>
                  </Button>
              }

            </Button.Group>

          </Col>

          <Col
            sm={16}
            md={20}
            style={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            {this._getSteps()[currentIndex].component}
          </Col>

        </Row>
      </Card>
    );
  }
}
