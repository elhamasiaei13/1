import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form/Form';
import ReportTableContainerWrapper from './../ReportTable/ReportTableContainerWrapper';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';

@authorize
@autobind
/**
 *
 */
export default class Member360 extends React.PureComponent {
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
      report: false,
      positions: [],
      questionnaire: '',
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
    const {period, positions, questionnaire, questionnaires, report, status} = this.state;
    const {can} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        {
          !report &&
          <Col
            md={8}
            style={{
              height: '100%',
            }}
          >
            <Form
              positionsSelected={positions}
              questionnaire={questionnaire}
              onSubmit={(data) => {
                this.setState({positions: data.positions, questionnaire: data.questionnaire}, () => {
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
                positions: positions,
                questionnaire: questionnaire,
              }}
              name={'member-360'}
            />
          </Col>
        }

      </Row>
    );
  }
}
