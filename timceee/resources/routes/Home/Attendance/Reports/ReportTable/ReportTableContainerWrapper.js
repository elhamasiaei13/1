import React from 'react';
import {connect} from 'react-redux';
import ReportTableContainer from './ReportTableContainer';
import PropTypes from 'prop-types';
import {showReport, emptyReport} from './../Module';

@connect((state) => ({
  dataReport: state.Attendance.Reports.dataReport,
  columns: state.Attendance.Reports.columns,
  properties: state.Attendance.Reports.properties,
}), {
  showReport,
  emptyReport,
})

@autobind
export default class ReportTableContainerWrapper extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.array,
    dataReport: PropTypes.array,
    properties: PropTypes.object,
    onCancel: PropTypes.func,
    showReport: PropTypes.func,
    emptyReport: PropTypes.func,
    params: PropTypes.object,
    report: PropTypes.object,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }


  /**
   *
   */
  componentDidMount() {
    const {showReport, params, report} = this.props;
    this.setState({loading: true});
    showReport(report.id, params, () => {
      this.setState({loading: false});
    });
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.emptyReport();
  }
  render() {
    const {columns, dataReport, properties, onCancel, report, emptyReport} = this.props;
    const {loading} = this.state;
    return (
      <ReportTableContainer
        loading={loading}
        title={report.label}
        columns={columns}
        dataSource={dataReport}
        onCancel={onCancel}
        beforeOnCancel={emptyReport}
        properties={properties}
      />
    );
  }
}
