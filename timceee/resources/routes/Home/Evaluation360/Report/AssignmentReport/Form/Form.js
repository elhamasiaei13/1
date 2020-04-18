import React from 'react';
import Spin from 'components/common/Spin';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import PositionsList from 'routes/Home/Requests/Procedure/Form/Applicants';

@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    index: PropTypes.func,
    positionsSelected: PropTypes.array,
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
    };
  }

  /**
   *
   */
  componentDidMount() {
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
    const {error,  positions} = this.state;
    const {onCancel, onSubmit} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={false}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.evaluation-360.AssignmentReport')}
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
          </Row>
          <Button
            type="primary"
            onClick={() => {
              if (app._.isEmpty(positions)) {
                app.message(app.translate('routes.home.evaluation-360.report.error', 'error'), 'error');
              } else {
                onSubmit({
                  positions: positions,
                });
              }
            }
            }
            disabled={(app._.isEmpty(positions))}
          >
            {app.translate('main.Get Report')}
          </Button>
        </Card>

      </Spin>
    );
  }
}
