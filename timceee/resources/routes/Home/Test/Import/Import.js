import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import Field from 'components/common/Field';
import {Card, Row, Col, Form as AntdForm, Input, Radio, Select, Button} from 'antd';
import uuidv1 from 'uuid/v1';

@autobind
/**
 *
 */
export default class Import extends React.PureComponent {


  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      length: 0,
      lines: [],
      words: [],
      sp: ' ',
      list: {},
    };
  }

  _onChange() {
    let fileSelected = document.getElementById('txtfiletoread');
    // Set the extension for the file
    let fileExtension = /text.*/;
    // Get the file object
    let fileTobeRead = fileSelected.files[0];
    // Check of the extension match
    if (fileTobeRead && fileTobeRead.type.match(fileExtension)) {
      // Initialize the FileReader object to read the 2file
      let fileReader = new FileReader();
      let that = this;
      fileReader.onload = function (e) {
        let data = fileReader.result;
        let _data = data.replace(/\n/g, '@@@@').split('@@@@');
        let line = _data && _data[0] ? _data[0] : '';
        let word = line.split(that.state.sp);
        that.setState({length: _data.length, lines: _data, words: word});
      };
      fileReader.readAsText(fileTobeRead, 'UTF-8');
    }
  }

  _onChangeSp(e) {
    this.setState({sp: e.target.value.length > 0 ? e.target.value : ' '}, () => {
      this._onChange();
    });
  }

  /**
   *
   * @private
   */
  _Send() {
    // console.log(this.state);
  }

  _onChangeSelect(word, value) {
    let list = Object.assign({}, this.state.list, {});
    list[word] = value;
    this.setState({list: list});
  }

  _render() {
    const {words} = this.state;
    let _em = [];
    words.map((word, index) => {
      _em.push(<Select.Option key={uuidv1()} value={`${index}`}>{word}</Select.Option>);
    });

    return _em;
  }

  /**
   *
   * @return {XML}
   */
  render() {

    return (
      <Card
        className="wrapper"
        style={{
          width: 'calc(100% - 16px)',
          margin: '0 8px',
        }}
        title={app.translate('routes.home.import.Import')}
        extra={[
          <Button key='btn' onClick={() => this._Send()}>{app.translate('main.Send')}</Button>,
        ]}
      >

        <Row
          gutter={16}
          style={{
            margin: 0,
            marginBottom: 16,
            height: 'fit-content',
          }}
        >
          <AntdForm.Item
            label={'جدا کننده'}
          >
            <Input
              type='text'
              onChange={(e) => this._onChangeSp(e)}
            />
          </AntdForm.Item>

          <AntdForm.Item
            label={'فایل'}
          >
            <input
              type='file'
              id='txtfiletoread'
              onChange={() => this._onChange()}
            />
          </AntdForm.Item>

          <AntdForm.Item
            label={'طول فایل'}
          >
            {this.state.length}
          </AntdForm.Item>

          <AntdForm.Item
            label={'کد شناسایی'}
          >
            <Select style={{width: '100%'}} onChange={(value) => this._onChangeSelect('code', value)}>
              {this._render()}
            </Select>
          </AntdForm.Item>

          <AntdForm.Item
            label={'تاریخ'}
          >
            <Select style={{width: '100%'}} onChange={(value) => this._onChangeSelect('date', value)}>
              {this._render()}
            </Select>
          </AntdForm.Item>
          <AntdForm.Item
            label={'ساعت'}
          >
            <Select style={{width: '100%'}} onChange={(value) => this._onChangeSelect('time', value)}>
              {this._render()}
            </Select>
          </AntdForm.Item>
          <AntdForm.Item
            label={'نوع'}
          >
            <Select style={{width: '100%'}} onChange={(value) => this._onChangeSelect('type', value)}>
              {this._render()}
            </Select>
          </AntdForm.Item>

        </Row>
      </Card>
    );
  }
}
