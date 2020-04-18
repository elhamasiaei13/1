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
        title={app.translate('routes.home.evaluation-360.Period')}
        primaryText={'title'}
        secondaryText={(item) => `${app.translate('routes.home.evaluation-360.Period secondaryText', {
          dateFrom: item.dateFrom ? jMoment(item.dateFrom, 'YYYY-MM-DD').format('jDD-jMM-jYYYY') : '',
          dateTo: item.dateTo ? jMoment(item.dateTo, 'YYYY-MM-DD').format('jDD-jMM-jYYYY') : '',
        })}`}
        style={{height: '100%'}}
        icon={true}
        {..._props}
      />
    );
  }
}
