import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import Field from 'components/common/Field';
import {Card, Row, Col, Form as AntdForm, Input, Radio, Select, Button} from 'antd';
import {connect} from 'react-redux';
import {checkFile} from './Module';
import config from 'config/api';

@connect((state) => ({
  payroll: state.Payroll.payroll,
  currentUser: state.Auth.currentUser,
}), {
  checkFile,
})
@autobind
/**
 *
 */
export default class Payroll extends React.PureComponent {
  static propTypes = {
    checkFile: PropTypes.func,
    payroll: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      year: jMoment(jMoment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').format('jYYYY'),
      month: '01',
      openUrl: false,
      loading: false,
      link: '',
    };
  }

  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.payroll, this.props.payroll)) {
      // console.log(np.payroll);
    }
  }


  _onChangeYear(e) {
    this.setState({year: e.target.value});
  }


  /**
   *
   * @private
   */
  _Get() {
    const {checkFile} = this.props;
    const {year, month} = this.state;
    if (year > 1390) {
      this.setState({loading: true, link: ''}, () => {
        // let that = this;
        //
        // let sendInfo = {'props': {'year': `${year}`, 'month': `${month}`}};
        //
        // $.ajax({
        //   beforeSend: function (xhrObj) {
        //     let accessToken = app.local.read('access-token');
        //     // xhrObj.setRequestHeader('Content-Type', 'application/json');
        //     xhrObj.setRequestHeader('Accept', 'application/json');
        //     xhrObj.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        //   },
        //   type: 'POST',
        //   dataType: 'json',
        //   url: `${config.protocol}://${config.url}/financial/payroll/get_file`,
        //   data: sendInfo,
        //   success: function (response) {
        //     that.setState({loading: false});
        //   },
        //   error: function (jqXHR, textStatus, errorThrown) {
        //     if (errorThrown !== '') {
        //       app.message(app.translate('routes.home.payroll.error data'), 'error');
        //     }
        //     that.setState({loading: false});
        //   },
        // });
        checkFile({year, month}, {}, (err, data) => {
          if (err) {
            this.setState({link: ''});
            app.message(app.translate('routes.home.payroll.error data'), 'error');
          } else {
            this.setState({link: data.data.url});
          }
          this.setState({loading: false});
        });
      });
    } else {
      app.message(app.translate('routes.home.payroll.error year'), 'error');
    }
  }

  _onChangeMonth(value) {
    this.setState({month: value});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    let disabled = !(this.props.currentUser && this.props.currentUser.taInfo && this.props.currentUser.taInfo.identificationCode );
    const {loading} = this.state;
    return (
      <Card
        className="wrapper"
        style={{
          width: 'calc(100% - 16px)',
          margin: '0 8px',
        }}
        title={app.translate('routes.home.payroll.Payroll')}
        extra={[
          <Button
            loading={loading}
            key='btn'
            type='primary'
            disabled={disabled || loading}
            onClick={() => this._Get()}>{app.translate('main.Check')}</Button>,
        ]}
      >

        <Row
          gutter={16}
          style={{
            margin: 0,
            marginBottom: 16,
            height: 'calc(100% - 20px)',
          }}
        >
          <Col sm={12}>
            <AntdForm.Item
              disabled={disabled}
              label={app.translate(`routes.home.payroll.year`)}
            >
              <Input
                disabled={disabled}
                type='number'
                onChange={(e) => this._onChangeYear(e)}
                min={1390}
                value={this.state.year}
              />
            </AntdForm.Item>
          </Col>
          <Col sm={12}>
            <AntdForm.Item
              label={app.translate(`routes.home.payroll.month`)}
              disabled={disabled}
            >
              <Select style={{width: '100%'}}
                      disabled={disabled}
                      value={this.state.month}
                      onChange={(value) => this._onChangeMonth(value)}>
                <Select.Option value={`01`}>{app.translate('routes.home.payroll.Farvardin')}</Select.Option>
                <Select.Option value={`02`}>{app.translate('routes.home.payroll.Ordibehesht')}</Select.Option>
                <Select.Option value={`03`}>{app.translate('routes.home.payroll.Khordad')}</Select.Option>
                <Select.Option value={`04`}>{app.translate('routes.home.payroll.Tir')}</Select.Option>
                <Select.Option value={`05`}>{app.translate('routes.home.payroll.Mordad')}</Select.Option>
                <Select.Option value={`06`}>{app.translate('routes.home.payroll.Shahrivar')}</Select.Option>
                <Select.Option value={`07`}>{app.translate('routes.home.payroll.Mehr')}</Select.Option>
                <Select.Option value={`08`}>{app.translate('routes.home.payroll.Aban')}</Select.Option>
                <Select.Option value={`09`}>{app.translate('routes.home.payroll.Azar')}</Select.Option>
                <Select.Option value={`10`}>{app.translate('routes.home.payroll.Dey')}</Select.Option>
                <Select.Option value={`11`}>{app.translate('routes.home.payroll.Bahman')}</Select.Option>
                <Select.Option value={`12`}>{app.translate('routes.home.payroll.Esfand')}</Select.Option>
              </Select>
            </AntdForm.Item>
          </Col>
          {
            this.state.link !== '' &&
            <Col sm={24} className={'download'}>
              <a href={this.state.link} target="_blank">{app.translate('routes.home.payroll.download')}</a>
            </Col>
          }

        </Row>
      </Card>
    );
  }
}
