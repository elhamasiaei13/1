import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, Card, Button} from 'antd';
import Field from 'components/common/Field';
import Spin from 'components/common/Spin';
import {Text, TextArea, RadioGroup, Date, Select, Avatar, Number} from 'components/form';
import form from 'services/decorators/form';
import {updatePoints, storePoints, indexUserLevels, indexRates, indexPoints} from '../../QuestionCategory/Module';
import regex from 'services/regex';
import uuidv1 from 'uuid/v1';
import store from 'store';

@authorize
@form({
  name: 'evaluation-360-setting-factors-form',
  disabled: (props) => !props.can('Point@update'),
  onSubmit: (value, props, dispatch, callback) => {
    let _new = Object.keys(value);
    let rateId = parseInt(_new[0].split('_')[1]);
    let userLevelId = parseInt(_new[0].split('_')[2]);

    let index = null;
    let questionCategoryId = props.questionCategory ? props.questionCategory.id : 0;
    let points = store.getState().Evaluation360.Question.QuestionCategory.points;
    if (points) {
      index = points.find((item) => {
        return item.rateId === rateId && item.userLevelId === userLevelId;
      });
    }
    let questionnaireId = props.item ? props.item.id : 0;
    if (questionnaireId > 0 && rateId > 0 && userLevelId > 0 && questionCategoryId > 0) {
      let score = parseFloat(app.transform.digit(value[_new[0]]));
      if (index && index.id) {
        dispatch(updatePoints(index.id, {score: score}, callback));
      } else {
        dispatch(storePoints({questionnaireId, questionCategoryId, rateId, userLevelId, score: score}, callback));
      }
    }
  },
})
@connect((state) => ({
  userLevels: state.Evaluation360.Question.QuestionCategory.userLevels,
  rates: state.Evaluation360.Question.QuestionCategory.rates,
  points: state.Evaluation360.Question.QuestionCategory.points,
}), {
  indexUserLevels,
  indexRates,
  indexPoints,
})
@autobind
/**
 *
 */
export default class Factor extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
    updatePoints: PropTypes.func,
    storePoints: PropTypes.func,
    initialize: PropTypes.func,
    indexUserLevels: PropTypes.func,
    indexRates: PropTypes.func,
    indexPoints: PropTypes.func,
    onCancel: PropTypes.func,
    item: PropTypes.object,
    questionCategory: PropTypes.object,
    userLevels: PropTypes.array,
    rates: PropTypes.array,
    points: PropTypes.array,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      loading: false,
    };
    // if (props.item && props.item.points) {
    //   props.initialize(
    //     this._CreateRate(props.item.points),
    //   );
    // }
  }

  /**
   *
   */
  componentDidMount() {
    const {indexUserLevels, indexRates, indexPoints, item, questionCategory} = this.props;

    this.setState({loading: true}, () => {
      indexUserLevels();
      indexRates();
      indexPoints({
        filterGroups: [
          {
            filters: [
              {
                key: 'questionnaire_id',
                value: item ? item.id : 0,
                operator: 'eq',
              },
              {
                key: 'question_category_id',
                value: questionCategory ? questionCategory.id : 0,
                operator: 'eq',
              },
            ],
          },
        ],
      }, () => {
        this.setState({loading: false});
      });
    });

  }


  /**
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {

    if (!app._.isEqual(this.props.item, nextProps.item) || !app._.isEqual(this.props.questionCategory, nextProps.questionCategory)) {

      this.setState({loading: true}, () => {
        nextProps.indexPoints({
          filterGroups: [
            {
              filters: [
                {
                  key: 'questionnaire_id',
                  value: nextProps.item ? nextProps.item.id : 0,
                  operator: 'eq',
                },
                {
                  key: 'question_category_id',
                  value: nextProps.questionCategory ? nextProps.questionCategory.id : 0,
                  operator: 'eq',
                },
              ],
            },
          ],
        }, () => {
          this.setState({loading: false});
        });
      });
    }

    if (!app._.isEqual(this.props.points, nextProps.points)) {
      nextProps.initialize(
        this._CreateRate(nextProps.points),
      );
    }
  }

  _CreateRate(_points) {
    let points = {};
    let key = '';
    _points.map((point) => {
      key = `rate_${point.rateId}_${point.userLevelId}`;
      points[key] = `${point.score}`;
    });
    return points;
  }

  _renderItems(c1 = 4, c2 = 5) {
    const {userLevels, rates} = this.props;
    let items = [];
    if (userLevels && rates) {
      for (let i = 0; i < rates.length; i++) {
        let _row = [];
        let _head = [];
        for (let j = 0; j < userLevels.length; j++) {
          if (i === 0) {
            _head.push(
              <Col
                sm={c2}
                key={uuidv1()}>{app.translate(`routes.home.evaluation-360.${userLevels[j].title}`, `${userLevels[j].title}`)}</Col>);
          }
          if (j === 0) {
            _row.push(<Col sm={c1} key={uuidv1()}>{app.translate(`routes.home.evaluation-360.${rates[i].title}`, `${rates[i].title}`)}</Col>);
          }
          _row.push(<Col sm={c2} key={uuidv1()}>
            <Field
              name={`rate_${rates[i].id}_${userLevels[j].id}`}
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>);
        }
        if (i === 0) {
          items.push(<Row key={uuidv1()} style={{
            height: '40px',
          }}><Col sm={c1}>{app.translate('routes.home.evaluation-360.range')}</Col>{_head}</Row>);
        }
        items.push(<Row key={uuidv1()}>{_row}</Row>);
      }
    }

    return items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancel, item, questionCategory} = this.props;
    const {loading} = this.state;
    return (
      <Card
        title={`${app.translate('routes.home.evaluation-360.question factor')} ${item.title} ${app.translate('routes.home.evaluation-360.Question QuestionCategory')} ${questionCategory.title}`}
        style={{
          height: '100%',
        }}
        extra={
          <Button.Group>
            <Button
              type="danger"
              onClick={onCancel}
            >
              {app.translate('main.Cancel')}
            </Button>
          </Button.Group>
        }
      >
        <Spin
          spinning={loading}
        >
          {this._renderItems(4, 5)}
        </Spin>
      </Card>
    );
  }
}
