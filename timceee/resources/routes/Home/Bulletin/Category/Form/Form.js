import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input} from 'antd';
import {show, emptyCategory, store, update} from './../Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';
import TreeView from 'components/common/TreeView';
import DatePicker from 'components/common/DatePicker';
import Toggle from 'components/common/Toggle';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  category: state.Bulletin.Category.category,
}), {
  show,
  emptyCategory,
  store,
  update,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.func,
    emptyCategory: PropTypes.func,
    item: PropTypes.object,
    category: PropTypes.object,
    store: PropTypes.func,
    update: PropTypes.func,
  };

  static defaultProps = {};

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      category: {},
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
    const {show, item} = this.props;

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
    if (!app._.isEqual(np.category, this.state.category)) {
      this.setState({
        category: np.category,
        error: {
          title: !(np.category && np.category.title),
          description: !(np.category && np.category.description),
        },
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyCategory} = this.props;

    emptyCategory();
  }


  /**
   *
   * @private
   */
  _submit() {
    const {category} = this.state;
    const {store, update, onCancel} = this.props;
    this.setState({
      saving: true,
    }, () => {
      let _category = {};
      _category.title = category.title;
      _category.description = category.description;
      if (category.id) {
        update(category.id, _category, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      } else {
        store(_category, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      }
    });
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, category, statuses, events, showAddForm, error} = this.state;
    const {onCancel} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.bulletin.Category Form')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                onClick={onCancel}
                disabled={saving}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button
                type="primary"
                loading={saving}
                disabled={!(!error.title)}
                onClick={() => {
                  if (!error.title) {
                    if (category.title) {
                      this._submit();
                    } else {
                      if (!category.title) {
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
              margin: 0,
            }}
          >

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.bulletin.Category Title')}
                help={error.title && app.translate('main.This field is required')}
                validateStatus={error.title ? 'error' : ''}
                required
                hasFeedback
              >
                <Input
                  type="text"
                  prefix={<MaterialIcon name="alphabetical"/>}
                  value={category && category.title}
                  onChange={(event) => this.setState({
                    category: {
                      ...category,
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
                      title: category.title === '' || !category.title,
                    },
                  }))}
                />
              </AntdForm.Item>
            </Col>
            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.bulletin.Category Description')}
              >
                <Input.TextArea
                  value={category && category.description}
                  onChange={(event) => this.setState({
                    category: {
                      ...category,
                      description: event.target.value,
                    },
                  })}
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </Card>

      </Spin>
    );
  }
}
