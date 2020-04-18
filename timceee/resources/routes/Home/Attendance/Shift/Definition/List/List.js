import React from 'react';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';

@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    reference: PropTypes.func,
  };

  static defaultProps = {
    reference: () => {},
  };

  /**
   *
   * @function render
   * @return {XML}
   */
  render() {
    const { reference, ...rest } = this.props;

    return (
      <ListView
        ref={reference}
        {...rest}
        title={app.translate('routes.Shifts')}
        primaryText={'name'}
        secondaryText={'description'}
        style={{height: '100%'}}
      />
    );
  }
}
