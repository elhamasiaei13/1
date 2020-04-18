import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Button, Form as AntdForm, Input, Modal, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';
import Applicants from './Applicants';
import Requests from './Requests';
import Levels from './Levels';
import {show, emptyProcedure, store, update} from './../Module';

@connect((state) => ({
  procedure: state.Requests.Procedure.procedure,
}), {
  show,
  empty: emptyProcedure,
  store,
  update,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    show: PropTypes.func,
    empty: PropTypes.func,
    store: PropTypes.func,
    update: PropTypes.func,
    procedure: PropTypes.object,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    item: {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      procedure: {},
      error: false,
      loading: true,
      saving: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {item, show} = this.props;

    if (item.id) {
      show(item.id, {
        includes: [
          'positions',
          'types',
          'levels.approvers',
        ],
      }, (err) => !err && this.setState({loading: false}));
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if ((np.procedure.id && !this.state.procedure.id) || !app._.isEqual(this.props.procedure, np.procedure)) {
      this.setState({procedure: np.procedure});
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.empty();
  }

  /**
   *
   * @private
   */
  _onStatusChange() {
    let procedure = app._.cloneDeep(this.state.procedure);

    procedure.active = procedure.active === 0 ? 1 : 0;

    this.setState({
      procedure,
    });
  }

  /**
   *
   * @private
   */
  _onSubmit() {
    const {error} = this.state;
    const {store, update, onCancel} = this.props;
    if (this.state.procedure && this.state.procedure.name && this.state.procedure.name.length > 0) {
      this.setState({
        saving: true,
      }, () => {
        let procedure = app._.cloneDeep(this.state.procedure);

        procedure.levels = this.levels.levels();
        procedure.types = this.requestTypes.selected();
        procedure.positions = this.applicants.selected();

        if (!error && procedure.positions.length > 0 && procedure.types.length > 0 &&
          procedure.levels[0] && procedure.levels[0].approvers.length > 0) {
          if (procedure.id) {
            update(procedure.id, procedure, (err) => this.setState({saving: false}, () => !err && onCancel()));
          } else {
            store(procedure, (err) => this.setState({saving: false}, () => !err && onCancel()));
          }
        } else {
          this.setState({
            saving: false,
          });
        }
      });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, procedure, error} = this.state;
    const {onCancel} = this.props;

    return (
      <Spin
        spinning={loading}
      >
        <Card
          title={`${app.translate('routes.home.requests.procedure.Form')}${procedure.final ? ' - (ثبت نهایی)' : ''}`}
          extra={
            <Button.Group>
              <Button
                type="dashed"
                onClick={onCancel}
              >
                {app.translate('main.Cancel')}
              </Button>
              {
                !!procedure.final &&
                <Tooltip title={app.translate(procedure.active ? 'main.Enabled' : 'main.Disabled')}>
                  <Button
                    onClick={this._onStatusChange}
                  >
                    <MaterialIcon
                      name={procedure.active ? 'check' : 'close'}
                      style={{
                        color: procedure.active ? '#009688' : '#F44336',
                      }}
                    />
                  </Button>
                </Tooltip>
              }
              <Button
                type="primary"
                loading={saving}
                onClick={this._onSubmit}
              >
                {app.translate('main.Submit')}
              </Button>
              {
                procedure.id && !procedure.final && app.authorize.can('RequestWorkflow@finalSubmit') &&
                <Button
                  type="primary"
                  loading={saving}
                  onClick={() => Modal.confirm({
                    title: app.translate('main.Final Submit'),
                    content: app.translate('routes.home.requests.procedure.finalSubmitConfirm'),
                    onOk: () => this.setState({
                      procedure: {
                        ...procedure,
                        final: 1,
                      },
                    }, () => this._onSubmit()),
                  })}
                >
                  {app.translate('main.Final Submit')}
                </Button>
              }
            </Button.Group>
          }
          style={{height: '100%'}}
        >
          <Row
            gutter={16}
            style={{height: '100%'}}
          >

            <Col
              xs={24} md={12} lg={8}
            >
              <AntdForm.Item
                label={app.translate('routes.home.requests.procedure.Name')}
                help={error && app.translate('main.This field is required')}
                validateStatus={error ? 'error' : ''}
                required
                hasFeedback
              >
                <Input
                  prefix={<MaterialIcon name="alphabetical"/>}
                  value={procedure.name}
                  onChange={(event) => this.setState({
                    procedure: {
                      ...procedure,
                      name: event.target.value,
                    },
                    error: event.target.value === '',
                  })}
                  onBlur={() => this.setState({
                    error: procedure.name === '' || !procedure.name,
                  })}
                  dir="auto"
                />
              </AntdForm.Item>
            </Col>

            <Col
              xs={24} md={12} lg={16}
            >
              <AntdForm.Item
                label={app.translate('routes.home.requests.procedure.Description')}
              >
                <Input.TextArea
                  value={procedure.description}
                  onChange={(event) => this.setState({
                    procedure: {
                      ...procedure,
                      description: event.target.value,
                    },
                  })}
                  style={{
                    maxHeight: 46,
                  }}
                  dir="auto"
                />
              </AntdForm.Item>
            </Col>

            <Col
              xs={24}
              style={{height: 'calc(100% - 102px)'}}
            >

              <Row
                gutter={16}
                style={{height: '100%'}}
              >

                <Col
                  xs={24} md={12}
                  style={{marginBottom: 24}}
                >
                  <Applicants
                    ref={(input) => this.applicants = input && input.getWrappedInstance()}
                    deletable={!procedure.final}
                    selected={procedure.positions && procedure.positions.pluck('id')}
                  />
                </Col>

                <Col
                  xs={24} md={12}
                  style={{marginBottom: 24}}
                >
                  <Requests
                    ref={(input) => this.requestTypes = input}
                    deletable={!procedure.final}
                    active={!!procedure.active}
                    selected={procedure.types && procedure.types.pluck(['pivot.typeId', 'pivot.active', 'pivot.id'])}
                  />
                </Col>

                <Col
                  xs={24}
                  style={{marginBottom: 24}}
                >
                  <Levels
                    ref={(input) => this.levels = input}
                    deletable={!procedure.final}
                    active={!!procedure.active}
                    levels={procedure.levels}
                  />
                </Col>

              </Row>

            </Col>

          </Row>
        </Card>
      </Spin>
    );
  }
}
