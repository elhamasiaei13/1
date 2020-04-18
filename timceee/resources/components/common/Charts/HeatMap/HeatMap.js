import React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import Chart from './../Chart';

require('highcharts/modules/heatmap')(Highcharts);

@autobind
/**
 *
 */
export default class HeatMap extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    tooltip: PropTypes.object,
    legendAlign: PropTypes.string,
    series: PropTypes.array,
    style: PropTypes.object,
    plotOptions: PropTypes.object,
    chart: PropTypes.object,
    xAxis: PropTypes.object,
    yAxis: PropTypes.object,
    colorAxis: PropTypes.object,
    legend: PropTypes.object,
  };

  static defaultProps = {
    config: {},
    title: '',
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.xAxis.categories[this.point.x] +
          '</b> sold <br><b>' +
          this.point.value + '</b> items on <br><b>' +
          this.series.yAxis.categories[this.point.y] + '</b>';
      },
    },
    subTitle: '',
    tooltipStyle: {},
    legendAlign: '',
    series: [],
    style: {},
    plotOptions: {},
    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1,
    },
    xAxis: {},
    yAxis: {},
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: '#123332',
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280,
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      config: Object.assign({
        chart: props.chart,
        title: {
          text: props.title,
        },
        xAxis: props.xAxis,
        yAxis: props.yAxis,
        colorAxis: props.colorAxis,
        legend: props.legend,
        tooltip: props.tooltip,
        series: props.series,
      }, (props.config)),
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np, this.props)) {
      this.setState({
        config: Object.assign({
          chart: np.chart,
          title: {
            text: np.title,
          },
          xAxis: np.xAxis,
          yAxis: np.yAxis,
          colorAxis: np.colorAxis,
          legend: np.legend,
          tooltip: np.tooltip,
          series: np.series,
        }, np.config),
      });
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {config} = this.state;
    const {style} = this.props;
    return (
      <Chart
        config={config}
        style={style}
      />
    );
  }
}
