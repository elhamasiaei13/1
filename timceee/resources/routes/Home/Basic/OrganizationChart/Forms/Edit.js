import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col, Card} from 'antd';
import PersonnelList from './../../Personnel/List/ListWrapper';
import PermissionWrapper from './common/PermissionWrapper';
import Toggle from 'components/common/Toggle';
import FormInput from './common/FormInput';
import PersonnelSelected from './common/PersonnelSelected';
import Chip from 'components/common/Chip';
import MaterialIcon from 'components/common/MaterialIcon';
import Avatar from 'components/common/Avatar';
import {connect} from 'react-redux';
import {showPosition, emptyPosition} from './../Module';

@connect((state) => ({
  position: state.Basic.OrganizationChart.position,
}), {
  showPosition,
  emptyPosition,
})


@autobind
/**
 *
 */
export default class Edit extends React.PureComponent {
  static propTypes = {
    positions: PropTypes.array,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    showPosition: PropTypes.func,
    emptyPosition: PropTypes.func,
    activeItem: PropTypes.object,
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
    action: PropTypes.string,
    position: PropTypes.object,
  };

  static defaultProps = {
    positions: [],
    onCancel: () => {
    },
    onSubmit: () => {
    },
    activeItem: {},
    visible: false,
    confirmLoading: false,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);


