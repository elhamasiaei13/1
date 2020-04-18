import React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import Chart from 'components/common/Charts/Chart';

@autobind
/**
 *
 */
export default class Clock extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    time: PropTypes.object,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    config: {},
    time: () => {
      let now = new Date();
      return {
        hours: now.getHours() + now.getMinutes() / 60,
        minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
        seconds: now.getSeconds() * 12 / 60,
      };
    },
  };

  constructor(props) {
    super(props);

    Math.easeOutBounce = function (pos) {
      if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      }
      if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      }
      if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      }
      return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
    };

    this.state = {
      config: Object.assign({
        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: 250,
          backgroundColor: '#fff',
        },

        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        title: {
          text: '',
          style: {
            display: 'none',
          },
        },

        pane: {
          background: [{
            // default background
          }, {
            // reflex for supported browsers
            backgroundColor: Highcharts.svg ? {
              radialGradient: {
                cx: 0.5,
                cy: -0.4,
                r: 1.9,
              },
              stops: [
                [0.5, 'rgba(255, 255, 255, 0.2)'],
                [0.5, 'rgba(200, 200, 200, 0.2)'],
              ],
            } : null,
          }],
        },

        yAxis: {
          labels: {
            distance: -20,
          },
          min: 0,
          max: 12,
          lineWidth: 0,
          showFirstLabel: false,

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 5,
          minorTickPosition: 'inside',
          minorGridLineWidth: 0,
          minorTickColor: '#666',

          tickInterval: 1,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          title: {
            text: 'Powered by<br/>Raden',
            style: {
              color: '#BBB',
              fontWeight: 'normal',
              fontSize: '8px',
              lineHeight: '10px',
            },
            y: 10,
          },
        },

        tooltip: {
          formatter: function () {
            return this.series.chart.tooltipText;
          },
        }
        ,
        series: [{
          data: [{
            id: 'hour',
            y: props.time.hours,
            dial: {
              radius: '60%',
              baseWidth: 4,
              baseLength: '95%',
              rearLength: 0,
            },
          }, {
            id: 'minute',
            y: props.time.minutes,
            dial: {
              baseLength: '95%',
              rearLength: 0,
            },
          }, {
            id: 'second',
            y: props.time.seconds,
            dial: {
              radius: '100%',
              baseWidth: 1,
              rearLength: '20%',
            },
          }],
          animation: false,
          dataLabels: {
            enabled: false,
          },
        }],
      }, (props.config), (chart) => {
        if (chart.axes) {
          // Cache the tooltip text
          chart.tooltipText =
            Clock.pad(Math.floor(props.time.hours), 2) + ':' +
            Clock.pad(Math.floor(props.time.minutes * 5), 2) + ':' +
            Clock.pad(props.time.seconds * 5, 2);

        }
      }),
    };

    // */
  }


  /**
   * Get the current time
   */
  static getNow() {
    let now = new Date();

    return {
      hours: now.getHours() + now.getMinutes() / 60,
      minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
      seconds: now.getSeconds() * 12 / 60,
    };
  }

  /**
   * Pad numbers
   */
  static pad(number, length) {
    // Create an array of the remaining length + 1 and join it with 0's
    return new Array((length || 2) + 1 - String(number).length).join(0) + number;
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
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 250,
            backgroundColor: '#fff',
          },

          credits: {
            enabled: false,
          },
          exporting: {
            enabled: false,
          },
          title: {
            text: '',
            style: {
              display: 'none',
            },
          },

          pane: {
            background: [{
              // default background
            }, {
              // reflex for supported browsers
              backgroundColor: Highcharts.svg ? {
                radialGradient: {
                  cx: 0.5,
                  cy: -0.4,
                  r: 1.9,
                },
                stops: [
                  [0.5, 'rgba(255, 255, 255, 0.2)'],
                  [0.5, 'rgba(200, 200, 200, 0.2)'],
                ],
              } : null,
            }],
          },

          yAxis: {
            labels: {
              distance: -20,
            },
            min: 0,
            max: 12,
            lineWidth: 0,
            showFirstLabel: false,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 5,
            minorTickPosition: 'inside',
            minorGridLineWidth: 0,
            minorTickColor: '#666',

            tickInterval: 1,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            title: {
              text: 'Powered by<br/>Raden',
              style: {
                color: '#BBB',
                fontWeight: 'normal',
                fontSize: '8px',
                lineHeight: '10px',
              },
              y: 10,
            },
          },

          tooltip: {
            formatter: function () {
              return this.series.chart.tooltipText;
            },
          }
          ,
          series: [{
            data: [{
              id: 'hour',
              y: np.time.hours,
              dial: {
                radius: '60%',
                baseWidth: 4,
                baseLength: '95%',
                rearLength: 0,
              },
            }, {
              id: 'minute',
              y: np.time.minutes,
              dial: {
                baseLength: '95%',
                rearLength: 0,
              },
            }, {
              id: 'second',
              y: np.time.seconds,
              dial: {
                radius: '100%',
                baseWidth: 1,
                rearLength: '20%',
              },
            }],
            animation: false,
            dataLabels: {
              enabled: false,
            },
          }],
        }, (np.config), (chart) => {
          if (chart.axes) {
            // Cache the tooltip text
            chart.tooltipText =
              Clock.pad(Math.floor(np.time.hours), 2) + ':' +
              Clock.pad(Math.floor(np.time.minutes * 5), 2) + ':' +
              Clock.pad(np.time.seconds * 5, 2);

          }
        }),
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
