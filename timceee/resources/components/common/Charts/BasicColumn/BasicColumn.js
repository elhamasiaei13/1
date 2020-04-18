import React from 'react';
import PropTypes from 'prop-types';
import Chart from './../Chart';

@autobind
/**
 *
 */
export default class BasicColumn extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    legendAlign: PropTypes.string,
    tooltipStyle: PropTypes.object,
    series: PropTypes.PropTypes.arrayOf(
      PropTypes.object,
    ),
    style: PropTypes.object,
    xAxis: PropTypes.object,
    tooltip: PropTypes.object,
    plotOptions: PropTypes.object,
    subtitle: PropTypes.string,
    yAxisTitle: PropTypes.string,
  };

  static defaultProps = {
    config: {},
    title: '',
    subTitle: '',
    series: [],
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      crosshair: true,
    },
    tooltipStyle: {},
    legendAlign: '',
    style: {},
    yAxisTitle: null,
    tooltip: {
      headerFormat: '<span style="font-size:10px">' +
      '{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};' +
      'padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>' +
      '{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
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
        chart: {
          type: 'column',
        },
        title: {
          text: props.title,
        },
        subtitle: {
          text: props.subtitle,
        },
        xAxis: props.xAxis,
        yAxis: {
          min: 0,
          title: {
            text: props.yAxisTitle,
          },
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
          chart: {
            type: 'column',
          },
          title: {
            text: np.title,
          },
          subtitle: {
            text: np.text,
          },
          xAxis: np.xAxis,
          yAxis: {
            min: 0,
            title: {
              text: np.yAxisTitle,
            },
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
