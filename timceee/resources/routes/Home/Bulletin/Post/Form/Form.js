import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Modal, Select, Form as AntdForm, Input} from 'antd';
import {show, emptyPost, store, update} from './../Module';
import {index} from './../../Category/Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';
import TreeView from 'components/common/TreeView';
import DatePicker from 'components/common/DatePicker';
import Toggle from 'components/common/Toggle';
import Editor from 'components/common/Editor';
import uuidv1 from 'uuid/v1';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  categories: state.Bulletin.Category.categories,
  post: state.Bulletin.Post.post,
  currentUser: state.Auth.currentUser,
}), {
  show,
  emptyPost,
  store,
  update,
  index,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.func,
    emptyPost: PropTypes.func,
    item: PropTypes.object,
    post: PropTypes.object,
    currentUser: PropTypes.object,
    categories: PropTypes.arrayOf(PropTypes.object),
    store: PropTypes.func,
    update: PropTypes.func,
    index: PropTypes.func,
  };

  static defaultProps = {};

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      statuses: [],
      showAddForm: false,
      error: {},
      receiving: true,
      loading: false,
      saving: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {show, item, index} = this.props;
    this.setState({
      receiving: true,
    });
    index({}, () => {
      if (item) {
        show(item.id, {}, () => {
          this.setState({
            receiving: false,
          });
        });
      } else {
        this.setState({
          receiving: false,
        });
      }
    });
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.item, this.props.item)) {
      this.setState({
        receiving: true,
      }, () => {
        if (np.item) {
          np.show(np.item.id, {}, () => {
            this.setState({
              receiving: false,
            });
          });
        } else {
          this.setState({
            receiving: false,
          });
        }
      });
    }
    if (!app._.isEqual(np.post, this.state.post)) {
      this.setState({
        post: np.post,
        error: {
          title: !(np.post && np.post.title),
          description: !(np.post && np.post.description),
        },
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyPost} = this.props;

    emptyPost();
  }


  /**
   *
   * @private
   */
  _submit() {
    const {post} = this.state;
    const {store, update, onCancel, currentUser} = this.props;
    this.setState({
      saving: true,
    }, () => {
      let _post = {};
      _post.senderUserId = currentUser.id;
      _post.title = post.title;
      _post.description = post.description;
      _post.shortDesc = post.shortDesc;
      _post.postCategoryId = post.postCategoryId;
      _post.files = [];
      _post.layoutId = 1;
      _post.widgetId = 1;
      if (post.id) {
        update(post.id, _post, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      } else {
        store(_post, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      }
    });
  }

  /**
   *
   * @param {Object} data
   * @private
   */
  _setValue(data) {
    this.setState((old) => ({
      post: {
        ...old.post,
        ...data,
      },
    }));
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _renderCategory() {
    let items = [];
    const {categories} = this.props;
    if (categories) {
      categories.map((item) => {
        items.push(<Select.Option key={uuidv1()} value={`${item.id}`}>{item.title}</Select.Option>);
      });
    }

    return items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, post, statuses, events, showAddForm, error} = this.state;
    const {onCancel} = this.props;
    return (
      <Modal
        onOk={() => {
          if (!error.title) {
            if (post.title) {
              this._submit();
            } else {
              if (!post.title) {
                this.setState((state) => ({
                  error: {
                    ...state.error,
                    title: true,
                  },
                }));
              }
            }
          }
        }}
        onCancel={onCancel}
        okText={app.translate('main.Submit')}
        cancelText={app.translate('main.Cancel')}
        width='60%'
        visible={!receiving}
        title={app.translate('routes.home.bulletin.Post Form')}
      >
        <Spin
          wrapperClassName="wrapper"
          spinning={receiving}
        >
          <Row
            gutter={16}
            style={{
              height: '100%',
              margin: 0,
            }}
          >

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.bulletin.Post Title')}
                help={error.title && app.translate('main.This field is required')}
                validateStatus={error.title ? 'error' : ''}
                required
                hasFeedback
              >
                <Input
                  type="text"
                  prefix={<MaterialIcon name="alphabetical"/>}
                  value={post && post.title}
                  onChange={(event) => this.setState({
                    post: {
                      ...post,
                      title: event.target.value,
                    },
                    error: {
                      ...error,
                      title: event.target.value === '',
                    },
                  })}
                  onBlur={() => this.setState((state) => ({
                    error: {
                      ...state.error,
                      title: post.title === '' || !post.title,
                    },
                  }))}
                />
              </AntdForm.Item>
            </Col>
            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.bulletin.Post Sort Description')}
              >
                <Input.TextArea
                  value={post && post.shortDesc}
                  onChange={(e) => this._setValue({shortDesc: e.target.value})}
                />
              </AntdForm.Item>
            </Col>
            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.bulletin.Category')}
              >
                <Select
                  value={post && post.postCategoryId ? `${post.postCategoryId}` : ''}
                  onChange={(value) => this._setValue({postCategoryId: value})}
                >
                  {this._renderCategory()}
                </Select>
              </AntdForm.Item>
            </Col>
            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.bulletin.Post Description')}
              >
                <Editor
                  name='description'
                  value={post && post.description ? `${post.description}` : ''}
                  onChange={(value) => this._setValue({description: value})}
                />
              </AntdForm.Item>
            </Col>
          </Row>

        </Spin>
      </Modal>
    );
  }
}
