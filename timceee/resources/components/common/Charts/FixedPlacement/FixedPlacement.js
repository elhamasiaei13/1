import React from 'react';
import PropTypes from 'prop-types';
import Chart from './../Chart';

@autobind
/**
 *
 */
export default class FixedPlacement extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    tooltipStyle: PropTypes.object,
    legendAlign: PropTypes.string,
    yAxisProp: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    series: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    plotOptions: PropTypes.object,
    xAxisCategories: PropTypes.arrayOf(
      PropTypes.string,
    ),
  };

  static defaultProps = {
    config: {},
    yAxisProp: [{
      min: 0,
      title: {
        text: '',
      },
      opposite: true,
    }],
    title: '',
    tooltip: '',
    subTitle: '',
    tooltipStyle: {},
    legendAlign: '',
    series: [],
    style: {},
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
      },
    },
    xAxisCategories: [],
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
        categories: props.xAxisCategories,
        yAxisProp: props.yAxisProp,
        legend: {
          shadow: false,
        },
        tooltip: {
          shared: true,
          useHTML: true,
        },
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
          categories: np.xAxisCategories,
          yAxisProp: np.yAxisProp,
          legend: {
            shadow: false,
          },
          tooltip: {
            shared: true,
            useHTML: true,
          },
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
