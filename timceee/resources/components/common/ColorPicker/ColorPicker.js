import React from 'react';
import PropTypes from 'prop-types';
import {BlockPicker} from 'react-color';

@autobind
/**
 *
 */
export default class ColorPicker extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    color: PropTypes.string,
  };

  static defaultProps = {
    color: '#108ee9',
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {color, onChange} = this.props;

    return (
      <BlockPicker
        width="100%"
        color={color}
        onChangeComplete={(color) => onChange(color)}
        triangle="hide"
        className="color-picker"
      />
    );
  }
}
