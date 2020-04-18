import React from 'react';
import PropTypes from 'prop-types';
import List from './../Period/List/ListWrapper';
import Position360 from './Position360/Position360';
import Questionnaires from './Questionnaires/Questionnaires';
import Questions from './Questions/Questions';
import Form from './Form';
import {getPositions} from './Module';
import {indexRates} from './../Question/QuestionCategory/Module';
import ListView from 'components/common/ListView';
import Spin from 'components/common/Spin';
import MaterialIcon from 'components/common/MaterialIcon';
import {connect} from 'react-redux';
import {Row, Col, Button} from 'antd';

@authorize
@connect((state) => ({
  rates: state.Evaluation360.Question.QuestionCategory.rates,
  currentUser: state.Auth.currentUser,
  positions: state.Evaluation360.Evaluation.positions,
  positionsMeta: state.Evaluation360.Evaluation.positionsMeta,
}), {
  getPositions,
  indexRates,
})
@autobind
/**
 *
 */
export default class Evaluation extends React.PureComponent {
  static propTypes = {
    getPositions: PropTypes.func,
    indexRates: PropTypes.func,
    indexQuestionnaire: PropTypes.func,
    positions: PropTypes.arrayOf(PropTypes.object),
    questionnaires: PropTypes.arrayOf(PropTypes.object),
    rates: PropTypes.arrayOf(PropTypes.object),
    can: PropTypes.func,
    positionsMeta: PropTypes.object,
    questionnairesMeta: PropTypes.object,
    currentUser: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      questionnaires: [],
      position: props.positions && props.positions.length === 1 ? props.positions[0] : {},
      period: {},
      questionnaire: {},
      evaluation360: {},
      searchPosition: false,

      loading: false,
    };
  }

  componentDidMount() {
    const {indexRates} = this.props;
    this._reloadPosition();
    indexRates();
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    // this.props.emptySettings();
  }

  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.positions, this.props.positions)) {
      if (np.positions.length === 1) {
        this.setState({position: np.positions[0]});
      }
    }
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      evaluation360: {},
    });
  }

  _reloadPosition() {
    const {getPositions, currentUser} = this.props;
    this.setState({loading: true}, () => {
      getPositions({
        includes: ['user.profile'], filterGroups: [
          {
            filters: [
              {
                key: 'user_id',
                value: currentUser.id,
                operator: 'eq',
              },
            ],

          },
        ], page: 0, limit: 20,
      }, () => {
        this.setState({loading: false});
      });
    });
  }


  /**
   *
   * @return {Object}
   * @private
   */
  _renderPaginationPosition() {
    const {positionsMeta} = this.props;

    return {
      total: positionsMeta && positionsMeta.total,
      pageSize: positionsMeta && positionsMeta.limit,
      showTotal: (total, range) => app.translate('main.showingFromToOf', {
        start: range[0],
        end: range[1],
        total,
      }),
      onChange: (page, limit) => this._onReload(page - 1, limit),
      onShowSizeChange: (page, limit) => this._onReload(page - 1, limit),
    };
  }


  /**
   *
   * @param {String} value
   * @private
   */
  _onSearchPosition(value) {
    const {getPositions, currentUser, positionsMeta} = this.props;

    this.setState({loading: true, searchPosition: true, position: null}, () => getPositions({
      includes: ['user.profile'],
      filterGroups: [
        {
          or: true,
          filters: [
            {
              key: 'name',
              value,
              operator: 'ct',
            },
          ],
        },
        {
          filters: [
            {
              key: 'user_id',
              value: currentUser.id,
              operator: 'eq',
            },
          ],

        },
      ],
      limit: positionsMeta && positionsMeta.limit,
    }, (err) => !err && this.setState({loading: false, position: null})));
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {position, period, questionnaires, questionnaire, evaluation360, searchPosition, loading} = this.state;
    const {can, positions, rates} = this.props;

    return (
      <Spin
        spinning={loading}
      >
        <Row
          gutter={16}
          style={{
            height: '100%',
            margin: 0,
          }}
        >
          {
            !(evaluation360 && evaluation360.id) && ( positions.length > 1 || searchPosition ) &&

            <Col
              md={6}
              style={{
                height: '100%',
              }}
            >
              <ListView
                items={positions}
                title={app.translate('routes.home.evaluation-360.Positions')}
                primaryText={(item) => `${item.name}`}
                style={{height: '100%'}}
                avatar={{
                  render: (item) => (item && item.user && item.user.profile && item.user.profile.avatar ? item.user.profile.avatar : ''),
                }}
                onClick={(item) => this.setState({position: item, period: null, questionnaire: null, evaluation360: null})}
                activeItem={position && position.id}
                pagination={this._renderPaginationPosition()}
                onSearch={this._onSearchPosition}
                extra={[
                  <Button key='btnReload' type='dashed' onClick={() => {
                    this._reloadPosition();
                  }}>
                    <MaterialIcon name="reload" spin={loading}/>
                  </Button>,
                ]}
                loading={loading}
              />
            </Col>
          }
          {
            !(evaluation360 && evaluation360.id) && position && position.id &&
            <Col
              md={6}
              style={{
                height: '100%',
              }}
            >
              <List
                getAll={false}
                activeItem={period && period.id}
                onClick={(item) => this.setState({period: item, questionnaire: null, evaluation360: null})}
              />
            </Col>
          }
          {
            !(evaluation360 && evaluation360.id) && position && period && period.id &&
            <Col
              md={6}
              style={{
                height: '100%',
              }}
            >
              <Questionnaires
                period={period}
                onClick={(item) => this.setState({questionnaire: item, evaluation360: null})}
                activeItem={questionnaire && questionnaire.id}
              />
            </Col>
          }
          {
            !(evaluation360 && evaluation360.id) && position && period && questionnaire && questionnaire.id &&
            <Col
              md={6}
              style={{
                height: '100%',
              }}
            >
              <Position360
                position={position}
                period={period}
                questionnaire={questionnaire}
                activeItem={evaluation360 && evaluation360.id}
                onClick={(item) => this.setState({evaluation360: item})}
              />
            </Col>
          }
          {
            evaluation360 && evaluation360.id &&
            <Col
              md={24}
              style={{
                height: '100%',
              }}
            >
              <Questions
                rates={rates}
                position={position}
                period={period}
                questionnaire={questionnaire}
                evaluation360={evaluation360}
                onCancel={() => {
                  this.setState({evaluation360: null});
                }}
              />

            </Col>
          }
        </Row>
      </Spin>
    );
  }
}
