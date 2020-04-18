import React from 'react';
import {connect} from 'react-redux';
import {index} from 'routes/Home/Attendance/Clocking/Module';
import {showRequestsStatus, emptyRequestStatus} from './../Module';
import PropTypes from 'prop-types';
import Clocking from 'routes/Home/Attendance/Clocking';
import {Row, Col, Card, Button} from 'antd';
import jMoment from 'moment-jalaali';
import MaterialIcon from 'components/common/MaterialIcon';

@connect((state) => ({
  request: state.Requests.Status.request,
  requestTypes: state.Requests.Dashboard.requestTypes,
  clockings: state.Attendance.Clocking.clockings,
}), {
  index,
  emptyRequestStatus,
  showRequestsStatus,
})

@autobind
/**
 *
 */
export default class RequestStatusClocking extends React.PureComponent {
  static propTypes = {
    clockings: PropTypes.arrayOf(
      PropTypes.object,
    ),
    requestTypes: PropTypes.arrayOf(
      PropTypes.object,
    ),
    record: PropTypes.object,
    index: PropTypes.func,
    onCancel: PropTypes.func,
    showRequestsStatus: PropTypes.func,
    emptyRequestStatus: PropTypes.func,
    onMenuTouch: PropTypes.func,
  };
  static defaultProps = {
    onCancel: undefined,
    record: {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      render: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.props.showRequestsStatus(this.props.record.id, {
      includes: [
        'values',
        'values.field',
        'senderUser.profile',
        'senderPosition',
      ],
    }, () => {
      this.setState({render: true});
    });
  }


  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.request, this.props.request)) {
      this.setState({render: false}, () => {
        let defaultValueDateTimeFilter = [this.findValueFromRequestvalue(np.request.values, 'dateFrom'), this.findValueFromRequestvalue(np.request.values, 'dateTo')];
        let filters = [
          {
            key: 'user_id',
            value: [this.props.record.userId],
            operator: 'in',
          },
        ];
        if (!app._.isEmpty(defaultValueDateTimeFilter)) {
          filters.push({
              key: 'betweenDates',
              value: defaultValueDateTimeFilter,
              operator: 'bt',
            },
          );
        }
        let params = {
          filterGroups: [
            {
              filters: filters,
            },
          ],
          sort: [{key: 'datetime', direction: 'ASC'}],
        };
        this.props.index(params, () => {
          this.setState({render: true});
        });
      });

    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRequestStatus();
  }

  findValueFromRequestvalue(values, key) {
    let r = '';
    app._.map(values, (value) => {
      if (value.field && ( value.field.name === key || value.field.name === 'date' )) {
        r = value.value;
      }
    });
    return r;
  }

  /**
   *
   * @param {Object} items
   * @param {Object} key
   * @return {Object|undefined}
   */
  findObject(items, key) {
    let result = app._.find(items, key);
    let x;
    if (result === undefined) {
      for (x in items) {
        if (!app._.isEmpty(items[x].children)) {
          let result = this.findObject(items[x].children, key);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return undefined;
    } else {
      return result;
    }
  }


  /**
   *
   * @param {*} request
   * @return {String}
   * @private
   */
  _requestInfo(request) {
    let _return = [];
    let _requestType = this.findObject(this.props.requestTypes, {id: request.requestTypeId});
    _return.push(
      <Row key='requestType'>
        <Col sm={8}>{app.translate(`routes.home.requestsRequest Type`)}</Col>
        <Col sm={16}>{(_requestType !== undefined) && _requestType.rule ? _requestType.rule.name : 'undefined'}</Col>
      </Row>,
    );
    app._.map(request.values, (_value) => {
      _return.push(
        <Row key={_value.field.name}>
          <Col sm={8}>{app.translate(`routes.home.requests.${_value.field.name}`)} :</Col>
          <Col sm={16}>
            {
              (_value.field.name === 'date' || _value.field.name === 'dateTo' || _value.field.name === 'dateFrom')
                ? jMoment(_value.value, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD')
                : _value.value
            }
          </Col>
        </Row>,
      );
    });
    return _return;
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {record, clockings, onCancel, onMenuTouch, request} = this.props;
    const {render} = this.state;
    return (
      <Card
        title={app.translate('routes.home.requests.status.Title')}
        extra={onCancel &&
        <Button.Group>
          <Button
            onClick={() => onCancel()}
          >
            {app.translate('main.Cancel')}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onMenuTouch([record], {key: '2'});
            }}
          >
            {app.translate('routes.home.requests.status.Accept')}
          </Button>
        </Button.Group>
        }
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
      >
        {render &&
        <Row
          style={{
            overflowY: 'auto',
            height: '100%',
          }}
        >
          <Col
            sm={20}
            offset={2}
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              marginBottom: '8px',
            }}>
            <Row>
              <Col sm={24} md={12}>
                <Row>
                  <Col sm={8}>{app.translate(`routes.home.requestsSender`)} :</Col>
                  <Col sm={16}>{record.senderPosition.name} ({record.senderUser.profile.firstName} {record.senderUser.profile.lastName})</Col>
                </Row>
                <Row>
                  <Col sm={8}>{app.translate(`routes.home.requestsCreatedAt`)} :</Col>
                  <Col sm={16}>{jMoment(record.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')}</Col>
                </Row>
                <Row>
                  <Col sm={8}>{app.translate(`routes.home.requestsKey`)}</Col>
                  <Col sm={16}>{record.key}</Col>
                </Row>
              </Col>
              <Col sm={24} md={12}>
                {
                  this._requestInfo(request)
                }
              </Col>
            </Row>
            <br/>
            {app.translate(`routes.home.requestsDescription`)} : {record.description}
          </Col>
          <Col
            sm={24}
            style={{
              height: 'calc(100% - 160px)',
            }}
          >

            <Clocking
              personnel={[record.senderUser]}
              items={clockings}
              onCancel={null}
            />
          </Col>
        </Row>
        }
      </Card>
    );
  }
}


