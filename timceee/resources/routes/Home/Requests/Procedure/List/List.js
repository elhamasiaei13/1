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

  /**
   *
   * @return {XML}
   */
  render() {
    const { reference, ...rest } = this.props;

    return (
      <ListView
        ref={reference}
        title={app.translate('routes.Procedure')}
        primaryText={(item) => `${item.name}${item.final ? ' - (ثبت نهایی)' : ''}`}
        secondaryText="description"
        {...rest}
      />
    );
  }
}
