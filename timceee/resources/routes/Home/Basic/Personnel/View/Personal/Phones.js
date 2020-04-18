import React from 'react';
import PropTypes from 'prop-types';
import Spin from 'components/common/Spin';
import ListView from 'components/common/ListView';
import Icon from 'components/common/MaterialIcon';
import {connect} from 'react-redux';
import {Form, Button, Input, Modal, Select, Menu} from 'antd';
import {indexUserPhones, storeUserPhone, updateUserPhone, destroyUserPhone, emptyUserPhones} from '../../Module';

@connect((state) => ({
  phones: state.Basic.Personnel.phones,
}), {
  index: indexUserPhones,
  empty: emptyUserPhones,
  store: storeUserPhone,
  update: updateUserPhone,
  destroy: destroyUserPhone,
})
@autobind
/**
 *
 * @extends React.PureComponent
 */
export default class Phones extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    index: PropTypes.func.isRequired,
    empty: PropTypes.func.isRequired,
    store: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      phone: {
        numberType: 'mobile',
        userId: props.user.id,
      },
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.props.index(this.props.user.id, (err) => !err && this.setState({loading: false}));
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
   * @private
   */
  _onSubmit() {
    const {phone} = this.state;
    const {user, store, update} = this.props;

    if (phone.number && phone.number.length > 4 && phone.number.length < 13) {
      this.setState({
        loading: true,
      }, () => {
        if (phone.id) {
          update(phone.id, phone, (err) => this.setState({loading: false}, () => !err && this.setState({phone: {numberType: 'mobile'}})));
        } else {
          store(user.id, phone, (err) => this.setState({loading: false}, () => !err && this.setState({phone: {numberType: 'mobile'}})));
        }
      });
    }
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onEdit(item) {
    this.setState({
      phone: item,
    });
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onDelete(item) {
    const {destroy} = this.props;

    Modal.confirm({
      title: app.translate('routes.home.basic.personnel.Removing phone'),
      content: app.translate('routes.home.basic.personnel.Are you sure removing phone with number', {number: item.number}),
      onOk: () => this.setState({loading: true}, () => destroy(item.id, (err) => !err && this.setState({loading: false}))),
    });
  }

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'edit':
              this._onEdit(item);
              break;
            case 'delete':
            default:
              this._onDelete(item);
          }
        }}
      >
        <Menu.Item key="edit">
          <Icon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete">
          <Icon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, phone} = this.state;
    const {visible, phones, onClose} = this.props;

  //  console.log(phone.number);

    return (
      <Modal
        title={app.translate('routes.home.basic.personnel.Phones')}
        wrapClassName="vertical-center-modal"
        visible={visible}
        onClose={onClose}
        footer={
          <Button
            type="dashed"
            onClick={onClose}
          >
            {app.translate('main.Close')}
          </Button>
        }
      >

        <Spin
          spinning={loading}
        >

          <Form.Item
            label={app.translate('routes.home.basic.personnel.Add New Phone')}
          >

            <Input.Group compact>

              <Select
                style={{width: '30%'}}
                defaultValue="mobile"
                value={phone.numberType}
                onChange={(value) => this.setState({phone: {...phone, numberType: value}})}
              >
                <Select.Option value="mobile">{app.translate('main.mobile')}</Select.Option>
                <Select.Option value="home">{app.translate('main.home')}</Select.Option>
                <Select.Option value="work">{app.translate('main.work')}</Select.Option>
                <Select.Option value="home_fax">{app.translate('main.home_fax')}</Select.Option>
                <Select.Option value="work_fax">{app.translate('main.work_fax')}</Select.Option>
                <Select.Option value="pager">{app.translate('main.pager')}</Select.Option>
                <Select.Option value="other">{app.translate('main.other')}</Select.Option>
              </Select>

              <Input
                type="text"
                className="phone"
                style={{width: '70%', marginTop: -1}}
                placeholder="2141392000"
                dir="auto"
                value={phone.number}
                onChange={(event) => this.setState({
                  phone: {
                    ...phone,
                    number: event.target.value.replace(/([^0-9])/g, ''),
                  },
                })}
                prefix={<Icon name="phone"/>}
                onPressEnter={this._onSubmit}
                suffix="+98"
                addonAfter={
                  <Icon
                    name="content-save"
                    className="ant-input-search-icon"
                    tooltip={app.translate('main.Submit')}
                    onClick={this._onSubmit}
                  />
                }
              />

            </Input.Group>

          </Form.Item>

          <ListView
            title={app.translate('routes.home.basic.personnel.Phones')}
            items={phones}
            primaryText="number"
            secondaryText={(item) => app.translate(`main.${item.numberType}`)}
            onClick={this._onEdit}
            menu={this._menu}
          />

        </Spin>

      </Modal>
    );
  }
}
