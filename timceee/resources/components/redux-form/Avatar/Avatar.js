import React from 'react';
import {Upload, Form, Tooltip, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Avatar extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    required: PropTypes.bool,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    meta: PropTypes.object,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
  };

  /**
   *
   */
  constructor() {
    super();

    this.state = {};
  }

  /**
   *
   * @param {Blob} img
   * @param {Function} callback
   * @private
   */
  _getBase64(img, callback) {
    const _reader = new FileReader();
    _reader.addEventListener('load', () => callback(_reader.result));
    _reader.readAsDataURL(img);
  }

  /**
   *
   * @param {Object} file
   * @return {Boolean}
   * @private
   */
  _beforeUpload(file) {
    const _isJPG = file.type === 'image/jpeg';
    const _isPNG = file.type === 'image/png';
    if (!_isJPG && !_isPNG) {
      app.message('You can only upload JPG/PNG file!', 'error');
    }

    const _isLt2M = file.size / 1024 / 1024 < 1;
    if (!_isLt2M) {
      app.message('Image must smaller than 1MB!', 'error');
    }

    return (_isJPG || _isPNG) && _isLt2M;
  }

  /**
   *
   * @param {Object} info
   * @private
   */
  _handleChange(info) {
    const {input} = this.props;

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this._getBase64(info.file.originFileObj,
        (imageUrl) => input.onChange(imageUrl));
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, label, meta, required, validateStatus, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.error}
        required={required}
        validateStatus={meta.error ? 'error' : validateStatus}
        hasFeedback
      >
        {
          input.value &&
          <Tooltip placement="rightTop" title={app.translate('main.Delete Picture')}>
            <Button
              type="danger"
              shape="circle"
              className="avatar-uploader-cancel"
              onClick={() => input.onChange(null)}
            >
              <MaterialIcon name="delete"/>
            </Button>
          </Tooltip>
        }
        <Upload
          {...rest}
          className="avatar-uploader"
          name={input.name}
          showUploadList={false}
          beforeUpload={this._beforeUpload}
          onChange={this._handleChange}
        >
          {
            input.value ?
              <img src={input.value} className="avatar"/>
              :
              <MaterialIcon name="plus" className="avatar-uploader-trigger"/>
          }
        </Upload>
      </Form.Item>
    );
  }
}
