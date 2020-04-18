import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'antd';
import ReactCropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

@autobind
export default class Cropper extends React.PureComponent {
  static propTypes = {
    image: PropTypes.string,
    visible: PropTypes.bool,
    onClick: PropTypes.func,
    onCancel: PropTypes.func,
    acceptTypes: PropTypes.array,
    acceptSize: PropTypes.number,
  };

  static defaultProps = {
    image: null,
    visible: false,
    acceptSize: 100, // KB
    acceptTypes: ['jpg', 'png', 'gif', 'bmp', 'jpeg'],
    onClick: () => {
    },
    onCancel: () => {
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      isSelectFile: true,
      visible: props.visible,
    };
  }

  componentWillReceiveProps(np) {
    if (np.visible !== this.props.visible) {
      this.setState({
        visible: np.visible,
      });
      if (this.state.image && np.visible) {
        this.setState({
          isSelectFile: false,
        });
      }
    }
    if (np.image !== this.props.image) {
      this.setState({
        image: np.image,
      });
    }
  }

  _checkType(fileName) {
    let check = false;
    const {acceptTypes} = this.props;
    let fileType = fileName.split('.').pop();

    app._.map(acceptTypes, (acceptType) => {
      if (acceptType.toUpperCase() === fileType.toUpperCase()) {
        check = true;
      }
    });

    return check;
  }

  _onChange(e) {
    let file = this.file.files[0];
    let types = ['IMAGE/PNG', 'IMAGE/GIF', 'IMAGE/BMP', 'IMAGE/JPG', 'IMAGE/JPEG'];

    this.file.style.border = '3px dotted #fff';
    if (file.size) {
      if (types.includes(file.type.toUpperCase())) {
        if (this._checkType(file.name)) {
          if (parseInt(this.props.acceptSize) > parseInt(parseInt(file.size) / 1024)) {
            let reader = new FileReader();
            let url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
              this.setState({
                isSelectFile: false,
                image: reader.result,
              });
            }.bind(this);
          } else {
            app.message(app.translate('components.common.cropper.error size', {size: parseInt(this.props.acceptSize)}), 'error');
          }
        } else {
          app.message(app.translate('components.common.cropper.error types'), 'error');
        }
      } else {
        app.message(app.translate('components.common.cropper.error type'), 'error');
      }
    }
  }

  _onClick() {
    this.props.onClick(this.cropper.getCroppedCanvas().toDataURL());
    this._onCancel();
  }

  _onCancel() {
    this.setState({
      visible: false,
     // isSelectFile: true,
      // image: null,
    });
    this.props.onCancel();
  }

  _onReset() {
    this.setState({
      isSelectFile: true,
    });
  }

  dragEnter(event) {
    if (event.target.className === 'cropper-input') {
      event.target.style.border = '3px dotted #f66';
    }
  }

  dragLeave(event) {
    if (event.target.className === 'cropper-input') {
      event.target.style.border = '3px dotted #fff';
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

  render() {
    const {image, visible, isSelectFile} = this.state;
    return (
      <Modal
        title={app.translate('components.common.cropper.Select Image And Crop')}
        visible={visible}
        onCancel={this._onCancel}
        // onOk={this._onClick}
        footer={[
          <Button key="reset" type="dashed" disabled={isSelectFile} onClick={this._onReset}>{app.translate('components.common.cropper.Reset')}</Button>,
          <Button key="cancel" onClick={this._onCancel}>{app.translate('components.common.cropper.Cancel')}</Button>,
          <Button key="submit" type="primary" disabled={isSelectFile} onClick={this._onClick}>{app.translate('components.common.cropper.Submit')}</Button>,
        ]}
      >
        {isSelectFile ? <input
            ref={(input) => this.file = input}
            type="file"
            accept="image/*"
            name="img[image]"
            onChange={this._onChange}
            className="cropper-input"
            onDragEnter={this.dragEnter}
            onDragLeave={this.dragLeave}
            onDragOver={this.allowDrop}
            style={{border: '3px solid #fff'}}
          /> :
          <ReactCropper
            ref={(input) => this.cropper = input}
            src={image}
            style={{height: 400, width: '100%', border: '3px solid #fff'}}
            aspectRatio={1}
            viewMode={1}
          />
        }
      </Modal>
    );
  }
}
