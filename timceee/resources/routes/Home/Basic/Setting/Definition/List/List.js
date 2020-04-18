import React from 'react';
import ListView from 'components/common/ListView';

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
        title={app.translate('routes.Settings')}
        primaryText={'name'}
        secondaryText={'description'}
        style={{height: '100%'}}
        icon={true}
        {..._props}
      />
    );
  }
}
