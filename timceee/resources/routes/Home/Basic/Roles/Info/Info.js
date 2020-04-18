import React from 'react';
import {Form, Row, Col} from 'antd';
import PropTypes from 'prop-types';
import TreeView from 'components/common/TreeView';

@autobind
/**
 *
 */
export default class Info extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    permissions: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onChangeSearchInput: PropTypes.func,
    onPressEnter: PropTypes.func,
    onSearch: PropTypes.func,
    onTreeCheck: PropTypes.func,
    onTreeSelect: PropTypes.func,
    item: PropTypes.object,
    defaultCheckedKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
  };

  static defaultProps = {
    title: '',
    item: {},
    permissions: [],
    defaultCheckedKeys: [],
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      title,
      permissions,
      onChangeSearchInput,
      onPressEnter,
      onSearch,
      onTreeCheck,
      onTreeSelect,
      item,
      defaultCheckedKeys,
    } = this.props;

    return (
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
          <Form>
            <Form.Item
              label={app.translate('routes.home.basic.roles.Title')}
            >
              <span className="ant-form-text">{item.displayName}</span>
            </Form.Item>
            <Form.Item
              label={app.translate('routes.home.basic.roles.Description')}
            >
              <span className="ant-form-text">{item.description}</span>
            </Form.Item>
          </Form>
        </Col>
        <Col
          sm={24}
          md={12}
          style={{
            height: 'calc(100% - 32px)',
          }}
        >
          <TreeView
            title={title}
            titleKeys={['name']}
            checkable
            disableAll
            onChangeSearchInput={onChangeSearchInput}
            onPressEnter={onPressEnter}
            onSearch={onSearch}
            onCheck={onTreeCheck}
            onSelect={onTreeSelect}
            treeData={permissions}
            defaultCheckedKeys={defaultCheckedKeys}
            expandedKeys={defaultCheckedKeys}
            defaultExpandedKeys={['0']}
            checkAllButton
           // renderItem={(text, item) => text
            // app.translate(`routes.home.basic.roles.${text}`)
            //   app.translate(`routes.home.basic.roles.user`)
            // }
          />
        </Col>
      </Row>
    );
  }
}
