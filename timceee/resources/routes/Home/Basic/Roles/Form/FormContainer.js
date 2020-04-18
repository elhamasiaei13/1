import React from 'react';
import {Button, Card, Row, Col, Tooltip} from 'antd';
import TreeView from 'components/common/TreeView';
import PropTypes from 'prop-types';
import Form from './Form';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class FormContainer extends React.PureComponent {
  static propTypes = {
    ruleTitle: PropTypes.string,
    onChangeSearchInput: PropTypes.func,
    onPressEnter: PropTypes.func,
    onSearch: PropTypes.func,
    onTreeCheck: PropTypes.func,
    onTreeSelect: PropTypes.func,
    item: PropTypes.object,
    role: PropTypes.object,
    permissions: PropTypes.arrayOf(
      PropTypes.object,
    ),
    defaultCheckedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    cancelOnTouch: PropTypes.func,
    submitOnTouch: PropTypes.func,
  };

  static defaultProps = {
    item: {},
    role: {},
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  formValue() {
    return {
      name: this.form.titleValue(),
     // roleId: null,
      displayName: this.form.titleValue(),
      color: this.form.colorValue(),
      description: this.form.descriptionValue(),
      permissions: this.treeView.selected(),
    };
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      role,
      ruleTitle,
      permissions,
      onChangeSearchInput,
      onPressEnter,
      onSearch,
      onTreeCheck,
      onTreeSelect,
      item,
      cancelOnTouch,
      submitOnTouch,
      defaultCheckedKeys,
    } = this.props;

    return (
      <Card
        title={item.displayName ? app.translate('routes.home.basic.roles.Edit Role', {title: item.displayName}) : app.translate('routes.home.basic.roles.New Role')}
        style={{
          height: '100%',
        }}
        extra={
          <Button.Group>
            <Button
              type="default"
              onClick={()=>cancelOnTouch()}
            >{app.translate('main.Cancel')}
            </Button>
            <Button
              type="primary"
              onClick={submitOnTouch}
            >
              {app.translate('main.Submit')}
            </Button>
          </Button.Group>
        }
      >
        <Row
          gutter={16}
          style={{
            height: '100%',
          }}
        >
          <Col
            className="border-end"
            sm={24}
            md={12}
            style={{
              height: '100%',
            }}
          >
            <Form
              title={item.id ? role.displayName:''}
              description={item.id ? role.description:''}
              color={item.id ? role.color:'#cccccc'}
              ref={(input) => this.form = input}
            />

          </Col>
          <Col
            sm={24}
            md={12}
            style={{
              height: 'calc(100% - 32px)',
            }}
          >
            <TreeView
              titleKeys={['name']}
              title={ruleTitle}
              checkable
              onChangeSearchInput={onChangeSearchInput}
              onPressEnter={onPressEnter}
              onSearch={onSearch}
              onCheck={onTreeCheck}
              onSelect={onTreeSelect}
              treeData={permissions}
              defaultCheckedKeys={defaultCheckedKeys}
              defaultExpandedKeys={['0']}
              checkAllButton
              // renderItem={(text) => app.translate(`routes.home.basic.roles.${text}`)}
              ref={(input) => this.treeView = input}
              jsSearch={true}
            />
          </Col>
        </Row>
      </Card>

    );
  }
}
