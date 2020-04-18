import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import PositionsList from 'routes/Home/Requests/Procedure/Form/Applicants';
import TreeView from 'components/common/TreeView';
import {indexQuestionnaire, emptyQuestionnaire} from './../../../Period/Module';

@connect((state) => ({
  questionnaires: state.Evaluation360.Period.questionnaires,
  questionnairesMeta: state.Evaluation360.Period.questionnairesMeta,
}), {
  indexQuestionnaire,
  emptyQuestionnaire,
})

@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    period: PropTypes.object,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    indexQuestionnaire: PropTypes.func,
    emptyQuestionnaire: PropTypes.func,
    questionnaires: PropTypes.arrayOf(PropTypes.object),
    positionsSelected: PropTypes.array,
    questionnairesSelected: PropTypes.array,
  };

  static defaultProps = {
    period: {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      error: [],
      questionnaires: props.questionnairesSelected ? props.questionnairesSelected : props.questionnaires && props.questionnaires[0] && props.questionnaires[0].id ? props.questionnaires.pluck('id', (item) => item.toString()) : [],
      positions: props.positionsSelected,
    };
  }

  /**
   *
   */
  componentDidMount() {
    let periodId = this.props.period && this.props.period.id;
    this.props.indexQuestionnaire(periodId);
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.period, this.props.period)) {
      let periodId = np.period && np.period.id;
      np.indexQuestionnaire(periodId);
    }
    if (!app._.isEqual(np.questionnaires, this.props.questionnaires)) {
      this.setState({
        questionnaires: np.questionnairesSelected ? np.questionnairesSelected : np.questionnaires && np.questionnaires[0] && np.questionnaires[0].id ? np.questionnaires.pluck('id', (item) => item.toString()) : [],
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.emptyQuestionnaire();
  }


  /**
   *
   * @private
   */
  _submit() {

  }

  /**
   *permissions
   * @return {Array}
   * @private
   */
  _renderTreeData() {
    const questionnaires = this.props.questionnaires ? this.props.questionnaires : [];
    let items = [];

    questionnaires.map((questionnaire) => {
      items.push({id: questionnaire.id, title: questionnaire.title, children: []});
    });

    return items;
  }

  _onCheckTree(selected) {
    const {error} = this.state;
    this.setState({
      questionnaires: selected,
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
    const {error, positions} = this.state;
    const _questionnaires = this.state.questionnaires;
    const {onCancel, onSubmit, questionnaires} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={false}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.evaluation-360.Period Form')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                onClick={onCancel}
                disabled={false}
              >
                {app.translate('main.Cancel')}
              </Button>
            </Button.Group>
          }
        >
          <Row
            gutter={16}
            style={{
              height: 'calc(100% - 40px)',
              margin: 0,
            }}
          >
            <Col
              sm={24}
            >
              <div className="report-form-item">
                <PositionsList
                  componentName={'Report'}
                  title={<span><span className="required">*</span>{app.translate('routes.home.basic.organization-chart.Positions')}</span>}
                  ref={(input) => this.positionsList = input && input.getWrappedInstance()}
                  onChange={(value) => this.setState({positions: value})}
                  selected={positions || []}
                />
              </div>
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
                  defaultCheckedKeys={_questionnaires ? _questionnaires : questionnaires && questionnaires[0] ? questionnaires[0].id ? questionnaires.pluck('id', (item) => item.toString()) : [] : []}
                  checkAllButton={true}
                  treeStyle={{height: 'calc(100% - 40px)'}}
                  ref={(input) => this.treeView = input}
                  visible={true}
                />
              </AntdForm.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            onClick={() => {
              if (app._.isEmpty(positions) || app._.isEmpty(_questionnaires)) {
                app.message(app.translate('routes.home.evaluation-360.report.error', 'error'), 'error');
              } else {
                onSubmit({
                  positions: positions,
                  questionnaires: _questionnaires,
                });
              }
            }
            }
            disabled={(app._.isEmpty(positions) || app._.isEmpty(_questionnaires))}
          >
            {app.translate('main.Get Report')}
          </Button>
        </Card>

      </Spin>
    );
  }
}
