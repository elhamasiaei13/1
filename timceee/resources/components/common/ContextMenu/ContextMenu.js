import React from 'react';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class ContextMenu extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  /**
   *
   */
  componentDidMount() {
    this._child.addEventListener('contextmenu', (e) => {});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const Child = this.props.children;

    return (
      <Child ref={(input) => this._child = input}/>
    );
  }
}
