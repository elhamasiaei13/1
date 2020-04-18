import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, Modal} from 'antd';
import {ListContainerWrapper} from './List';
import {InfoContainerWrapper} from './Info';
import {FormContainerWrapper} from './Form';
import {destroyRole, storeRole, updateRole} from './Module';

@connect((state) => ({
  items: state.Basic.Roles.roles,
}), {
  destroyRole,
  storeRole,
  updateRole,
})
@autobind
/**
 *
 */
export default class Roles extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    destroyRole: PropTypes.func,
  };

  static defaultProps = {
    items: [],
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      active: {},
      editing: false,
      rolesList: [],
      prevForm: '',
    };
  }

  /**
   *
   * @param {Object} item
   * @param {Function} callback
   */
  handleOnDelete(item, callback = this.onCancel) {
    const {destroyRole} = this.props;
    // app.message('DELETE', 'error');
    Modal.confirm({
      title: app.translate('routes.home.basic.roles.Delete Confirm Title'),
      content: app.translate('routes.home.basic.roles.Delete Confirm Context', {title: item.name}),
      okText: app.translate('main.Delete'),
      cancelText: app.translate('main.Cancel'),
      onOk() {
        destroyRole(item.id);
        callback();
      },
      onCancel() {
      },
    });
  }

  /**
   *
   */
  handleOnAdd() {
    this.setState({
      editing: true,
      active: {},
    });
  }

  /**
   *
   * @param {Object} err
   */
  onCancel(err = undefined) {
    if (!err) {
      if (this.state.prevForm === 'info') {
        this.setState({
          editing: false,
          prevForm: '',
        });
      } else {
        this.setState({
          editing: false,
          active: {},
          prevForm: '',
        });
      }
    }
  }

  /**
   *
   * @param {object} item
   * @param {Boolean} editing
   */
  showForm(item = this.state.active, editing = false, prevForm = '') {
    this.setState({
      active: item,
      editing,
      prevForm: prevForm,
    });
  }

  /**
   *
   * @param {object} item
   */
  showInfo(item) {
    this.setState({
      active: item,
      editing: false,
      prevForm: '',
    });
  }

  /**
   *
   * @param {object} item
   */
  onItemClick(item) {
    this.showInfo(item);
  }

  /**
   *
   * @param {object} data
   */
  onSubmit(data) {
    if (this.state.active && this.state.active.id) {
      this.props.updateRole(this.state.active.id, data);
    } else {
      this.props.storeRole(data, this.onCancel);
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {active, editing} = this.state;

    return (
      <Row
        gutter={16}
        style={{
          position: 'relative',
          height: '100%',
          margin: 0,
        }}
      >
        <Col
          sm={24}
          md={8}
          style={{
            height: '100%',
          }}
        >
          <ListContainerWrapper
            activeItem={active.id}
            statusAdd={editing}
            title={app.translate('routes.home.basic.roles.Roles Lists')}
            onItemClick={this.onItemClick}
            menuItemTouch={this.handleMenuTouch}
            onAdd={this.handleOnAdd}
            onInfo={this.showInfo}
            onEdit={this.showForm}
            onDelete={this.handleOnDelete}
          />
        </Col>
        {editing ?
          <Col
            sm={24}
            md={16}
            style={{
              height: '100%',
            }}
          >
            <FormContainerWrapper
              title={app.translate('routes.home.basic.roles.Permissions')}
              item={active}
              submitOnTouch={this.onSubmit}
              cancelOnTouch={this.onCancel}
            />
          </Col> : ''
        }
        {active.id && !editing ?
          <Col
            sm={24}
            md={16}
            style={{
              height: '100%',
            }}
          >
            <InfoContainerWrapper
              title={app.translate('routes.home.basic.roles.Permissions')}
              item={active}
              editOnToush={this.showForm}
              cancelOnTouch={this.onCancel}
              deleteOnToush={this.handleOnDelete}
            />
          </Col> : ''
        }
      </Row>
    );
  }
}
