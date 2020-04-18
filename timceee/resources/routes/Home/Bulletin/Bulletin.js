import React from 'react';
import {Row, Col, Modal, Button} from 'antd';
import List from './Post/List/ListWrapper';
import uuidv1 from 'uuid/v1';

@autobind
/**
 *
 */
export default class Bulletin extends React.PureComponent {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      item: null,
    };
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({item: null});
  }

  /**
   *
   * @return {*}
   * @private
   */
  _renderContent() {
    const {item} = this.state;
    let _return ='';
    if (item) {
      _return = (<div dangerouslySetInnerHTML={{ __html: item.description }} />);
    }
    return _return;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {item} = this.state;
    return (
      <Row
        gutter={16}
        style={{
          margin: '0px',
        }}
      >
        <Col
          style={{
            margin: '8px 0px',
          }}>
          <List
            title={app.translate('routes.home.bulletin.Bulletin', 'Bulletin')}
            onSearch={null}
            onClick={(item) => this.setState({item})}
          />
          {
            <Modal
              onCancel={this._onCancel}
              title={item && item.title}
              width='60%'
              visible={item !== null}
              footer={
                <Button
                  onClick={this._onCancel}
                >{app.translate('main.Cancel')}
                </Button>
              }
            >
              {this._renderContent()}
            </Modal>
          }
        </Col>
      </Row>
    );
  }
}
