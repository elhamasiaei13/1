import React from 'react';
import Clock from 'components/common/Charts/Clock/Clock';
import DashboardCard from '../common/DashboardCard';

@autobind
/**
 *
 */
export default class ClockChart extends React.PureComponent {

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    let now = new Date();

    this.state = {
      hours: now.getHours() + now.getMinutes() / 60,
      minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
      seconds: now.getSeconds() * 12 / 60,
    };
  }

  resultReceived(r) {
    this.setState(r);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    let now = new Date();
    this.setState({
      hours: now.getHours() + now.getMinutes() / 60,
      minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
      seconds: now.getSeconds() * 12 / 60,
    });

  }

  render() {
    let {
      hours,
      minutes,
      seconds,
    } = this.state;

    return (
      <DashboardCard
        title=""
      >
        <Clock
          time={{
            hours,
            minutes,
            seconds,
          }}
          style={{
            height: '430px',
          }}
        />
      </DashboardCard>
    );
  }
}
