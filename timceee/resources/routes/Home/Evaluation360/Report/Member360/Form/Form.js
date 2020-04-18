import React from 'react';
import Spin from 'components/common/Spin';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import PositionsList from 'routes/Home/Requests/Procedure/Form/Applicants';
import uuidv1 from 'uuid/v1';
import {index} from '../../../Question/Questionnaire/Module';

@autobind
@connect((state) => ({
  questionnaires: state.Evaluation360.Question.Questionnaire.questionnaires,
}), {
  index,
})
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    index: PropTypes.func,
    positionsSelected: PropTypes.array,
    questionnaires: PropTypes.arrayOf(PropTypes.object),
    questionnaire: PropTypes.string,
  };

  static defaultProps = {};

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      error: [],
      positions: props.positionsSelected,
      questionnaire: props.questionnaire ? props.questionnaire : '',
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {index} = this.props;
    index();
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
  }

  _renderQuestionnaire() {
    let items = [];
    const {questionnaires} = this.props;

    if (questionnaires) {
      questionnaires.map((item) => {
        items.push(<Select.Option
          key={uuidv1()}
          value={`${item.id}`}>{item.title}</Select.Option>);
      });
    }

    return items;
  }

  /**
   *
   * @private
   */
  _submit() {

  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {error, questionnaire, positions} = this.state;
    const {onCancel, onSubmit} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={false}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.evaluation-360.Member360')}
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
                <span style={{color: 'red'}}>*</span>
                {app.translate('routes.home.evaluation-360.Question Questionnaire')} :
                <Select
                  onChange={(questionnaire) => {
                    this.setState({questionnaire});
                  }}
                  style={{
                    width: '100%',
                  }}
                  value={questionnaire}
                >
                  {this._renderQuestionnaire()}
                </Select>
              </div>
            </Col>
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
          </Row>
          <Button
            type="primary"
            onClick={() => {
              if (app._.isEmpty(positions)) {
                app.message(app.translate('routes.home.evaluation-360.report.error', 'error'), 'error');
              } else {
                onSubmit({
                  questionnaire: questionnaire,
                  positions: positions,
                });
              }
            }
            }
            disabled={(app._.isEmpty(positions) || questionnaire === '')}
          >
            {app.translate('main.Get Report')}
          </Button>
        </Card>

      </Spin>
    );
  }
}
