import React from 'react';
import BasicColumn from 'components/common/Charts/BasicColumn/BasicColumn';
import {connect} from 'react-redux';
import {run} from './Action';
import PropTypes from 'prop-types';
import DashboardCard from '../common/DashboardCard';

@connect(null, {
  run,
})
@autobind
/**
 *
 */
export default class BasicColumnChart extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    xAxis: PropTypes.arrayOf(
      PropTypes.string,
    ),
    yAxisTitle: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.object,
    ),
    style: PropTypes.object,
    run: PropTypes.func,
  };

  static defaultProps = {
    yAxisTitle: null,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      mySubTitle: props.subtitle ? props.subtitle : '',
      myData: props.data ? props.data : [],
      myXAxis: props.xAxis ? props.xAxis : [],
      loading: false,
    };
  }

  // /**
  //  *
  //  */
  componentDidMount() {
    this._reload(false);
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      mySubTitle: (np.subtitle ? np.subtitle : ''),
      myData: (np.data ? np.data : []),
      myXAxis: (np.xAxis ? np.xAxis : []),
    });
  }


  _reload(getData = true) {
    this.setState({loading: true}, () => {
      let now = new Date();
      let date = now.toDateString();
      let loadDate = app.local.load('chartDateBasic');
      let loadResult = app.local.load('Basic');
      let _getData = app.local.load('getBasic');
      if ((!app._.isEqual(loadDate, date) || app._.isEmpty(loadResult) || getData) && app._.isEmpty(_getData)) {
        app.local.save(`getBasic`, date);
        this.props.run((r) => BasicColumnChart.resultReceived(r, (state) => {
          app.local.save(`Basic`, r);
          app.local.save(`chartDateBasic`, date);
          app.local.remove('getBasic');
          this.setState(state);
          this.setState({loading: false});
        }));
      } else {
        if (!app._.isEmpty(loadResult)) {
          BasicColumnChart.resultReceived(loadResult, (state) => {
            this.setState(state);
            this.setState({loading: false});
          });
        }
      }
    });
  }

  /**
   *
   * @param {object} r
   * @param {Function} callback
   */
  static resultReceived(r, callback = () => {
  }) {
    let xAxis = [];
    let assignments = [];
    let discharges = [];
    let overtimes = [];
    r.map((row) => {
      xAxis.push(row.department.name);
      assignments.push(row.data.assignments / 60);
      discharges.push(row.data.discharges / 60);
      overtimes.push(row.data.overtimes / 60);
    });
    let data = [{
      name: 'ماموریت',
      data: assignments,
    }, {
      name: 'مرخصی',
      data: discharges,
    }, {
      name: 'اضافه کار',
      data: overtimes,
    }];
    callback({
      mySubTitle: 'اضافه کار و ماموریت',
      myData: data,
      myXAxis: xAxis,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    let {
      title,
      yAxisTitle,
      style,
    } = this.props;
    let {
      myData,
      myXAxis,
      mySubTitle,
      loading,
    } = this.state;

    return (
      <DashboardCard
        title={app.translate('routes.home.dashboard.BasicColumnChart CardView Title')}
        loading={loading}
        reload={this._reload}
      >
        {!app._.isEmpty(myData) && <BasicColumn
          title={title}
          subTitle={mySubTitle}
          yAxisTitle={yAxisTitle}
          xAxis={{
            categories: myXAxis,
            crosshair: true,
          }}
          style={style}
          series={myData}
        />}
      </DashboardCard>
    );
  }
}
