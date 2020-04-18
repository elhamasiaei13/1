import React from 'react';
import PropTypes from 'prop-types';
import Chart from './../Chart';

@autobind
/**
 *
 */
export default class Pie extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    tooltipStyle: PropTypes.object,
    legendAlign: PropTypes.string,
    series: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    plotOptions: PropTypes.object,
    tooltip: PropTypes.object,
    chart: PropTypes.object,
  };

  static defaultProps = {
    config: {},
    title: '',
    tooltip: {
      pointFormat: '{series.name}<b>{point.y}</b>',
      useHTML: true,
    },
    subTitle: '',
    tooltipStyle: {},
    legendAlign: '',
    series: [],
    style: {},
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
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
        tooltip: props.tooltip,
        plotOptions: props.plotOptions,
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
          tooltip: np.tooltip,
          plotOptions: np.plotOptions,
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
