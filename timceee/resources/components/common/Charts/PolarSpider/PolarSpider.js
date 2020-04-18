import React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import Chart from 'components/common/Charts/Chart';

@autobind
/**
 *
 */
export default class PolarSpider extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    yAxisTitle: PropTypes.string,
    tooltipStyle: PropTypes.object,
    xAxisCategory: PropTypes.array,
    legendAlign: PropTypes.string,
    series: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    style: PropTypes.object,
  };

  static defaultProps = {
    title: '',
    subTitle: '',
    yAxisTitle: '',
    tooltipStyle: {
      fontFamily: 'inherit',
      textAlign: 'right',
      direction: 'rtl',
    },
    xAxisCategory: [],
    legendAlign: 'right',
    series: [],
    style: {},
    config: {},
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      config: Object.assign({
        chart: {
          polar: true,
          type: 'column',
        },
        credits: {
          enabled: false,
        },
        title: {
          text: props.title,
        },
        subtitle: {
          text: props.subTitle,
        },
        loading: {
          hideDuration: 1000,
          showDuration: 1000,
        },
        xAxis: {
          categories: props.xAxisCategory,
          tickmarkPlacement: 'on',
          lineWidth: 0,
          reversed: true,
        },

        yAxis: {
          title: {
            text: props.yAxisTitle,
            useHTML: Highcharts.hasBidiBug,
          },
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          opposite: true,
          min: 0,
        },

        tooltip: {
          shared: true,
          pointFormat: '<span style="color:{series.color}"' +
          '>{series.name}:<b>{point.y}</b><br/>',
          useHTML: true,
          style: props.tooltipStyle,
        },

        legend: {
          align: props.legendAlign,
          verticalAlign: 'top',
          y: 70,
          layout: 'vertical',
        },

        plotOptions: {
          series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on',
          },
        },
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
          chart: {
            polar: true,
            type: 'column',
          },
          credits: {
            enabled: false,
          },
          title: {
            text: np.title,
          },
          subtitle: {
            text: np.subTitle,
          },
          loading: {
            hideDuration: 1000,
            showDuration: 1000,
          },
          xAxis: {
            categories: np.xAxisCategory,
            tickmarkPlacement: 'on',
            lineWidth: 0,
            reversed: true,
          },

          yAxis: {
            title: {
              text: np.yAxisTitle,
              useHTML: Highcharts.hasBidiBug,
            },
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            opposite: true,
            min: 0,
          },

          tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}"' +
            '>{series.name}:<b>{point.y}</b><br/>',
            useHTML: true,
            style: np.tooltipStyle,
          },

          legend: {
            align: np.legendAlign,
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical',
          },

          plotOptions: {
            series: {
              stacking: 'normal',
              shadow: false,
              groupPadding: 0,
              pointPlacement: 'on',
            },
          },
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
