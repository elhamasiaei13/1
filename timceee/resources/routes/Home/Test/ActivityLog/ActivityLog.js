import React from 'react';
import {connect} from 'react-redux';
import {Card, Button, Row, Col} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
export default class ActivityLog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $('.appLogs').scroll(function () {
      let topHeight = 100;
      $('.logDate').each(function () {
        if (($(this)[0].offsetTop + $(this)[0].offsetHeight) > $('.appLogs')[0].scrollTop && ($(this)[0].offsetTop) < $('.appLogs')[0].scrollTop) {
          $(this).children('.logDate span').css({top: ($('.appLogs')[0].scrollTop - $(this)[0].offsetTop ) + 28});
        } else {
          $(this).children('.logDate span').css({top: 'auto'});
        }
      });

    });
  }


  render() {
    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          overflow: 'auto',
          margin: '0',
        }}>
        <Col sm={24}
             style={{
               height: '100%',
             }}
        >
          <Card
            title="رویداد های اخیر"
            style={{
              height: '100%',
              position: 'relative',
            }}
          >
            <ul className="appLogs">
              <li className="logDate">
                <span>26 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>25 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>24 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>23 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>22 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>22 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>21 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>20 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>19 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="logDate">
                <span>18 مرداد 1369</span>
                <ul className="logsDate">
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                  <li className="log">
                  <span
                    className="icon"
                  >
                    <MaterialIcon name="delete" size="tiny"/>
                  </span>
                    <div className="content">
                      User <span>Javad Shariati</span> Create <span>user</span><br/><span>5:23 Am</span>
                    </div>
                  </li>
                </ul>
              </li>
              <div style={{
                textAlign: 'center',
              }}>
                <Button
                  type="default"
                  style={{
                    background: '#ff7329',
                    color: '#fff',
                  }}>نمایش بیشتر رویداد ها</Button>
              </div>
            </ul>
          </Card>
        </Col>
      </Row>
    );
  }
}
