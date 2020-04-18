import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Input} from 'antd';

@autobind
/**
 *
 */
export default class Password extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      view: false,
    };
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {view} = this.state;
    const {name, disabled, ...rest} = this.props;

    return (
      <div
        className="redux-password"
      >
        <Input
          {...rest}
          type={view ? 'text' : 'password'}
          dir="auto"
          id={name}
          autoComplete={`${name} new-password`}
          name={name}
          suffix={
            <MaterialIcon
              name={view ? 'eye-off' : 'eye'}
              size="tiny"
              disabled={disabled}
              onClick={() => this.setState({view: !view})}
            />
          }
        />
      </div>
    );
  }
}
