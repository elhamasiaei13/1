import React from 'react';
import ListView from 'components/common/ListView';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  static propTypes = {
    reference: PropTypes.func,
  };

  static defaultProps = {
    reference: (input) => {},
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {reference, ...rest} = this.props;

    let _props = app._.omit(rest, ['title', 'primaryText', 'secondaryText', 'style']);

    return (
      <ListView
        title={app.translate('routes.Working Hours')}
        primaryText={'name'}
        secondaryText={'description'}
        style={{height: '100%'}}
        ref={reference}
        {..._props}
      />
    );
  }
}
