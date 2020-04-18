import React from 'react';
import PropTypes from 'prop-types';
import List from './../../Period/List/ListWrapper';
import Form from './Form/Form';
import ReportTableContainerWrapper from './../ReportTable/ReportTableContainerWrapper';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';

@authorize
@autobind
/**
 *
 */
export default class AnswerReport extends React.PureComponent {
  static propTypes = {
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      period: null,
      report: false,
      questionnaires: [],
      positions: [],
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      period: null,
      report: false,
    });
  }

  /**
   *
   * @private
   */
  _onCancelReport() {
    this.setState({
      report: false,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {period, positions, questionnaires, report, status} = this.state;
    const {can} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        {!report &&
        <Col
          md={8}
          style={{
            height: '100%',
          }}
        >
          <List
            statusForm={status}
            activeItem={period && period.id}
            onClick={(period) => can('Setting@update') && this.setState({period})}
          />
        </Col>
        }
        {
          !report && period && period.id &&
          <Col
            md={8}
            style={{
              height: '100%',
            }}
          >
            <Form
              period={period}
              onCancel={this._onCancel}
              questionnairesSelected={this.state.questionnaires}
              positionsSelected={this.state.positions}
              onSubmit={(data) => {
                this.setState({positions: data.positions, questionnaires: data.questionnaires}, () => {
                  this.setState({report: true});
                });
              }}
            />
          </Col>
        }
        {
          report &&
          <Col
            md={24}
            style={{
              height: '100%',
            }}
          >
            <ReportTableContainerWrapper
              report={{
                id: 0,
                name: 'گزارش ۳۶۰',
              }}
              onCancel={this._onCancelReport}
              params={{
                report: {
                  periods: [period.id],
                  positions: positions,
                  questionnaires: questionnaires,
                },
              }}
              name={'answer-report'}
            />
          </Col>
        }

      </Row>
    );
  }
}
