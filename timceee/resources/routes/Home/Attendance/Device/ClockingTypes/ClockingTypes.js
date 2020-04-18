import React from 'react';
import {Row, Col, Card, Button} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {indexReasons} from 'routes/Home/Attendance/Clocking/Module';
import Form from './Form';
import Table from './Table';
import {Types} from 'routes/General/Types';

@connect((state) => ({
 // clockingReasons: state.Attendance.Clocking.reasons,
}), {
 // indexReasons,
})
@autobind
/**
 *
 */
export default class ClockingTypes extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    device: PropTypes.object,
   // clockingReasons: PropTypes.arrayOf(PropTypes.object),
    indexReasons: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      types: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
   // const {indexReasons} = this.props;

    $('.ant-pagination').prev('.ant-table').height('calc(100% - 56px)');
    this.setState({types: Types.items('Clocking')});
    // indexReasons({
    //   includes: [
    //     'children',
    //     'children.children',
    //   ],
    //   filterGroups: [
    //     {
    //       filters: [
    //         {
    //           key: 'clocking_reason_id',
    //           value: null,
    //           operator: 'eq',
    //         },
    //       ],
    //     },
    //   ],
    // });
  }

  /**
   *
   */
  componentDidUpdate() {
    $('.ant-pagination').prev('.ant-table').height('calc(100% - 56px)');
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancel, device} = this.props;
    const {types} = this.state;

    return (
      <Card
        className="wrapper"
        title={app.translate('routes.home.attendance.clocking.Types')}
        extra={
          <Button
            type="dashed"
            onClick={() => onCancel()}
          >
            {app.translate('main.Back')}
          </Button>
        }
      >

        <Row
          gutter={16}
          style={{
            height: '100%',
          }}
        >

          <Col md={8}>
            <Form
              device={device}
              reasons={types}
            />
          </Col>

          <Col
            md={16}
            style={{
              height: '100%',
            }}
          >
            <Table
              item={device}
              clockingReasons={types}
            />
          </Col>

        </Row>

      </Card>
    );
  }
}
