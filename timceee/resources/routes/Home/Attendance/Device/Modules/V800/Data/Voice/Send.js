import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {connect} from 'react-redux';
import {Row, Col, Form, Upload, Button} from 'antd';
import {request} from 'routes/Home/Attendance/Device/Module';

@connect(null, {
  request,
}, null, {withRef: true})
@autobind
/**
 *
 */
export default class Send extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    request: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      voices: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    };
  }

  /**
   *
   * @param {Function} [callback=(function())]
   */
  submit(callback = () => {
  }) {
    const {voices} = this.state;
    const {request, device} = this.props;

    let loader = app.loading(app.translate('routes.home.attendance.device.Sending Voices'));

    let _voices = app._.cloneDeep(voices);

    for (let _key in _voices) {
      let reader;

      switch (_voices[_key]) {
        case false:
          _voices[_key] = null;
          break;
        case null:
          _voices[_key] = '';
          break;
        default:
          reader = new FileReader();
          reader.readAsDataURL(_voices[_key]);
          reader.onload = () => {
            _voices[_key] = reader.result;
          };
      }
    }

    request(device.id, 'sendVoice', _voices, (err) => {
      loader.hide(() => {
        if (err) {
          return app.message(app.translate('routes.home.attendance.device.Sending Voices Failed'), 'error');
        }

        app.message(app.translate('routes.home.attendance.device.Sending Voices Was Successful'));
      });

      callback();
    });
  }

  /**
   *
   * @param {Number} index
   * @private
   */
  _setRemove(index) {
    const {voices} = this.state;
    let _voices = app._.cloneDeep(voices);

    _voices[index] = _voices[index] === false ? null : false;

    this.setState({
      voices: _voices,
    });
  }

  /**
   *
   * @param {Number} index
   * @param {*} file
   * @private
   */
  _setFile(index, file) {
    const {voices} = this.state;
    let _voices = app._.cloneDeep(voices);

    _voices[index] = file;

    this.setState({
      voices: _voices,
    });
  }

  /**
   *
   * @param {Number} index
   * @return {Object}
   * @private
   */
  _renderRemoveButtonStyle(index) {
    const {voices} = this.state;
    let _style = {
      top: 1,
    };

    if (voices[index] === false) {
      _style.color = '#fff';
      _style.backgroundColor = '#f04134';
      _style.borderColor = '#f04134';
      _style.borderTopColor = 'rgb(240, 65, 52)';
      _style.borderRightColor = 'rgb(240, 65, 52)';
      _style.borderBottomColor = 'rgb(240, 65, 52)';
      _style.borderLeftColor = 'rgb(240, 65, 52)';
    }

    return _style;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {voices} = this.state;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
        }}
      >

        <Col md={6}>
          <Form.Item
            label="ورود"
          >
            <Button.Group>
              <Button type={voices[0] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(0, file)}
                  style={{zIndex: 100}}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(0)}
                style={this._renderRemoveButtonStyle(0)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="خروج"
          >
            <Button.Group>
              <Button type={voices[1] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(1, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(1)}
                style={this._renderRemoveButtonStyle(1)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="ورود مرخصی"
          >
            <Button.Group>
              <Button type={voices[2] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(2, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(2)}
                style={this._renderRemoveButtonStyle(2)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="خروج مرخصی"
          >
            <Button.Group>
              <Button type={voices[3] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(3, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(3)}
                style={this._renderRemoveButtonStyle(3)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="ورود ماموریت"
          >
            <Button.Group>
              <Button type={voices[4] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(4, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(4)}
                style={this._renderRemoveButtonStyle(4)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="خروج ماموریت شهری"
          >
            <Button.Group>
              <Button type={voices[5] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(5, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(5)}
                style={this._renderRemoveButtonStyle(5)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="ورود ماموریت شهری"
          >
            <Button.Group>
              <Button type={voices[6] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(6, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(6)}
                style={this._renderRemoveButtonStyle(6)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="خروج ماموریت"
          >
            <Button.Group>
              <Button type={voices[7] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(7, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(7)}
                style={this._renderRemoveButtonStyle(7)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="اعلام حضور"
          >
            <Button.Group>
              <Button type={voices[8] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(8, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(8)}
                style={this._renderRemoveButtonStyle(8)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="اعلام حضور ماموریت شهری"
          >
            <Button.Group>
              <Button type={voices[9] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(9, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(9)}
                style={this._renderRemoveButtonStyle(9)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="اعلام حضور ماموریت"
          >
            <Button.Group>
              <Button type={voices[10] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(10, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(10)}
                style={this._renderRemoveButtonStyle(10)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

        <Col md={6}>
          <Form.Item
            label="اعلام حضور مرخصی"
          >
            <Button.Group>
              <Button type={voices[11] ? 'primary' : 'default'}>
                <Upload
                  accept="audio/wav"
                  showUploadList={false}
                  beforeUpload={(file) => this._setFile(11, file)}
                >
                  {app.translate('routes.home.attendance.device.Select File')}
                </Upload>
              </Button>
              <Button
                type="dashed"
                onClick={() => this._setRemove(11)}
                style={this._renderRemoveButtonStyle(11)}
              >
                <MaterialIcon name="delete"/>
              </Button>
            </Button.Group>
          </Form.Item>
        </Col>

      </Row>
    );
  }
}
