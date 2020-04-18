import React from 'react';
import {Row, Col, Button, Select as AntdSelect} from 'antd';
import {reduxForm, Field, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {Date, Time, Password, Select, Toggle} from 'components/redux-form';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import asyncValidate from './asyncValidate';
import {request} from './../../../../Module';

const styles = {
  marginTop8: {
    marginTop: 8,
  },
  marginTop16: {
    marginTop: 16,
  },
};

@reduxForm({
  form: 'devices-v800-specific-settings',
  validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    let loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

    if (values.date && values.time) {
      dispatch(request(props.device.id, 'setDatetime', {
        datetime: values.date.substr(0, 4) + '-' + values.date.substr(5, 2) + '-' + values.date.substr(8, 2) + ' ' + values.time.substr(0, 8),
      }));
    }

    dispatch(request(props.device.id, 'setSettings', values, (err) => {
      if (err) {
        loader.hide(() => app.message(app.translate('routes.home.attendance.device.Updating Device Failed'), 'error'));
      } else {
        loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
      }
    }));
  },
})
@connect((state) => ({
  values: getFormValues('devices-v800-specific-settings')(state),
}), {
  request,
})
@autobind
/**
 *
 */
export default class V800 extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    values: PropTypes.object,
    initialize: PropTypes.func,
    request: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   *
   */
  componentDidMount() {
    const {request, initialize, device} = this.props;
    let _values = {
      deviceId: device.id,
      cardReaderType: '0',
      transferSpeed: '0',
      automaticTransfer: '0',
      language: '0',
      transferType: '2',
      sensorType: '1',
      deviceControl: '4',
      deviceFunctionality: '1',
      voice: false,
      showPresent: false,
      foodKey: false,
      keys: {
        keyF1: '',
        keyF2: '',
        keyF3: '',
        keyF4: '',
        keyF5: '',
        keyF6: '',
        keyA: '',
        keyB: '',
        keyC: '',
        key0: '',
        key1: '',
        key2: '',
        key3: '',
        key4: '',
        key5: '',
        key6: '',
        key7: '',
        key8: '',
        key9: '',
        keyMenu: '',
        keyUp: '',
        keyDown: '',
        keyOk: '',
        keyCancel: '',
      },
    };

    initialize(_values);

    request(device.id, 'getSettings', null, (err, res) => !err && res.data && res.data.setting && initialize(res.data.setting));
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _setAllButtons(value) {
    const {initialize, values} = this.props;
    let _keys = {};

    for (let _key in values.keys) {
      _keys[_key] = value;
    }

    initialize({
      ...values,
      keys: _keys,
    });
  }

  /**
   *
   * @param {String} key
   * @private
   */
  _setButton(key) {
    const {initialize, values} = this.props;
    let _keys = app._.clone(values.keys);

    _keys[key] = (_keys[key] === '1' ? '0' : '1');

    initialize({
      ...values,
      keys: _keys,
    });
  }

  /**
   *
   * @param {String} key
   * @return {String} - color
   * @private
   */
  _getButtonColor(key) {
    const {values} = this.props;

    if (values) {
      switch (values.keys[key]) {
        case '0':
          return '#f44336';
        case '1':
          return '#009688';
        default:
          return '#000';
      }
    } else {
      return '#000';
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >

        <Col md={12} lg={8}>
          <Field
            name="date"
            label={app.translate('routes.home.attendance.device.Date')}
            prefix={<MaterialIcon name="alphabetical"/>}
            component={Date}
          />
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="time"
            label={app.translate('routes.home.attendance.device.Time')}
            prefix={<MaterialIcon name="alphabetical"/>}
            component={Time}
          />
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="menuPassword"
            label={app.translate('routes.home.attendance.device.Menu Password')}
            prefix={<MaterialIcon name="keyboard-variant"/>}
            component={Password}
          />
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="cardReaderType"
            label="نوع کارت خوان"
            defaultValue="0"
            component={Select}
          >
            <AntdSelect.Option value="0">غیر فعال</AntdSelect.Option>
            <AntdSelect.Option value="1">بدون تماس هوشمند</AntdSelect.Option>
            <AntdSelect.Option value="2">معمولی نوع اول</AntdSelect.Option>
            <AntdSelect.Option value="3">معمولی نوع دوم</AntdSelect.Option>
            <AntdSelect.Option value="4">معمولی نوع سوم</AntdSelect.Option>
            <AntdSelect.Option value="5">وایگند 26 بیت</AntdSelect.Option>
            <AntdSelect.Option value="6">وایگند 64 بیت</AntdSelect.Option>
            <AntdSelect.Option value="7">مغناطیسی خاص</AntdSelect.Option>
            <AntdSelect.Option value="8">مغناطیسی استاندارد ترک دو</AntdSelect.Option>
            <AntdSelect.Option value="9">بارکد جهان گستر</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="transferSpeed"
            label="سرعت ارتباط"
            defaultValue="0"
            component={Select}
          >
            <AntdSelect.Option value="0">4800</AntdSelect.Option>
            <AntdSelect.Option value="1">9600</AntdSelect.Option>
            <AntdSelect.Option value="2">19200</AntdSelect.Option>
            <AntdSelect.Option value="3">38400</AntdSelect.Option>
            <AntdSelect.Option value="4">57600</AntdSelect.Option>
            <AntdSelect.Option value="5">115200</AntdSelect.Option>
            <AntdSelect.Option value="8">ویژه کنترلر مرکزی</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="automaticTransfer"
            label="ارسال اتوماتیک"
            defaultValue="0"
            component={Select}
          >
            <AntdSelect.Option value="0">عدم ثبت و ارسال ورود و خروج‌های آفلاین</AntdSelect.Option>
            <AntdSelect.Option value="1">ثبت و ارسال ورود و خروج‌های آفلاین</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8} xl={4}>
          <Field
            name="language"
            label="زبان دستگاه"
            defaultValue="0"
            component={Select}
          >
            <AntdSelect.Option value="0">فارسی</AntdSelect.Option>
            <AntdSelect.Option value="1">English</AntdSelect.Option>
            <AntdSelect.Option value="2">کردی</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8} xl={4}>
          <Field
            name="transferType"
            label="روش ارتباط دستگاه"
            defaultValue="2"
            component={Select}
          >
            <AntdSelect.Option value="0">RS232</AntdSelect.Option>
            <AntdSelect.Option value="1">RS485/486</AntdSelect.Option>
            <AntdSelect.Option value="2">TCP-IP</AntdSelect.Option>
            <AntdSelect.Option value="3">Wireless</AntdSelect.Option>
            <AntdSelect.Option value="4">WiFi</AntdSelect.Option>
            <AntdSelect.Option value="5">Modem</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="deviceControl"
            label="نوع کنترل دستگاه"
            defaultValue="4"
            component={Select}
          >
            <AntdSelect.Option value="1">فقط کارت</AntdSelect.Option>
            <AntdSelect.Option value="2">کارت و اثر انگشت</AntdSelect.Option>
            <AntdSelect.Option value="3">فقط اثر انگشت</AntdSelect.Option>
            <AntdSelect.Option value="4">کارت یا اثر انگشت</AntdSelect.Option>
            <AntdSelect.Option value="5">کد و رمز</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8} xl={4}>
          <Field
            name="sensorType"
            label="نوع سنسور"
            defaultValue="1"
            component={Select}
          >
            <AntdSelect.Option value="1">سبز</AntdSelect.Option>
            <AntdSelect.Option value="2">آبی</AntdSelect.Option>
            <AntdSelect.Option value="3">قرمز</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8} xl={4}>
          <Field
            name="deviceFunctionality"
            label="کاربری دستگاه"
            defaultValue="1"
            component={Select}
          >
            <AntdSelect.Option value="1">کارمندی</AntdSelect.Option>
            <AntdSelect.Option value="2">اعلام حضور</AntdSelect.Option>
            <AntdSelect.Option value="3">ثبت فقط ورود</AntdSelect.Option>
            <AntdSelect.Option value="4">ثبت فقط خروج</AntdSelect.Option>
          </Field>
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="voice"
            label="صدای دستگاه"
            component={Toggle}
          />
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="showPresent"
            label="نمایش تعداد حاضرین در دستگاه"
            component={Toggle}
          />
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="foodKey"
            label="در زمان تحویل غذا نیاز به زدن دکمه F3 نباشد"
            component={Toggle}
          />
        </Col>

        <Col>
          <Button.Group style={{width: '100%'}}>
            <Button
              type="danger"
              style={{width: '50%'}}
              size="large"
              onClick={() => this._setAllButtons('0')}
            >غیر فعال کردن همه دکمه‌ها</Button>
            <Button
              type="primary"
              style={{width: '50%'}}
              size="large"
              onClick={() => this._setAllButtons('1')}
            >فعال کردن همه دکمه‌ها</Button>
          </Button.Group>
        </Col>

        <Col style={styles.marginTop16}>

          <Row
            gutter={16}
          >

            <Col md={6}>

              <Row
                gutter={16}
              >

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyF1')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyF1'),
                    }}
                  >F1</Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyF2')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyF2'),
                    }}
                  >F2</Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyF3')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyF3'),
                    }}
                  >F3</Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyF4')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyF4'),
                    }}
                  >F4 <MaterialIcon name="content-save"/></Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyF5')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyF5'),
                    }}
                  >F5 <MaterialIcon name="file-document"/></Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyF6')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyF6'),
                    }}
                  >F6 Shift</Button>
                </Col>

              </Row>

            </Col>

            <Col md={12}>

              <Row
                gutter={16}
              >

                <Col style={styles.marginTop8} md={8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyC')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyC'),
                    }}
                  ><MaterialIcon name="briefcase"/> شهری</Button>
                </Col>

                <Col style={styles.marginTop8} md={8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyB')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyB'),
                    }}
                  ><MaterialIcon name="airplane"/> ماموریت</Button>
                </Col>

                <Col style={styles.marginTop8} md={8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyA')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyA'),
                    }}
                  ><MaterialIcon name="seat-recline-extra"/> مرخصی</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key1')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key1'),
                    }}
                  >1</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key2')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key2'),
                    }}
                  >2</Button>
                </Col>

                <Col style={styles.marginTop8} md={4}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key3')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key3'),
                    }}
                  >3</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key4')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key4'),
                    }}
                  >4</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key5')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key5'),
                    }}
                  >5</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key6')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key6'),
                    }}
                  >6</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key7')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key7'),
                    }}
                  >7</Button>
                </Col>

                <Col style={styles.marginTop8} md={4}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key8')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key8'),
                    }}
                  >8</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key9')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key9'),
                    }}
                  >9</Button>
                </Col>

                <Col style={styles.marginTop8} md={5}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('key0')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('key0'),
                    }}
                  >0</Button>
                </Col>

              </Row>

            </Col>

            <Col md={6}>

              <Row
                gutter={16}
              >

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyMenu')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyMenu'),
                    }}
                  >Menu</Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyUp')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyUp'),
                    }}
                  ><MaterialIcon name="menu-up"/></Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyDown')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyDown'),
                    }}
                  ><MaterialIcon name="menu-down"/></Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyOk')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyOk'),
                    }}
                  ><MaterialIcon name="check"/></Button>
                </Col>

                <Col style={styles.marginTop8}>
                  <Button
                    size="large"
                    onClick={() => this._setButton('keyCancel')}
                    style={{
                      width: '100%',
                      color: this._getButtonColor('keyCancel'),
                    }}
                  ><MaterialIcon name="close"/></Button>
                </Col>

              </Row>

            </Col>

          </Row>

        </Col>

      </Row>
    );
  }
}