    this.state = {
      items: props.action === 'edit' && props.position ? props.position : {},
      submitVisible: props.action === 'edit' ? props.activeItem.title.length > 3 : false,
      togglePart: props.action === 'edit' ? (props.activeItem.templateName === 'department') : false,
      positionName: props.action === 'edit' ? props.activeItem.title : '',
      selectedPersonnel: props.position.user ? [props.position.user.profile] : [],
      valueError: false,
      permissionList: props.action === 'edit' && props.position.roles ? (!app._.isEmpty(props.position.roles) && props.position.roles[0].id ? props.position.roles.pluck('id', this._toString) : (props.position.roles ? props.position.roles : [])) : [],
      togglePermission: ( props.action === 'edit' && props.activeItem.isActive && props.activeItem.isActive ),
    };
    this.submitEnable = false;
    this.stateData = this.state;
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.action === 'edit') {
      this.props.showPosition(this.props.activeItem.id);
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.position, np.position)) {
      this.setState({
        togglePart: (np.position.type === 'department'),
        items: np.position ? np.position : {},
        positionName: this.props.action === 'edit' ? np.position.displayName ? np.position.displayName : np.activeItem.title : '',
        selectedPersonnel: np.position.user ? [np.position.user.profile] : [],
        togglePermission: ( np.activeItem.isActive ? true : false ),
        permissionList: np.position.roles ? (!app._.isEmpty(np.position.roles) && np.position.roles[0].id ? np.position.roles.pluck('id', this._toString) : (np.position.roles ? np.position.roles : [])) : [],
      }, () => {
        this.stateData = this.state;
      });
    }
    this.forceUpdate();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyPosition} = this.props;
    emptyPosition();
  }

  shouldComponentUpdate(np, ns) {
    if (app._.isEqual(ns, this.stateData)) {
      this.submitEnable = false;
    } else {
      this.submitEnable = true;
    }
    return true;
  }

  /**
   *
   * @param {Number} item
   * @return {String}
   * @private
   */
  _toString(item) {
    return item.toString();
  }

  /**
   *
   * @private
   */
  _checkSubmitVisible() {
    let visible = false;
    const {valueError, togglePart, positionName, selectedPersonnel} = this.state;
    if (!valueError && (togglePart || (!togglePart && !app._.isEmpty(selectedPersonnel))) && positionName.length > 3) {
      visible = true;
    }

    this.setState({submitVisible: visible});
  }

  /**
   *
   * @param {object} item
   * @private
   */
  _onSelectPersonnel(item) {
    this.setState({selectedPersonnel: [item.profile]}, this._checkSubmitVisible);
  }

  /**
   *
   * @private
   */
  _unSelectPersonnel() {
    this.setState({selectedPersonnel: []}, this._checkSubmitVisible);
  }

  /**
   *
   * @param {Boolean} flag
   * @private
   */
  _togglePart(flag) {
    this.setState({togglePart: flag}, this._checkSubmitVisible);
  }

  /**
   *
   * @param {Boolean} flag
   * @private
   */
  _togglePermission(flag) {
    this.setState({togglePermission: flag});
  }

  /**
   *
   * @param {element} e
   * @param {boolean} error
   * @private
   */
  _onChange(e, error) {
    this.setState({positionName: e.target.value, valueError: error}, this._checkSubmitVisible);
  }

  /**
   *
   * @param {Array} selectedList
   * @param {element} e
   * @private
   */
  _onTreeViewSelect(selectedList, e) {
    this.setState({permissionList: selectedList}, this._checkSubmitVisible);
  }

  /**
   *
   * @private
   */
  _onSubmit() {
    const {onSubmit, activeItem, action} = this.props;
    this.setState({confirmLoading: true});
    let data;
    const {togglePart, positionName, selectedPersonnel, togglePermission, permissionList} = this.state;

    data = {
      active: 1,
      type: togglePart ? 'department' : 'post',
      name: positionName,
      positionId: action === 'edit' ? activeItem.parent ? parseInt(activeItem.parent) : null : activeItem.id,
      userId: selectedPersonnel && !togglePart ? selectedPersonnel[0].userId : null,
      childAccesses: togglePermission,
      roles: permissionList,
      user: selectedPersonnel && !togglePart ? selectedPersonnel[0] : null,
    };
    onSubmit({position: data});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {visible, confirmLoading, onCancel, positions} = this.props;
    const {togglePart, submitVisible, selectedPersonnel, positionName, permissionList, togglePermission} = this.state;
   // console.log(selectedPersonnel);
    return (
      <Modal
        title={app.translate('routes.home.basic.organization-chart.Modal')}
        visible={visible}
        onOk={this.handleOk}
        maskClosable={!submitVisible || !this.submitEnable}
        onCancel={onCancel}
        className="modal-full"
        footer={[
          <Button key="submit" onClick={this._onSubmit} type="primary" loading={confirmLoading}
                  disabled={!submitVisible || !this.submitEnable}>{app.translate('main.Submit')}</Button>,
          <Button key="onCancel" onClick={onCancel}>{app.translate('main.Cancel')}</Button>,
        ]}
      >
        <Row
          style={{
            height: '100%',
          }}
        >
          <Col
            style={{
              height: '100%',
            }}
            sm={24} md={12}>

            <Card
              title={app.translate('routes.home.basic.organization-chart.Position Name')}
              style={{
                height: '128px',
              }}
            >
              <FormInput
                positions={positions}
                onChange={this._onChange}
                onToggle={this._togglePart}
                value={positionName}
                department={togglePart}
              />
              <Toggle
                style={{
                  display: 'none',
                }}
                label={app.translate('routes.home.basic.organization-chart.Apply sub-branch access')}
                onChange={this._togglePermission}
                checked={togglePermission}
              />
            </Card>
            <PermissionWrapper
              onSelect={this._onTreeViewSelect}
              defaultSelectedKeys={permissionList}
            />
          </Col>
          <Col sm={24} md={12}
               style={{
                 height: '100%',
               }}
          >
            {!togglePart &&
            <span className="jList">
              {/* <PersonnelSelected
                items={!app._.isEmpty(selectedPersonnel[0]) ? selectedPersonnel : undefined}
                onClick={this._unSelectPersonnel}
              />
              */}
              <PersonnelList
                onClick={this._onSelectPersonnel}
                height={'calc(100%)'}
                activeItem={!app._.isEmpty(selectedPersonnel[0]) ? selectedPersonnel[0].userId : undefined}
                extra={!app._.isEmpty(selectedPersonnel[0]) &&
                <Chip>
                  <Avatar
                    src={selectedPersonnel[0].avatar}
                    text={`${selectedPersonnel[0].firstName} ${selectedPersonnel[0].lastName}`}
                  />
                  {selectedPersonnel[0].firstName} {selectedPersonnel[0].lastName}
                  <MaterialIcon
                    name="close-circle"
                    onClick={() => this._unSelectPersonnel()}
                  />
                </Chip>
                }
              />
            </span>
            }
          </Col>
        </Row>
      </Modal>
    );
  }
}
