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
      setting: {},
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
      _setting.name = setting.name;
      _setting.description = setting.description;
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
                disabled={!(!error.name )}
                onClick={() => {
                  if (!error.name ) {
                    if (setting.name) {
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
          </Row>
        </Card>

      </Spin>
    );
  }
}
