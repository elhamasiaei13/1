import React from 'react';
import ListView from 'components/common/ListView';
import jMoment from 'moment-jalaali';

@autobind
/**
 *
 */
export default class List extends React.PureComponent {
  /**
   *
   * @function render
   * @return {XML}
   */
  render() {
    const {...rest} = this.props;

    let _props = app._.omit(rest, ['title', 'primaryText', 'secondaryText', 'style']);

    return (
      <ListView
        title={app.translate('routes.home.bulletin.Category')}
        primaryText={'title'}
        secondaryText={'description'}
        style={{height: '100%'}}
        icon={true}
        {..._props}
      />
    );
  }
}
