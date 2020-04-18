import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, Row, Col, Button, Form, Modal} from 'antd';
import {reduxForm, Field} from 'redux-form';
import {Text, Avatar, TextArea, Email, WebSite, Phone} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import Cropper from 'components/common/Cropper';
import AntTable from 'components/common/Table/AntTable';
import uuidv1 from 'uuid/v1';
import WorkingHoursView from 'components/common/WorkingHours';
import Editor from 'components/common/Editor';

@autobind
export default class Storage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const data = {
      id: 5,
      name: 'ساعت کاری ۱',
      time_from: '10:00:00',
      period: 0,
      duration: 32400,
      color: '#37d67a',
      active: 0,
      deleted_at: null,
      created_at: '2017-09-24 16:37:16',
      updated_at: '2017-10-25 10:43:44',
      description: null,
      day_to: 0,
      time_to: '19:00:00',
      factors: [
        {
          id: 4,
          name: 'کارکرد',
          rule_id: 1,
          working_hour_id: 5,
          duration_from: -7200,
          time_from: '08:00:00',
          duration_to: 25200,
          time_to: '17:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 0,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-11-05 14:21:11',
        },
        {
          id: 5,
          name: 'اضافه اول',
          rule_id: 2,
          working_hour_id: 5,
          duration_from: -14400,
          time_from: '06:00:00',
          duration_to: -7200,
          time_to: '08:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 0,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-11-06 16:07:08',
        },
        {
          id: 6,
          name: 'خارج وقت',
          rule_id: 4,
          working_hour_id: 5,
          duration_from: -36000,
          time_from: '00:00:00',
          duration_to: 50400,
          time_to: '00:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:15:50',
        },
        {
          id: 7,
          name: 'تاخیر',
          rule_id: 5,
          working_hour_id: 5,
          duration_from: -4500,
          time_from: '08:45:00',
          duration_to: 0,
          time_to: '10:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-11-05 11:33:11',
        },
        {
          id: 8,
          name: 'تعجیل',
          rule_id: 6,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '14:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 9,
          name: 'غیبت روزانه',
          rule_id: 7,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 10,
          name: 'غیبت ساعتی',
          rule_id: 8,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 12,
          name: 'شناوری',
          rule_id: 10,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '10:15:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 2,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 13,
          name: 'مرخصی روزانه',
          rule_id: 11,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 14,
          name: 'اضافه کار در مرخصی',
          rule_id: 12,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 15,
          name: 'ماموریت روزانه',
          rule_id: 13,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 16,
          name: 'اضافه کار در ماموریت',
          rule_id: 16,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:17:52',
        },
        {
          id: 17,
          name: 'اضافه آخر',
          rule_id: 3,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '17:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:24:32',
        },
        {
          id: 18,
          name: 'ماموریت ساعتی',
          rule_id: 15,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:24:32',
        },
        {
          id: 19,
          name: 'مرخصی ساعتی',
          rule_id: 14,
          working_hour_id: 5,
          duration_from: 0,
          time_from: '10:00:00',
          duration_to: 0,
          time_to: '19:00:00',
          add_time: '00:00:00',
          fact: 1,
          priority: 1,
          acceptance: 1,
          active: 1,
          description: null,
          created_at: '2017-09-24 18:26:17',
          updated_at: '2017-10-26 18:24:32',
        },
      ],
    };
    const style = {height: '20px', borderRadius: 25};
    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          overflow: 'auto',
          margin: '0',
        }}>
        <Col sm={24}
             style={{
               height: '100%',
             }}
        >
          <Card
            title="test"
          >
            <WorkingHoursView
              workingHours={data}
              style={style}
            />

            <Editor
              onChange={console.log}
            />

          </Card>
        </Col>
      </Row>
    );
  }
}
