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

    let _props = app._.omit(rest, ['primaryText', 'secondaryText', 'style']);

    return (
      <ListView
        primaryText={'title'}
        secondaryText={(item)=> `${item.publishedTime} ${(item.category && item.category.title)} `}
        style={{height: '100%'}}
        icon={true}
        {..._props}
      />
    );
  }
}
