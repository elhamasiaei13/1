import React from 'react';
import Pie from 'components/common/Charts/Pie/Pie';
import {connect} from 'react-redux';
import {run} from './Action';
import DashboardCard from '../common/DashboardCard';

@connect(null, {
  run,
})
@autobind
/**
 *
 */
export default class PieChart extends React.PureComponent {

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      absents: 0,
      absentsData: null,
      presents: 0,
      presentsData: null,
      assignees: 0,
      assigneesData: null,
      dischargeds: 0,
      dischargedsData: null,
      loading: false,
    };
  }


  /**
   *
   */
  componentDidMount() {
    this._reload();
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState(np);
  }

  _reload() {
    this.setState({loading: true}, () => {
      this.props.run((r) => this.resultReceived(r, () => {
        this.setState({loading: false});
      }));
    });
  }

  resultReceived(r, callback = () => {
  }) {
    let absentsData = [];
    let presentsData = [];
    let assigneesData = [];
    let dischargedsData = [];
    let conter = 0;

    app._.map(r.absents.users, (user) => {
      conter++;
      absentsData.push(<div className="username" key={user.personnelId}><span>{conter}.</span> {user.firstName} {user.lastName} ({user.personnelId})</div>);
    });
    conter=0;
    app._.map(r.presents.users, (user) => {
      conter++;
      presentsData.push(<div className="username" key={user.personnelId}><span>{conter}.</span> {user.firstName} {user.lastName} ({user.personnelId})</div>);
    });
    conter=0;
    app._.map(r.assignees.users, (user) => {
      conter++;
      assigneesData.push(<div className="username" key={user.personnelId}><span>{conter}.</span> {user.firstName} {user.lastName} ({user.personnelId})</div>);
    });
    conter=0;
    app._.map(r.dischargeds.users, (user) => {
      conter++;
      dischargedsData.push(<div className="username" key={user.personnelId}><span>{conter}.</span> {user.firstName} {user.lastName} ({user.personnelId})</div>);
    });

    this.setState({
      absents: r.absents.count,
      absentsData,
      presents: r.presents.count,
      presentsData,
      assignees: r.assignees.count,
      assigneesData,
      dischargeds: r.dischargeds.count,
      dischargedsData,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */

  render() {
    let {
      absents,
      absentsData,
      presents,
      presentsData,
      assignees,
      assigneesData,
      dischargeds,
      dischargedsData,
      loading,
    } = this.state;

    return (
      <DashboardCard
        title={app.translate('routes.home.dashboard.PieChart CardView Title')}
        loading={loading}
        reload={this._reload}
      >
        <Pie
          title={app.translate('routes.home.dashboard.PieChart Title')}
          subTitle="test"
          series={
            [{
              name: 'نفر',
              colorByPoint: true,
              data: [{
                name: 'حاضرین',
                y: presents,
                modal: presentsData,
              }, {
                name: 'غائبین',
                y: absents,
                modal: absentsData,
              }, {
                name: 'ماموریت',
                y: assignees,
                modal: assigneesData,
              }, {
                name: 'مرخصی',
                y: dischargeds,
                modal: dischargedsData,
              }],
            }]
          }
        />
      </DashboardCard>
    );
  }
}
