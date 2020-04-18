import React from 'react';
import {Card, Button, Tabs} from 'antd';

@autobind
/**
 *
 * @abstract
 */
export default class Data extends React.PureComponent {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tab: '1',
      loading: false,
    };
  }

  /**
   *
   * @private
   */
  _submit() {
    const {tab} = this.state;

    this.setState({
      loading: true,
    }, () => this[`_ref${tab}`].submit(() =>this.setState({loading: false})));
  }

  /**
   *
   * @return {XML[]}
   * @private
   */
  _tabs() {
    return [];
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {tab, loading} = this.state;

    return (
      <Card
        className="wrapper"
      >

        <Tabs
          style={{
            height: '100%',
            overflow: 'visible',
          }}
          onChange={(tab) => this.setState({tab})}
          activeKey={tab}
          tabBarExtraContent={
            <Button
              type="primary"
              loading={loading}
              onClick={this._submit}
            >
              {app.translate('main.Submit')}
            </Button>
          }
        >
          {this._tabs()}
        </Tabs>

      </Card>
    );
  }
}
