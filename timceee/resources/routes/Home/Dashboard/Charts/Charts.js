import React from 'react';
import {Row, Col} from 'antd';
import SpiderChart from './Spider/Spider';
import DashboardCard from './common/DashboardCard';
import PropTypes from 'prop-types';
import PieChart from './Pie/Pie';
import ClockChart from './Clock/Clock';
import HeatMapChart from './HeatMap/HeatMap';
import FixedPlacementChart from './FixedPlacement/FixedPlacement';
import BasicColumnChart from './BasicColumn/BasicColumn';
import DrillDownChart from './DrillDown/DrillDown';
import BasicColumn from 'components/common/Charts/BasicColumn/BasicColumn';
import DrillDown from 'components/common/Charts/DrillDown/DrillDown';
import {connect} from 'react-redux';
import {run} from './Action';

@connect(null, {
  run,
})
@autobind
/**
 *
 */
export default class Chart extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    yAxisTitle: PropTypes.string,
    xAxis: PropTypes.arrayOf(
      PropTypes.string,
    ),
    data: PropTypes.arrayOf(
      PropTypes.object,
    ),
    style: PropTypes.object,
    run: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    subtitle: '',
    yAxisTitle: 'List',
    style: {
      height: '400px',
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      subtitle: '',

      xAxisPolarSpider: [],
      dataPolarSpider: [],
      spiderLoading: false,

      dataColumnWithDrilldown: [],
      drilldownColumnWithDrilldown: [],

      dataHeatMap: [],
      xAxisHeatMap: [],
      yAxisHeatMap: [],


    };
  }

  /**
   *
   */
  // componentDidMount() {
  //   this.props.run((r) => this._resultReceived(r));
  // }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      subtitle: np.subtitle,
      dataPolarSpider: np.dataPolarSpider,
      xAxisPolarSpider: np.xAxisPolarSpider,
      dataColumnWithDrilldown: np.dataColumnWithDrilldown,
      drilldownColumnWithDrilldown: np.drilldownColumnWithDrilldown,
      dataHeatMap: np.dataHeatMap,
      xAxisHeatMap: np.xAxisHeatMap,
      yAxisHeatMap: np.yAxisHeatMap,
    });
  }

  /**
   *
   * @param {object} r
   * @private
   */
  _resultReceived(r) {
    this.setState({
      subtitle: r.subtitle,

      dataPolarSpider: r.dataPolarSpider,
      xAxisPolarSpider: r.xAxisPolarSpider,
      spiderLoading: false,

      dataColumnWithDrilldown: r.dataColumnWithDrilldown,
      drilldownColumnWithDrilldown: r.drilldownColumnWithDrilldown,

      dataHeatMap: r.dataHeatMap,
      xAxisHeatMap: r.xAxisHeatMap,
      yAxisHeatMap: r.yAxisHeatMap,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      subtitle,
      pieLoading,

      dataPolarSpider,
      xAxisPolarSpider,
      spiderLoading,

      dataColumnWithDrilldown,
      drilldownColumnWithDrilldown,

      dataHeatMap,
      xAxisHeatMap,
      yAxisHeatMap,
    } = this.state;
    const style = {margin: '0px', padding: '0px 4px 0px 4px'};
    return (
      <div
        style={{
          margin: 0,
          width: '100%',
        }}
      >
        <Row
          gutter={16}
          style={{
            margin: 0,
            overflowY: 'auto',
            width: '100%',
            marginBottom: '16px',
          }}
        >
          <Col
            sm={12}
            style={style}>
            <PieChart/>
          </Col>
          <Col
            sm={12}
            style={style}>
            <ClockChart/>
          </Col>
          <Col sm={24}
               style={style}>
            <SpiderChart
              title={app.translate('routes.home.dashboard.SpiderChart Title')}
              subtitle={subtitle}
              data={dataPolarSpider}
              xAxis={xAxisPolarSpider}
            />
          </Col>
          <Col sm={24}
               style={style}>
            <FixedPlacementChart
              title={app.translate('routes.home.dashboard.FixedPlacementChart Title')}
              subtitle={subtitle}
            />
          </Col>
          <Col sm={24}
               style={style}>
            <HeatMapChart
              title={app.translate('routes.home.dashboard.HeatMapChart Title')}
              subtitle={subtitle}
              tooltipText={app.translate('routes.home.dashboard.HeatMapChart TooltipText')}
              xAxis={xAxisHeatMap}
              yAxis={yAxisHeatMap}
              data={dataHeatMap}
            />
          </Col>
          <Col sm={24}
               style={style}>
            <BasicColumnChart
              title={app.translate('routes.home.dashboard.BasicColumnChart Title')}
              xAxis={xAxisPolarSpider}
              data={dataPolarSpider}
            />
          </Col>
          <Col sm={24} md={24}
               style={style}>
            <DrillDownChart
              title={app.translate('routes.home.dashboard.DrillDownChart Title')}
              tooltipText={app.translate('routes.home.dashboard.DrillDownChart TooltipText')}
              subtitle={subtitle}
              data={dataColumnWithDrilldown}
              drill={drilldownColumnWithDrilldown}
              config={{
                lang: {
                  drillUpText: app.translate('routes.home.dashboard.DrillDownChart BackTo', {to: '{series.name}'}),
                },
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
