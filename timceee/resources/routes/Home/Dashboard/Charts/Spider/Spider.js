import React from 'react';
import Spider from 'components/common/Charts/PolarSpider/PolarSpider';
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
export default class SpiderChart extends React.PureComponent {
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
      loading: false,
      mySubTitle: props.subtitle ? props.subtitle : '',
      myData: props.data ? props.data : [],
      myXAxis: props.xAxis ? props.xAxis : [],
    };
  }

  // /**
  //  *
  //  */
  // componentDidMount() {
  //   this._reload();
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
    });
  }

  /**
   *
   * @param {object} r
   * @param {Function} callback
   * @private
   */
  _resultReceived(r, callback = () => {
  }) {
    this.setState({
      mySubTitle: r.subtitle,
      myData: r.data,
      myXAxis: r.xAxis,
    }, callback);
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  _reload() {
    this.setState({loading: true}, () => {
      this.sleep(500).then(() => {
        this.props.run((r) => this._resultReceived(r, () => {
          this.setState({loading: false});
        }));
      });
    });
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
    } = this.props;
    let {
      myData,
      myXAxis,
      mySubTitle,
      loading,
    } = this.state;

    return (
      !app._.isEmpty(myData) && <DashboardCard
        title={app.translate('routes.home.dashboard.SpiderChart CardView Title')}
        loading={loading}
        reload={this._reload}

      >
        <Spider
          title={title}
          subTitle={mySubTitle}
          xAxisCategory={myXAxis}
          yAxisTitle={yAxisTitle}
          style={style}
          series={myData}
        />
      </DashboardCard>
    );
  }
}
