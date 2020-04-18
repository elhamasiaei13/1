import React from 'react';
import FixedPlacement from 'components/common/Charts/FixedPlacement/FixedPlacement';
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
export default class FixedPlacementChart extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    xAxis: PropTypes.arrayOf(
      PropTypes.string,
    ),
    yAxisTitle: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.object,
    ),
    style: PropTypes.object,
    run: PropTypes.func,
  };

  static defaultProps = {};

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      mySubTitle: props.subtitle ? props.subtitle : '',
      myData: props.data ? props.data : [],
      myXAxis: props.xAxis ? props.xAxis : [],
      loading: false,
    };
  }


  /**
   *
   */
  // componentDidMount() {
  //  this._reload();
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

  _reload() {
    this.setState({loading: true}, () => {
      this.props.run((r) => this.resultReceived(r, () => {
        this.setState({loading: false});
      }));
    });
  }
  /**
   *
   * @param {object} r
   * @param {Function} callback
   */
  resultReceived(r, callback = ()=>{}) {
    this.setState({
      mySubTitle: r.subtitle,
      myData: r.data,
      myXAxis: r.xAxis,
    }, callback);
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
        title={app.translate('routes.home.dashboard.FixedPlacementChart CardView Title')}
        loading={loading}
        reload={this._reload}
      >
      <FixedPlacement
        title={title}
        subTitle={mySubTitle}
        style={style}
        series={myData}
        yAxisProp={[{
          min: 0,
          title: {
            text: yAxisTitle,
          },
          opposite: true,
        }]}
        xAxisCategories={myXAxis}

      />
      </DashboardCard>
    );
  }
}
