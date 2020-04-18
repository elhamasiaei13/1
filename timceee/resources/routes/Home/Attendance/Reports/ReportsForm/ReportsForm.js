import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, reduxForm, getFormValues, isPristine} from 'redux-form';
import {Row, Col, Input, Button, Select} from 'antd';
import {FormBuilder} from 'components/FormBuilder';

@authorize

@reduxForm({
  form: 'FormBuilder',
  onSubmit: (values, dispatch, props) => {
    let _values = values && values.values ? values.values : {};
    props.onClick(_values);
  },
})
@connect((state) => ({
  currentUser: state.Auth.currentUser,
  values: getFormValues('FormBuilder')(state),
}), {})
@autobind
/**
 *
 * @class ReportsForm
 * @extends PureComponent
 */
export default class ReportsForm extends React.PureComponent {
  static propTypes = {
    formFields: PropTypes.object,
    formValue: PropTypes.object,
    values: PropTypes.object,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    formFields: {},
    formValue: {},
    onClick: (input) => {
    },
  };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.initialize(this.props.formValue ? {values: this.props.formValue} : {values: {}});
  }

  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.form, this.props.form)) {
      if (np.formValue && !app._.isEqual(np.formValue, this.props.values)) {
        np.initialize(np.formValue ? {values: np.formValue} : {values: {}});
      }
    }
  }


  get _formFields() {
    let {formFields} = this.props;
    if (formFields.fields && Array.isArray(formFields.fields)) {
      formFields.fields.map((field) => {
        if (field.name === 'positions') {
          field['permission'] = (app.authorize.can('Report@all') || app.authorize.can('Report@sub'));
          field['defaultValue'] = this.props.currentUser && this.props.currentUser.positions && !app._.isEmpty(this.props.currentUser.positions) ? this.props.currentUser.positions.pluck('id') : [0];
        }
      });
    }
    return formFields;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {submit} = this.props;
    return (
      <div
        style={{
          height: '100%',
        }}>
        <div
          style={{
            height: 'calc(100% - 40px)',
            overflow: 'auto',
            marginBottom: '9px',
          }}>
          <Row
            style={{
              height: '100%',
            }}>
            <FormBuilder
              formFields={this._formFields}
              md={24}
              formValues={this.props.values}
              componentName={'Report'}
            />
          </Row>
        </div>
        <Button
          type="primary"
          onClick={submit}
        >{app.translate('routes.home.attendance.reports.Get Report', 'Get Report')}</Button>
      </div>
    );
  }
}
