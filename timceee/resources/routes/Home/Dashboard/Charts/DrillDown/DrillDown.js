import React from 'react';
import DrillDown from 'components/common/Charts/DrillDown/DrillDown';
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
export default class DrillDownChart extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    tooltipText: PropTypes.string,
    yAxisTitle: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.object,
    ),
    drill: PropTypes.array,
    style: PropTypes.object,
    run: PropTypes.func,
  };

  static defaultProps = {
    config: {},
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      mySubTitle: props.subtitle ? props.subtitle : '',
      myData: props.data ? props.data : [],
      myDataDrill: props.drill ? props.drill : [],
      loading: false,
    };
  }

  // /**
  //  *
  //  */
  componentDidMount() {
    this._reload(false);
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      mySubTitle: (np.subtitle ? np.subtitle : ''),
      myData: (np.data ? np.data : []),
      myDataDrill: (np.drill ? np.drill : []),
    });
  }


  _reload(getData = true) {
    this.setState({loading: true}, () => {
      let now = new Date();
      let date = now.toDateString();
      let loadDate = app.local.load('chartDateDrill');
      let loadResult = app.local.load('drill');
      let _getData = app.local.load('getDrill');
      if ((!app._.isEqual(loadDate, date) || app._.isEmpty(loadResult) || getData) && app._.isEmpty(_getData)) {
        app.local.save('getDrill', date);
        this.props.run((r) => DrillDownChart.resultReceived(r, (state) => {
          app.local.save(`drill`, r);
          app.local.save(`chartDateDrill`, date);
          app.local.remove('getDrill');
          this.setState(state);
          this.setState({loading: false});
        }));
      } else {
        if (!app._.isEmpty(loadResult)) {
          DrillDownChart.resultReceived(loadResult, (state) => {
            this.setState(state);
            this.setState({loading: false});
          });
        }
      }
    });
  }

  /**
   *
   * @param {object} r
   * @param {Function} callback
   */
  static resultReceived(r, callback = () => {
  }) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let data = [];
    let drill = [];
    r.map((row) => {
      data.push({
        name: row.department.name,
        y: row.data.overtimes.reduce(reducer) / 60,
        drilldown: row.department.name,
      });
      drill.push({
        name: row.department.name,
        id: row.department.name,
        data: [
          [
            'فروردین',
            row.data.overtimes[0] / 60,
          ],
          [
            'اردیبهشت',
            row.data.overtimes[1] / 60,
          ],
          [
            'خرداد',
            row.data.overtimes[2] / 60,
          ],
          [
            'تیر',
            row.data.overtimes[3] / 60,
          ],
          [
            'مرداد',
            row.data.overtimes[4] / 60,
          ],
          [
            'شهریور',
            row.data.overtimes[5] / 60,
          ],
          [
            'مهر',
            row.data.overtimes[6] / 60,
          ],
          [
            'آبان',
            row.data.overtimes[7] / 60,
          ],
          [
            'آذر',
            row.data.overtimes[8] / 60,
          ],
          [
            'دی',
            row.data.overtimes[9] / 60,
          ],
          [
            'بهمن',
            row.data.overtimes[10] / 60,
          ],
          [
            'اسفند',
            row.data.overtimes[11] / 60,
          ],
        ],
      });
    });
    callback({
      mySubTitle: '',
      myData: data,
      myDataDrill: drill,
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
      config,
      tooltipText,
    } = this.props;
    let {
      myData,
      myDataDrill,
      mySubTitle,
      loading,
    } = this.state;

    return (
      <DashboardCard
        title={app.translate('routes.home.dashboard.DrillDownChart CardView Title')}
        loading={loading}
        reload={this._reload}
      >
        {!app._.isEmpty(myDataDrill) && <DrillDown
          config={config}
          title={title}
          subTitle={mySubTitle}
          style={style}
          series={[{
            name: tooltipText,
            colorByPoint: true,
            data: myData,
          }]}
          yAxisTitleText={yAxisTitle}
          drilldownsSeries={myDataDrill}

        />
        }
      </DashboardCard>
    );
  }
}
