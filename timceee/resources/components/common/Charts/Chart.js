import React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import {Modal} from 'antd';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

@autobind
/**
 *
 */
export default class Charts extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    style: PropTypes.object,
  };

  static defaultProps = {
    config: {},
    style: {},
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   */
  componentDidMount() {
    this.renderChart(Object.assign({}, this.props.config,
      {
        credits: {
          text: app.translate('components.common.charts.credits'),
          href: 'http://jahangostarpars.com',
        },
      }));
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.config, this.props.config)) {
      this.renderChart(Object.assign({}, np.config,
        {
          credits: {
            text: 'جهان گستر پارس',
            href: 'http://jahangostarpars.com',
          },
        }));
    }
  }


  /**
   *
   * @param { object | array } _config
   */
  renderChart(_config) {
    let point = Object.assign({}, (_config && _config.plotOptions && _config.plotOptions.series && _config.plotOptions.series.point ? _config.plotOptions.series.point : {}), {
      events: {
        click: function (event) {
          if (this.modal && ( event.ctrlKey || event.shiftKey || event.altKey || event.metaKey )) {
            Modal.info({
              title: 'جزئیات نمودار',
              content: this.modal,
              onOk() {
              },
            });
          }
        },
      },
    });
    let series = Object.assign({}, _config && _config.plotOptions && _config.plotOptions.series ? _config.plotOptions.series : {}, {
      cursor: 'pointer',
      animation: true,
      point: point,
    });

    let plotOptions = Object.assign({}, _config && _config.plotOptions ? _config.plotOptions : {}, {
      series: series,
    });

    let config = Object.assign({}, _config, {plotOptions});

    let chart = Highcharts.chart(this.highchart,
      config,
    );

    // TODO charts loading
    /* if (this.state.flag) {
     chart.showLoading();
     } else {
     chart.hideLoading();
     }*/
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {style} = this.props;

    return (
      <div
        ref={(input) => this.highchart = input}
        style={Object.assign({
          direction: 'ltr',
          minWidth: '200px',
          maxWidth: '95%',
          height: '400px',
          margin: '0 auto',
          display: 'flex',
        }, style)}
      >
      </div>
    );
  }
}
