import React from 'react';
import {reduxForm, Field, isPristine} from 'redux-form';
import {connect} from 'react-redux';
import {Card, Button, Row, Col} from 'antd';
import PropTypes from 'prop-types';
import {Text, TextArea} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import asyncValidate from './asyncValidate';
import {emptyPack, showPack, storePack, updatePack} from './../Module';

@reduxForm({
  form: 'stack-pack-pack-form',
  validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);
    let _modules = props.modules && props.modules.find((item) => item.name === 'Stack');
    data = {pack: Object.assign({}, data, {rulePackId: null, rulableType: 'Stack', rulableId: _modules && _modules.id})};
    if (props.packId) {
      dispatch(updatePack(props.packId, data, (err, res) => !err && props.handleSubmit(res.data)));
    } else {
      dispatch(storePack(data, (err, res) => !err && props.handleSubmit(res.data)));
    }
  },
})
@connect((state) => ({
  pack: state.Attendance.Stack.Packs.pack,
  isPristine: isPristine('stack-pack-pack-form')(state),
}), {
  showPack,
  emptyPack,
})
@autobind
/**
 *
 */
export default class PacksForm extends React.PureComponent {
  static propTypes = {
    packId: PropTypes.number,
    showPack: PropTypes.func,
    emptyPack: PropTypes.func,
    pack: PropTypes.object,
    initialize: PropTypes.func,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
    modules: PropTypes.array,
  };

  /**
   *
   */
  componentDidMount() {
    const {packId, showPack} = this.props;
    if (packId) {
      showPack(packId);
    }
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.pack, np.pack)) {
      let _pack = app._.cloneDeep(np.pack);

      np.initialize(_pack);
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPack();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {submit, onCancel, isPristine} = this.props;

    return (
      <Card
        className="wrapper"
        title={app.translate('routes.home.attendance.stack.Stack Pack Pattern Form')}
        extra={
          <Button.Group>
            <Button
              type="danger"
              onClick={() => onCancel()}
            >
              {app.translate('main.Cancel')}
            </Button>
            <Button
              type="primary"
              onClick={submit}
              disabled={isPristine}
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
            overflowY: 'auto',
          }}
        >

          <Col>
            <Field
              name="name"
              label={app.translate('routes.home.attendance.stack.Name')}
              prefix={<MaterialIcon name="alphabetical"/>}
              required
              component={Text}
            />
          </Col>

          <Col>
            <Field
              name="description"
              label={app.translate('routes.home.attendance.stack.Description')}
              component={TextArea}
            />
          </Col>

        </Row>
      </Card>
    );
  }
}
