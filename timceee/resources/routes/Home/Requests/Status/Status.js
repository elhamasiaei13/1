import React from 'react';
import {connect} from 'react-redux';
import {accept, emptyRequestsStatus} from './Module';
import {Row, Col, Modal} from 'antd';
import {StatusTableContainerWrapper} from './StatusTable';
import PropTypes from 'prop-types';
import RequestStatusClocking from './RequestStatusClocking';
import Info from './../History/Info/Info';

@connect(null, {
  accept,
  emptyRequestsStatus,
})
@autobind
/**
 *
 */
export default class Status extends React.PureComponent {
  static propTypes = {
    accept: PropTypes.func,
    emptyRequestsStatus: PropTypes.func,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      title: app.translate('routes.home.requests.Requests'),
      active: [],
      value: {},
      visible: false,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRequestsStatus();
  }

  /**
   *
   * @param {object} record
   * @param {object} menuItem
   */
  onMenuTouch(record, menuItem) {
    switch (menuItem.key) {
      case '1':
        this._Info(record);
        break;
      case '2':
        this._onAccept(record);
        break;
    }
  }

  /**
   *
   * @param {object} record
   * @private
   */
  _Info(record) {
    this.setState({
      active: record,
      visible: true,
    });
  }

  _onCancel(err = undefined, result = null, action = 'store') {
    this.setState({
      visible: false,
    });
    if (!err) {
      if (result && result.data && !app._.isEmpty(result.data)) {
        if (result.data.notice) {
          this._notice(result.data.notice.msg);
        }
        if (result.data.confirm) {
          this._confirm(result.data.confirm.msg, action);
        }
      } else {
        this.setState({
          active: [],
        });
      }
    } else {
      this.setState({
        visible: false,
        active: [],
      });
    }
  }

  _onAccept(records) {
    Modal.confirm({
      title: app.translate('routes.home.requests.Confirm'),
      content: records.length > 1 ? app.translate('routes.home.requests.status.Confirms') : app.translate('routes.home.requests.status.Confirm'),
      onOk: () => {
        this.props.accept(records.pluck('id'), this._onCancel);
      },
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {active, visible} = this.state;
    return (
      <Row
        gutter={16}
        style={{
          overflowY: 'auto',
          height: '100%',
          margin: 0,
        }}
      >
        <Col
          style={{
            overflowY: 'auto',
            height: '100%',
          }}
        >
          {app._.isEmpty(active) || active[0].done === 1 ? <span>
            <StatusTableContainerWrapper
              onInfo={this._Info}
              onAccept={this._onAccept}
              onMenuTouch={this.onMenuTouch}
            />
              {
                visible &&
                <Info
                  title={app.translate('routes.home.requests.view info')}
                  visible={visible}
                  active={active}
                  type={'info'}
                  onCancel={this._onCancel}
                />
              }
            </span>
            : <RequestStatusClocking
              record={active[0]}
              onCancel={this._onCancel}
              onMenuTouch={this.onMenuTouch}
            />

          }
        </Col>

      </Row>
    );
  }
}

