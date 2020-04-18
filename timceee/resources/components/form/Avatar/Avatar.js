import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Upload, Tooltip, Button} from 'antd';

@autobind
/**
 *
 */
export default class Avatar extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    addonAfter: PropTypes.node,
    onChange: PropTypes.func.isRequired,
  };

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
  static _beforeUpload(file) {
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
    const {onChange} = this.props;

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this._getBase64(info.file.originFileObj,
        (imageUrl) => onChange(imageUrl));
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {value, addonAfter, onChange, ...rest} = this.props;

    return (
      <div>
        {
          value &&
          <Tooltip
            placement="rightTop"
            title={app.translate('main.Delete Picture')}
          >
            <Button
              type="danger"
              shape="circle"
              className="avatar-uploader-cancel"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                onChange(null);
              }}
            >
              <MaterialIcon name="delete"/>
            </Button>
          </Tooltip>
        }

        <Upload
          {...rest}
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={Avatar._beforeUpload}
          onChange={this._handleChange}
        >
          {
            value ?
              <img src={value} className="avatar"/>
              :
              <MaterialIcon name="plus" className="avatar-uploader-trigger"/>
          }
        </Upload>

        <span
          className="ant-input-group-addon right-0"
          style={{
            position: 'absolute',
            top: 0,
            width: 'inherit',
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            lineHeight: '22px',
          }}
        >
          {addonAfter}
        </span>
      </div>
    );
  }
}
