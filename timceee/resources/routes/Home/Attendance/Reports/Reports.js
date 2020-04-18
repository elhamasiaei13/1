import React from 'react';
import {Row, Col} from 'antd';
import PropTypes from 'prop-types';
import {ReportsListContainerWrapper} from './ReportsList';
import {ReportTableContainerWrapper} from './ReportTable';
import {ReportsFormContainerWrapper} from './ReportsForm';
import moment from 'moment-jalaali';

@autobind
/**
 *
 */
export default class Reports extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: null,
      formValue: {
        dateFrom: moment(moment().format('jYYYY/jM/01'), 'jYYYY/jM/jD').format('YYYY-M-D'), // 2017/09/23
        dateTo: moment().format('YYYY-M-D'), // 2017/10/22
        year: moment(moment().format('jYYYY/01/01'), 'jYYYY/jM/jD').format('jYYYY'),
        positions: [],
        type: 'default',
        // rules: ['1', '2'],
      },
      report: false,
    };
  }

  _onClick(value) {
    this.setState({activeItem: value});
  }

  _onSetFormValue(formValue) {
    this.setState({formValue, report: true});
  }

  _onCancel() {
    this.setState({activeItem: null, formValue: {}});
  }

  _onCancelReport() {
    this.setState({report: false});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {activeItem, report, formValue} = this.state;
    return (
      <Row
        gutter={16}
        style={{
          overflowY: 'auto',
          height: '100%',
          margin: 0,
        }}
      >

        {!report && app.authorize.can('Report@index') && <Col
          sm={24}
          md={8}
          style={{
            overflowY: 'auto',
            height: '100%',
          }}
        >
          <ReportsListContainerWrapper
            onClick={app.authorize.can('Report@all') || app.authorize.can('Report@sub') || app.authorize.can('Report@self') ? this._onClick : undefined}
            activeItem={activeItem && activeItem.id}
          />
        </Col>
        }
        {
          !!activeItem && !report && ( app.authorize.can('Report@all') || app.authorize.can('Report@sub') || app.authorize.can('Report@self') ) &&
          <Col
            sm={24}
            md={8}
            style={{
              overflowY: 'auto',
              height: '100%',
            }}
          >
            <ReportsFormContainerWrapper
              item={activeItem}
              onClick={this._onSetFormValue}
              onCancel={this._onCancel}
              formValue={formValue}
            />
          </Col>
        }
        {!app._.isEmpty(formValue) && !!activeItem && report && ( app.authorize.can('Report@all') || app.authorize.can('Report@sub') || app.authorize.can('Report@self') ) &&
        <Col
          sm={24}
          style={{
            overflowY: 'auto',
            height: '100%',
          }}
        >
          <ReportTableContainerWrapper
            onCancel={this._onCancelReport}
            params={formValue}
            report={activeItem}
          />
        </Col>
        }

      </Row>
    );
  }
}

