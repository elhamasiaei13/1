import React from 'react';
import HeatMap from 'components/common/Charts/HeatMap/HeatMap';
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
export default class HeatMapChart extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    tooltipText: PropTypes.string,
    xAxis: PropTypes.array,
    yAxis: PropTypes.array,
    yAxisTitle: PropTypes.string,
    data: PropTypes.array,
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
      myYAxis: props.yAxis ? props.yAxis : [],
      loading: false,
    };
  }

  // /**
  //  *
  //  */
  // componentDidMount() {
  //   this._reload()
  // }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      mySubTitle: (np.subtitle ? np.subtitle : ''),
      myData: (np.data ? np.data : []),
      myXAxis: (np.xAxis ? np.xAxis : []),
      myYAxis: (np.yAxis ? np.yAxis : []),
    });
  }

  _reload() {
    this.setState({loading: true}, () => {
      this.props.run((r) => this.resultReceived(r, () => {
        this.setState({loading: false});
      }));
    });
  }

  /**
   *
   * @param {object} r
   * @param {Function} callback
   */
  resultReceived(r, callback = () => {
  }) {
    this.setState({
      mySubTitle: r.subtitle,
      myData: r.data,
      myXAxis: r.xAxis,
      myYAxis: r.yAxis,
    }, callback);
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
      tooltipText,
    } = this.props;
    let {
      myData,
      myXAxis,
      myYAxis,
      mySubTitle,
      loading,
    } = this.state;
    return (
      !app._.isEmpty(myData) && <DashboardCard
        title={app.translate('routes.home.dashboard.HeatMapChart CardView Title')}
        loading={loading}
        reload={this._reload}
      >
        <HeatMap
          title={title}
          subTitle={mySubTitle}
          xAxis={{
            categories: myXAxis,
          }}
          yAxis={{
            categories: myYAxis,
            title: yAxisTitle,
          }}
          style={style}
          series={[{
            name: tooltipText,
            borderWidth: 1,
            data: myData,
            dataLabels: {
              enabled: true,
              color: '#000000',
            },
          }]}
        />
      </DashboardCard>
    );
  }
}
