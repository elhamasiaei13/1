import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';

@autobind
/**
 *
 */
export default class TextArea extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    addonAfter: PropTypes.node,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {name, addonAfter, ...rest} = this.props;

    return (
      <div>

        <Input.TextArea
          {...rest}
          autosize={{minRows: 3, maxRows: 5}}
          id={name}
          name={name}
          dir="auto"
        />

        <div
          className="ant-input-group-addon right-1"
          style={{
            position: 'absolute',
            top: 1,
            width: 'inherit',
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            lineHeight: '22px',
          }}
        >
          {addonAfter}
        </div>

      </div>
    );
  }
}
