import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, Card, Button} from 'antd';
import Field from 'components/common/Field';
import {Text, TextArea, RadioGroup, Date, Select, Avatar, Number} from 'components/form';
import form from 'services/decorators/form';
import {updatePoints, storePoints, indexUserLevels, indexRates} from '../Module';
import regex from 'services/regex';
import uuidv1 from 'uuid/v1';

@authorize
@form({
  name: 'evaluation-360-factors-form',
  disabled: (props) => !props.can('Point@update'),
  onSubmit: (value, props, dispatch, callback) => {
    let _new = Object.keys(value);
    let rateId = parseInt(_new[0].split('_')[1]);
    let userLevelId = parseInt(_new[0].split('_')[2]);

    let index = null;
    if (props.item && props.item.points) {
      index = props.item.points.find((item) => {
        return item.rateId === rateId && item.userLevelId === userLevelId;
      });
    }
    let questionCategoryId = props.item ? props.item.id : 0;
    if (questionCategoryId > 0 && rateId > 0 && userLevelId > 0) {
      let score = parseFloat(app.transform.digit(value[_new[0]]));
      if (index) {
        dispatch(updatePoints(index.id, {score: score}, callback));
      } else {
        dispatch(storePoints({questionCategoryId, rateId, userLevelId, score: score}, callback));
      }
    }
  },
})
@connect((state) => ({
  userLevels: state.Evaluation360.Question.QuestionCategory.userLevels,
  rates: state.Evaluation360.Question.QuestionCategory.rates,
}), {
  indexUserLevels,
  indexRates,
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
    item: PropTypes.object,
    userLevels: PropTypes.array,
    rates: PropTypes.array,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      status: null,
    };
    if (props.item && props.item.points) {
      props.initialize(
        this._CreateRate(props.item.points),
      );
    }
  }

  /**
   *
   */
  componentDidMount() {
    const {indexUserLevels, indexRates} = this.props;

    indexUserLevels();
    indexRates();
  }


  /**
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (!app._.isEqual(this.props.item, nextProps.item) && nextProps.item.points) {
      nextProps.initialize(
        this._CreateRate(nextProps.item.points),
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
    return (
      <Card
        title={app.translate('routes.home.evaluation-360.question factor')}
        style={{
          height: '100%',
        }}
      >
        {this._renderItems(4,5)}
        {/*
        <Row style={{
          height: '40px',
        }}>
          <Col sm={4}>{app.translate('routes.home.evaluation-360.range')}</Col>
          <Col sm={5}>{app.translate('routes.home.evaluation-360.Manager')}</Col>
          <Col sm={5}>{app.translate('routes.home.evaluation-360.Colleague')}</Col>
          <Col sm={5}>{app.translate('routes.home.evaluation-360.Employee')}</Col>
          <Col sm={5}>{app.translate('routes.home.evaluation-360.Contact')}</Col>
        </Row>
        <Row>
          <Col sm={4}>{app.translate('routes.home.evaluation-360.very good')}</Col>
          <Col sm={5}>
            <Field
              name="rate_1_1"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_1_2"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_1_3"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_1_4"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>{app.translate('routes.home.evaluation-360.good')}</Col>
          <Col sm={5}>
            <Field
              name="rate_2_1"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_2_2"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_2_3"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_2_4"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>{app.translate('routes.home.evaluation-360.Normal')}</Col>
          <Col sm={5}>
            <Field
              name="rate_3_1"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_3_2"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_3_3"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_3_4"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>{app.translate('routes.home.evaluation-360.Less than expected')}</Col>
          <Col sm={5}>
            <Field
              name="rate_4_1"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_4_2"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_4_3"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_4_4"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>{app.translate('routes.home.evaluation-360.Need training')}</Col>
          <Col sm={5}>
            <Field
              name="rate_5_1"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_5_2"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_5_3"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
          <Col sm={5}>
            <Field
              name="rate_5_4"
              label={undefined}
              component={Text}
              validate={(value) => {
                if (!regex.number.test(value)) {
                  return app.translate('main.Enter numbers only');
                }

                return true;
              }}
            />
          </Col>
        </Row>
          */}
      </Card>
    );
  }
}
