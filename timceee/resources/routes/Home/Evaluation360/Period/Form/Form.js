import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {show, emptyPeriod, store, update} from './../Module';
import {index as indexQuestionnaires} from './../../Question/Questionnaire/Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';
import TreeView from 'components/common/TreeView';
import DatePicker from 'components/common/DatePicker';
import Toggle from 'components/common/Toggle';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  period: state.Evaluation360.Period.period,
  questionnaires: state.Evaluation360.Question.Questionnaire.questionnaires,
}), {
  show,
  emptyPeriod,
  store,
  update,
  indexQuestionnaires,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.func,
    indexQuestionnaires: PropTypes.func,
    emptyPeriod: PropTypes.func,
    item: PropTypes.object,
    period: PropTypes.object,
    questionnaires: PropTypes.arrayOf(PropTypes.object),
    store: PropTypes.func,
    update: PropTypes.func,
  };

  static defaultProps = {
    questionnaires: [],
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      period: {},
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
    const {show, indexQuestionnaires, item} = this.props;

    indexQuestionnaires({}, () => {
      if (item) {
        show(item.id, {
          includes: ['questionnaires'],
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
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.item, this.props.item)) {
      this.setState({
        receiving: true,
      }, () => {
        np.indexQuestionnaires({}, () => {
          if (np.item) {
            np.show(np.item.id, {
              includes: ['questionnaires'],
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
      });
    }
    if (!app._.isEqual(np.period, this.state.period)) {
      this.setState({
        period: np.period,
        error: {
          title: !(np.period && np.period.title),
          dateFrom: !(np.period && np.period.dateFrom),
          dateTo: !(np.period && np.period.dateTo),
          enable: !(np.period && np.period.enable),
          questionnaires: !(np.period && np.period.questionnaires),
        },
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyPeriod} = this.props;

    emptyPeriod();
  }


  /**
   *
   * @private
   */
  _submit() {
    const {period} = this.state;
    const {store, update, onCancel} = this.props;
    this.setState({
      saving: true,
    }, () => {
      let _period = {};
      _period.title = period.title;
      _period.dateFrom = period.dateFrom;
      _period.dateTo = period.dateTo;
      _period.enable = period.enable ? 1 : 0;
      _period.questionnaires = period.questionnaires && period.questionnaires[0] ? period.questionnaires[0].id ? period.questionnaires.pluck('id') : period.questionnaires : [];
      if (period.id) {
        update(period.id, _period, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      } else {
        store(_period, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      }
    });
  }

  /**
   *permissions
   * @return {Array}
   * @private
   */
  _renderTreeData() {
    const questionnaires = this.props.questionnaires;
    let items = [];

    questionnaires.map((questionnaire) => {
      items.push({id: questionnaire.id, title: questionnaire.title, children: []});
    });

    return items;
  }

  _onCheckTree(selected) {
    const {period, error} = this.state;
    this.setState({
      period: {
        ...period,
        questionnaires: selected,
      },
      error: {
        ...error,
        questionnaires: selected === '',
      },
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, period, statuses, events, showAddForm, error} = this.state;
    const {onCancel} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.evaluation-360.Period Form')}
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
                disabled={!(!error.title)}
                onClick={() => {
                  if (!error.title) {
                    if (period.title) {
                      this._submit();
                    } else {
                      if (!period.title) {
                        this.setState((state) => ({
                          error: {
                            ...state.error,
                            title: true,
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
                label={app.translate('routes.home.evaluation-360.Period Title')}
                help={error.title && app.translate('main.This field is required')}
                validateStatus={error.title ? 'error' : ''}
                required
                hasFeedback
              >
                <Input
                  type="text"
                  prefix={<MaterialIcon name="alphabetical"/>}
                  value={period.title}
                  onChange={(event) => this.setState({
                    period: {
                      ...period,
                      title: event.target.value,
                    },
                    error: {
                      ...error,
                      title: event.target.value === '',
                    },
                  })}
                  onBlur={() => this.setState((state) => ({
                    error: {
                      ...state.error,
                      title: period.title === '' || !period.title,
                    },
                  }))}
                />
              </AntdForm.Item>
            </Col>

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.evaluation-360.Period dateFrom')}
                help={error.dateFrom && app.translate('main.This field is required')}
                validateStatus={error.dateFrom ? 'error' : ''}
                required
                hasFeedback
              >
                <DatePicker
                  onChange={(value) => this.setState({
                    period: {
                      ...period,
                      dateFrom: value,
                    },
                    error: {
                      ...error,
                      dateFrom: value === '',
                    },
                  })}
                  value={period.dateFrom !== '0000-00-00' && period.dateFrom !== '' ? period.dateFrom : jMoment().format('YYYY-MM-DD')}
                />
              </AntdForm.Item>
            </Col>

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.evaluation-360.Period dateTo')}
                help={error.dateTo && app.translate('main.This field is required')}
                validateStatus={error.dateTo ? 'error' : ''}
                required
                hasFeedback
              >
                <DatePicker
                  onChange={(value) => this.setState({
                    period: {
                      ...period,
                      dateTo: value,
                    },
                    error: {
                      ...error,
                      dateTo: value === '',
                    },
                  })}
                  value={period.dateTo !== '0000-00-00' && period.dateTo !== '' ? period.dateTo : jMoment().format('YYYY-MM-DD')}
                />
              </AntdForm.Item>
            </Col>

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.evaluation-360.Period enable')}
                hasFeedback
              >
                <Toggle
                  checked={period.enable === 1}
                  onChange={(value) => this.setState({
                    period: {
                      ...period,
                      enable: value,
                    },
                  })}
                />
              </AntdForm.Item>
            </Col>
            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.evaluation-360.Questions')}
                help={error.title && app.translate('main.This field is required')}
                validateStatus={error.questionnaires ? 'error' : ''}
                required
                hasFeedback
              >

                <TreeView
                  checkable
                  title={undefined}
                  showSearch={false}
                  onCheck={this._onCheckTree}
                  treeData={this._renderTreeData()}
                  defaultCheckedKeys={period.questionnaires && period.questionnaires[0] ? period.questionnaires[0].id ? period.questionnaires.pluck('id', (item) => item.toString()) : period.questionnaires : []}
                  checkAllButton={true}
                  treeStyle={{height: 'calc(100% - 40px)'}}
                  ref={(input) => this.treeView = input}
                  visible={!receiving}
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </Card>

      </Spin>
    );
  }
}
