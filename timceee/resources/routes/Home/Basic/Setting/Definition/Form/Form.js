import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {show, emptySetting, store, update} from './../Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  setting: state.Basic.Setting.Definition.setting,
}), {
  show,
  emptySetting,
  store,
  update,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.func,
    emptySetting: PropTypes.func,
    item: PropTypes.object,
    setting: PropTypes.object,
    store: PropTypes.func,
    update: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      setting: {
        values: {
          incompleteCloaking: 'remove',
        },
      },
      statuses: [],
      showAddForm: false,
      error: {},
      receiving: true,
      loading: false,
      saving: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {show, item} = this.props;

    if (item) {
      show(item.id, {}, () => {
        this.setState({
          receiving: false,
        });
      });
    } else {
      this.setState({
        receiving: false,
      });
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.item, this.props.item)) {
      this.setState({
        receiving: true,
      }, () => {
        if (np.item) {
          np.show(np.item.id, {}, () => {
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
    if (!app._.isEqual(np.setting, this.state.setting)) {
      this.setState({
        setting: np.setting,
        error: {
          name: !(np.setting && np.setting.name),
          dayLength: !(np.setting && np.setting.values && np.setting.values.dayLength ),
          incompleteCloaking: !(np.setting && np.setting.values && np.setting.values.incompleteCloaking ),
        },
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptySetting} = this.props;

    emptySetting();
  }


  /**
   *
   * @private
   */
  _submit() {
    const {setting} = this.state;
    const {store, update, onCancel} = this.props;

    this.setState({
      saving: true,
    }, () => {
      let _setting = {};
      let _incompleteCloaking = setting.values && setting.values.incompleteCloaking ? setting.values.incompleteCloaking : 'remove';
      let _dayLength = setting.values && setting.values.dayLength ? setting.values.dayLength : '';
      let _splitDayLength = _dayLength.split(':');
      _dayLength = '';
      for (let i = 0; i < 2; i++) {
        if (_splitDayLength[i]) {
          _dayLength += (parseInt(_splitDayLength[i]) > 9 ? _splitDayLength[i] : '0' + parseInt(_splitDayLength[i]));
        } else {
          _dayLength += '00';
        }
        _dayLength += ':';
      }
      _dayLength = _dayLength.substr(0, _dayLength.length - 1);
      _setting.name = setting.name;
      _setting.description = setting.description;
      _setting.values = {
        day_length: _dayLength,
        incomplete_cloaking: _incompleteCloaking,
      };
      if (setting.id) {
        update(setting.id, _setting, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      } else {
        store(_setting, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      }
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, setting, statuses, events, showAddForm, error} = this.state;
    const {onCancel} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.basic.setting.Setting Form')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                onClick={onCancel}
                disabled={saving}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button
                type="primary"
                loading={saving}
                disabled={!(!error.name && !error.dayLength)}
                onClick={() => {
                  if (!error.name && !error.dayLength) {
                    if (setting.name && setting.values && setting.values.dayLength) {
                      this._submit();
                    } else {
                      if (!setting.name) {
                        this.setState((state) => ({
                          error: {
                            ...state.error,
                            name: true,
                          },
                        }));
                      }
                      if (!(setting.values && setting.values.dayLength)) {
                        this.setState((state) => ({
                          error: {
                            ...state.error,
                            dayLength: true,
                          },
                        }));
                      }
                      if (!(setting.values && setting.values.incompleteCloaking)) {
                        this.setState((state) => ({
                          error: {
                            ...state.error,
                            incompleteCloaking: true,
                          },
                        }));
                      }
                    }
                  }
                }}
              >
                {app.translate('main.Submit')}
              </Button>
            </Button.Group>
          }
        >
          <Row
            gutter={16}
            style={{
              height: '100%',
              margin: 0,
            }}
          >
            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.basic.setting.Name')}
                help={error.name && app.translate('main.This field is required')}
                validateStatus={error.name ? 'error' : ''}
                required
                hasFeedback
              >
                <Input
                  type="text"
                  prefix={<MaterialIcon name="alphabetical"/>}
                  value={setting.name}
                  onChange={(event) => this.setState({
                    setting: {
                      ...setting,
                      name: event.target.value,
                    },
                    error: {
                      ...error,
                      name: event.target.value === '',
                    },
                  })}
                  onBlur={() => this.setState((state) => ({
                    error: {
                      ...state.error,
                      name: setting.name === '' || !setting.name,
                    },
                  }))}
                />
              </AntdForm.Item>
            </Col>

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.basic.setting.Description')}
              >
                <Input.TextArea
                  value={setting.description}
                  onChange={(event) => this.setState({
                    setting: {
                      ...setting,
                      description: event.target.value,
                    },
                  })}
                  style={{
                    maxHeight: 46,
                  }}
                />
              </AntdForm.Item>
            </Col>

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.basic.setting.dayLength', 'day Length')}
                help={error.dayLength && app.translate('main.This field is required')}
                validateStatus={error.dayLength ? 'error' : ''}
                required
                hasFeedback
              >
                {
                  <TimePicker
                    max={false}
                    value={setting.values && setting.values.dayLength ? setting.values.dayLength : ''}
                    onChange={(event) => this.setState({
                      setting: {
                        ...setting,
                        values: Object.assign({}, (this.state.setting && this.state.setting.values ? this.state.setting.values : {} ), {dayLength: event}), // event.target.value
                      },
                      error: {
                        ...error,
                        dayLength: event === '', // event.target.value
                      },
                    })}
                    onBlur={() => this.setState((state) => ({
                      error: {
                        ...state.error,
                        dayLength: (setting.values && setting.values.dayLength && setting.values.dayLength === '') || !setting.values || !setting.values.dayLength,
                      },
                    }))}
                  />
                }
                {/*
                <TimeInput
                  format="n:i"
                  min="00:00"
                  max="99:59"
                  value={setting.values && setting.values.dayLength ? setting.values.dayLength : ''}
                  onChange={(event) => this.setState({
                    setting: {
                      ...setting,
                      values: Object.assign({}, (this.state.setting && this.state.setting.values ? this.state.setting.values : {} ), {dayLength: event.target.value}),
                    },
                    error: {
                      ...error,
                      dayLength: event.target.value === '',
                    },
                  })}
                  onBlur={() => this.setState((state) => ({
                    error: {
                      ...state.error,
                      dayLength: (setting.values && setting.values.dayLength && setting.values.dayLength === '') || !setting.values || !setting.values.dayLength,
                    },
                  }))}
                />
                 */}
              </AntdForm.Item>
            </Col>

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.basic.setting.incompleteCloaking', 'incomplete Cloaking')}
                help={error.incompleteCloaking && app.translate('main.This field is required')}
                validateStatus={error.incompleteCloaking ? 'error' : ''}
                required
                hasFeedback
              >
                {
                  <Select
                    value={setting.values && setting.values.incompleteCloaking ? setting.values.incompleteCloaking : 'remove'}
                    onChange={(event) => this.setState({
                      setting: {
                        ...setting,
                        values: Object.assign({}, (this.state.setting && this.state.setting.values ? this.state.setting.values : {} ), {incompleteCloaking: event}), // event.target.value
                      },
                      error: {
                        ...error,
                        incompleteCloaking: event === '', // event.target.value
                      },
                    })}
                    onBlur={() => this.setState((state) => ({
                      error: {
                        ...state.error,
                        incompleteCloaking: (setting.values && setting.values.incompleteCloaking && setting.values.incompleteCloaking === '') || !setting.values || !setting.values.incompleteCloaking,
                      },
                    }))}
                  >
                    <Select.Option value="short_period">{app.translate('routes.home.basic.setting.short_period', 'short_period')}</Select.Option>
                    <Select.Option value="long_period">{app.translate('routes.home.basic.setting.long_period', 'long_period')}</Select.Option>
                    <Select.Option value="remove">{app.translate('routes.home.basic.setting.absence', 'absence')}</Select.Option>
                  </Select>
                }
              </AntdForm.Item>
            </Col>
          </Row>
        </Card>

      </Spin>
    );
  }
}
