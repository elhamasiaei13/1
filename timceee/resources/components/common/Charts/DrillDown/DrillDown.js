import React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import Chart from './../Chart';

require('highcharts/modules/drilldown')(Highcharts);
require('highcharts/modules/data')(Highcharts);

@autobind
/**
 *
 */
export default class DrillDown extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    tooltipStyle: PropTypes.object,
    legendAlign: PropTypes.string,
    series: PropTypes.arrayOf(
      PropTypes.object,
    ),
    style: PropTypes.object,
    plotOptions: PropTypes.object,
    yAxisTitleText: PropTypes.string,
    drilldownsSeries: PropTypes.array,
    tooltip: PropTypes.object,
  };

  static defaultProps = {
    title: '',
    tooltip: {
      headerFormat: '<span style="font-size:11px">' + '{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">' + '{point.name}</span>: <b>{point.y}</b><br/>',
      useHTML: true,
      style: {
        fontFamily: 'inherit',
        textAlign: 'right',
        direction: 'rtl',
      },
    },
    subTitle: '',
    tooltipStyle: {},
    legendAlign: '',
    series: [],
    style: {},
    plotOptions: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y}',
        useHTML: Highcharts.hasBidiBug,
      },
    },
    drilldownsSeries: [],
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
          type: 'column',
        },
        title: {
          enabled: false,
          text: props.title,
        },
        subtitle: {
          text: props.subTitle,
        },
        xAxis: {
          type: 'category',
          reversed: true,
        },
        yAxis: {
          opposite: true,
          title: {
            text: props.yAxisTitleText,
            useHTML: Highcharts.hasBidiBug,
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: props.plotOptions,
        },
        tooltip: props.tooltip,
        series: props.series,
        credits: {
          enabled: false,
        },
        loading: {
          hideDuration: 1000,
          showDuration: 1000,
        },
        drilldown: {
          drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
              align: 'left',
              y: 0,
              x: 0,
            },
            theme: {
              fill: 'white',
              'stroke-width': 1,
              stroke: 'silver',
              r: 3,
              states: {
                hover: {
                  fill: '#a4edba',
                },
                select: {
                  stroke: '#039',
                  fill: '#a4edba',
                },
              },
            },

          },
          series: props.drilldownsSeries,
        },
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
            type: 'column',
          },
          xAxis: {
            type: 'category',
            reversed: true,
          },
          credits: {
            enabled: false,
          },
          loading: {
            hideDuration: 1000,
            showDuration: 1000,
          },
          title: {
            enabled: false,
            text: np.title,
          },
          subtitle: {
            text: np.subTitle,
          },
          yAxis: {
            opposite: true,
            title: {
              text: np.yAxisTitleText,
              useHTML: Highcharts.hasBidiBug,
            },
          },
          legend: {
            enabled: false,
          },
          plotOptions: {
            series: np.plotOptions,
          },
          tooltip: np.tooltip,
          series: np.series,
          drilldown: {
            drillUpButton: {
              relativeTo: 'spacingBox',
              position: {
                align: 'left',
                y: 0,
                x: 0,
              },
              theme: {
                fill: 'white',
                'stroke-width': 1,
                stroke: 'silver',
                r: 3,
                states: {
                  hover: {
                    fill: '#a4edba',
                  },
                  select: {
                    stroke: '#039',
                    fill: '#a4edba',
                  },
                },
              },

            },
            series: np.drilldownsSeries,
          },
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
