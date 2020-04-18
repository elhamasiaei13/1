import React from 'react';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';

@autobind
/**
 *
 */
export default class StacksList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onSearch: PropTypes.func,
    onClick: PropTypes.func,
    reference: PropTypes.func,
    menu: PropTypes.func,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    loading: PropTypes.bool,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    personnel: PropTypes.object,
  };

  static defaultProps = {
    items: [],
    loading: true,
    pagination: {},
    personnel: {},
    reference: (input) => {
    },
  };

  _createHourToMinutes(minutes) {
    let _hour = parseInt(parseInt(minutes / 60) / 60);
    let _minutes = parseInt(minutes / 60) - ( _hour * 60 );

    return <samp>
      <samp style={{
        direction: 'ltr',
        display: 'inline-block',
      }}>
        {_hour}
      </samp> {app.translate('routes.home.attendance.stack.Hour')} {app.translate('routes.home.attendance.stack.And')}<samp style={{
      direction: 'ltr',
      display: 'inline-block',
    }}>{_minutes}</samp> {app.translate('routes.home.attendance.stack.Minutes')}</samp>;
  }

  _secondaryText(item) {

    let reminder = <div className={`reminder data-${item.stackInfo.reminder}`}>
                      <span>
                        {app.translate('routes.home.attendance.stack.Reminder')}
                      </span>
      <span>
                        {this._createHourToMinutes(item.stackInfo.reminder)}
                        </span>
    </div>;
    let used = <div className={`used data-${item.stackInfo.used}`}>
                      <span>
                        {app.translate('routes.home.attendance.stack.Used')}
                      </span>
      <span>
                        {this._createHourToMinutes(item.stackInfo.used)}
                        </span>
    </div>;
    return (<span className="stack-list">{reminder} {used}</span>);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      items, activeItem, onSearch, onClick, menu,
      extra, loading, pagination, personnel, reference, ...rest
    } = this.props;

    return (
      <ListView
        ref={reference}
        title={app.translate('routes.home.attendance.stack.List Title', {name: `${personnel.profile.firstName} ${personnel.profile.lastName}`})}
        items={items}
        primaryText={'name'}
        secondaryText={this._secondaryText}
        style={{height: '100%'}}
        activeItem={activeItem}
        onSearch={onSearch}
        onClick={onClick}
        menu={menu}
        extra={extra}
        loading={loading}
        pagination={pagination}
        {...rest}
      />
    );
  }
}
