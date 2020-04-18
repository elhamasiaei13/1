import React from 'react';
import PropTypes from 'prop-types';
import Spin from 'components/common/Spin';
import PositionsList from 'routes/Home/Requests/Procedure/Form/Applicants';
import {Card, Button, Row, Col, Modal, Checkbox} from 'antd';
import PersonnelList from './components/PersonnelList';
import DatePicker from 'components/common/DatePicker';

@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    showDateFromDateTo: PropTypes.bool,
  };

  /**
   *
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      saving: false,
      users: [],
      showModal: false,
      start: '',
      end: '',
    };
  }

  /**
   *
   * @return {Array}
   * @private
   */
  get _users() {
    return this.state ? this.state.users : [];
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  get _selectedOnlyUsers() {
    return [];
  }

  /**
   *
   * @return {Array}
   * @private
   */
  get _positions() {
    return this.state ? this.state.positions : [];
  }

  /**
   *
   * @return {Array}
   * @private
   */
  get _selectedUsers() {
    return this.personnelList.selected();
  }

  /**
   *
   * @return {Array}
   * @private
   */
  get _selectedPositions() {
    return this.positionsList.selected();
  }

  /**
   *
   * @param {Object} err
   * @private
   */
  _loaded(err) {
    // if (!err) {
    this.setState({
      loading: false,
    });
    // }
  }

  /**
   *
   * @private
   */
  _submit() {
    this._submiting(this._submited);
  }

  /**
   *
   * @param  {Function} [callback=(function())]
   * @private
   */
  _submiting(callback = () => {
  }) {
    this.setState({
      saving: true,
    }, () => callback());
  }

  /**
   *
   * @param  {Object} err
   * @param  {Function} [callback=(function())]
   * @private
   */
  _submited(err, callback = () => {
  }) {
    this.setState({
      saving: false,
    }, () => !err && callback());
  }

  _showModal(e) {
    const {showDateFromDateTo} = this.props;
    if (showDateFromDateTo) {
      this.setState({showModal: true});
    } else {
      this._submit();
    }
  }

  _onCancel() {
    this.setState({showModal: false});
  }

  _onChange(value, type) {
    if (value === true) {
      if (type === 'start') {
        this.setState({start: ''});
      } else {
        this.setState({end: ''});
      }
    } else {
      if (value !== false) {
        if (type === 'start') {
          this.setState({start: value});
        } else {
          this.setState({end: value});
        }
      }
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, start, end, showModal} = this.state;
    const {onCancel} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Card
          title={app.translate('components.classes.assignment.Assignment')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                disabled={saving}
                onClick={() => onCancel()}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button
                type="primary"
                loading={saving}
                onClick={this._showModal}
              >
                {app.translate('main.Submit')}
              </Button>
            </Button.Group>
          }
          style={{
            height: '100%',
          }}
        >

          <Row
            gutter={16}
            style={{
              height: '100%',
              margin: 0,
            }}
          >

            <Col
              md={12}
              style={{
                height: '100%',
              }}
            >
              <PersonnelList
                reference={(input) => this.personnelList = input}
                selected={this._users}
                users={this._selectedOnlyUsers}
                deletable={false}
              />
            </Col>

            <Col
              md={12}
              style={{
                height: '100%',
              }}
            >
              <PositionsList
                title={app.translate('routes.home.basic.organization-chart.Positions')}
                ref={(input) => this.positionsList = input && input.getWrappedInstance()}
                selected={this._positions}
              />
            </Col>

          </Row>
          <Modal
            onOk={this._submit}
            onCancel={() => this._onCancel()}
            okText={app.translate('main.Submit')}
            cancelText={app.translate('main.Cancel')}
            visible={showModal}
            title={app.translate('main.Apply Date')}>
            <Row
              gutter={16}
              style={{margin: 0}}
            >
              <Col sm={12}>
                <Checkbox
                  defaultChecked={start !== '' ? false : true}
                  onChange={(e) => this._onChange(e.target.value, 'start')}>
                  {app.translate('main.FromStart')}
                </Checkbox>
                <DatePicker
                  value={start}
                  disabled={start !== '' ? false : true}
                  onChange={(value) => this._onChange(value, 'start')}
                  />
              </Col>
              <Col sm={12}>
                <Checkbox
                  defaultChecked={end !== '' ? false : true}
                  onChange={(e) => this._onChange(e.target.value, 'end')}>
                  {app.translate('main.ToEnd')}
                </Checkbox>
                <DatePicker
                  value={end}
                  disabled={end !== '' ? false : true}
                  onChange={(value) => this._onChange(value, 'end')}
                />
              </Col>
            </Row>
          </Modal>
        </Card>
      </Spin>
    );
  }
}
