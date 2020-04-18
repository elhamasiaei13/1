import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import {emptyPosts} from './Module';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';


@authorize
@connect(null, {
  emptyPosts,
})
@autobind
/**
 *
 */
export default class Post extends React.PureComponent {
  static propTypes = {
    emptyPosts: PropTypes.func,
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      status: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPosts();
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      post: null,
      status: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {post, status} = this.state;
    const {can} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        <Col
          sm={24}
          style={{
            height: '100%',
          }}
        >
          <List
            statusForm={status}
            activeItem={post && post.id}
            onAdd={() => this.setState({status: 'editing'})}
            onClick={(post) => can('Post@update') && this.setState({post, status: 'editing'})}
            onEdit={(post) => this.setState({post, status: 'editing'})}
            onCancel={this._onCancel}
          />
          {
            status === 'editing' &&
              <Form
                item={post}
                onCancel={this._onCancel}
              />
          }
        </Col>

      </Row>
    );
  }
}
