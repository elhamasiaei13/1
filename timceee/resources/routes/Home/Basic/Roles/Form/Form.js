import React from 'react';
import {Form, Input} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import Color from 'components/common/ColorPicker';

@autobind
/**
 *
 */
export default class RoleForm extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    description: '',
    color: '#cccccc',
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      titleValidating: 'validating',
      titleHelp: '',
      titleValue: props.title,
      descriptionValue: props.description,
      colorValue: props.color ? props.color : '#cccccc',
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      titleValidating: 'validating',
      titleHelp: '',
      titleValue: np.title ? np.title : '',
      descriptionValue: np.description ? np.description : '',
      colorValue: np.color ? np.color : '#cccccc',
    });
  }

  /**
   *
   * @param {element} e
   */
  _titleOnChange(e) {
    const value = e.target.value;
    if (value !== '' && this.state.titleValidating === 'error') {
      this.setState({
        titleValidating: 'validating',
        titleHelp: '',
      });
    }
    this.setState({titleValue: value});
  }

  /**
   *
   * @param {element} e
   */
  _descriptionOnChange(e) {
    const value = e.target.value;
    this.setState({descriptionValue: value});
  }

  /**
   *
   * @param {element} value
   */
  _colorOnChange(value) {
    this.setState({colorValue: value.hex});
  }

  titleValue() {
    if (this.state.titleValue !== '') {
      return this.state.titleValue;
    }
    this.setState({
      titleValidating: 'error',
      titleHelp: app.translate('routes.home.basic.roles.Title Help'),
    });
  }

  descriptionValue() {
    return this.state.descriptionValue;
  }

  colorValue() {
    return this.state.colorValue;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {titleValidating, titleHelp, titleValue, descriptionValue, colorValue} = this.state;

    return (
      <Form>
        <Form.Item
          label={app.translate('routes.home.basic.roles.Title')}
          validateStatus={titleValidating !== 'validating' ? titleValidating : null}
          help={titleHelp}
          hasFeedback={titleValidating !== 'validating'}
          Required={true}
        >
          <Input
            placeholder={app.translate('routes.home.basic.roles.Unique Title')}
            value={titleValue}
            onChange={this._titleOnChange}
            prefix={
              <MaterialIcon
                name="key"
              />
            }
          />
        </Form.Item>
        <Form.Item
          label={app.translate('routes.home.basic.roles.Description')}
        >
          <Input
            type="textarea"
            placeholder={app.translate('routes.home.basic.roles.Insert Explanations')}
            value={descriptionValue}
            onChange={this._descriptionOnChange}
          />
        </Form.Item>
        <Form.Item
          label={app.translate('routes.home.basic.roles.Color')}
        >
          <Color
            onChange={this._colorOnChange}
            color={colorValue}
          />
        </Form.Item>
      </Form>
    );
  }
}
