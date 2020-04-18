import React from 'react';
import {Form, Button, Input, Modal, Select} from 'antd';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class Phones extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    phones: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    visible: false,
    onClose: () => {
    },
    phones: [],
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      phone: {
        numberType: 'mobile',
        number: '',
      },
      phones: props.phones,
    };
  }

  /**
   *
   * @param {Object} first
   * @param {Object} second
   * @return {boolean}
   * @private
   */
  _isPhonesEqual(first, second) {
    return (first.numberType === second.numberType
      && first.number === second.number
    );
  }

  /**
   *
   * @private
   */
  _onAdd() {
    const {phone} = this.state;
    let {phones} = this.state;
    let _exists = false;

    for (let _phones of phones) {
      if (this._isPhonesEqual(phone, _phones)) {
        _exists = true;
        break;
      }
    }

    if (!_exists && phone.number && phone.number !== '') {
      phones.push(phone);
    }

    this.setState({
      phone: {numberType: 'mobile'},
      phones,
    });
  }

  /**
   *
   * @param {Object} phone
   * @private
   */
  _onRemove(phone) {
    let phones = app._.clone(this.state.phones);

    for (let _i = 0; _i < phones.length; _i++) {
      if (this._isPhonesEqual(phone, phones[_i])) {
        phones.splice(_i, 1);
        break;
      }
    }

    this.setState({
      phones,
    });
  }

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _action(item) {
    return (
      <Button
        shape="circle"
        type="danger"
        onClick={() => this._onRemove(item)}
      >
        <MaterialIcon name="close"/>
      </Button>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {phones, phone} = this.state;
    const {visible, onClose} = this.props;

    return (
      <Modal
        title={app.translate('routes.home.basic.personnel.Phones')}
        wrapClassName="vertical-center-modal"
        visible={visible}
        onOk={() => onClose(phones)}
        onCancel={() => onClose(phones)}
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
              style={{width: '70%', marginTop: -1}}
              placeholder="2141392000"
              dir="auto"
              value={phone.number}
              onChange={(event) => this.setState({phone: {...phone, number: event.target.value ? event.target.value.replace(/(\D)/g, '') : event.target.value}})}
              prefix={<MaterialIcon name="phone"/>}
              addonAfter={
                <MaterialIcon
                  className="ant-input-search-icon"
                  name="plus"
                  onClick={this._onAdd}
                />
              }
            />
          </Input.Group>
        </Form.Item>
        <ListView
          title={app.translate('routes.home.basic.personnel.Phones')}
          items={phones}
          rowKey={(record) => `${record.numberType}-${record.number}`}
          primaryText="number"
          secondaryText={(item) => {
            return app.translate(`main.${item.numberType}`);
          }}
          action={this._action}
        />
      </Modal>
    );
  }
}
