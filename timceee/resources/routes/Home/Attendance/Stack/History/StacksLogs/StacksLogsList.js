import React from 'react';
import PropTypes from 'prop-types';
import AntTable from 'components/common/Table';
import MaterialIcon from 'components/common/MaterialIcon';
import jMoment from 'moment-jalaali';

@autobind
/**
 *
 */
export default class StacksLogsList extends React.PureComponent {
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
  };

  static defaultProps = {
    items: [],
    loading: true,
    pagination: {},
    reference: (input) => {
    },
  };

  _primaryText(item) {
    let name = item.rule.name;
    return `${name}`;
  }

  _time(_second) {
    let second = (_second < 0 ? _second * -1 : _second);
    let h = parseInt(second / 3600);
    let m = parseInt((second - (h * 3600)) / 60);
    let s = parseInt(second - (h * 3600) - (m * 60));
    return `${(h > 9 ? '' : '0')}${h}:${(m > 9 ? '' : '0')}${m}:${(s > 9 ? '' : '0')}${s}`;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      items, menu, loading, ...rest
    } = this.props;

   // console.log(items);
    const columns = [{
      title: app.translate('routes.home.attendance.stack.CalcTime'),
      width: 150,
      key: 'calcTime',
      render: (text, record) =>
        <span>
          {
            record.stackLogId && <MaterialIcon name="debug-step-out" style={{color: '#0089ff'}} size="tiny"/>
          }
          {record.calcType === 'second' ? (
              <span className={
                parseInt(text) > 0 ? 'plus' : 'mines'
              }>
              <span dir="ltr"
              >
                {`${text > 0 ? '+' : '-'} ${this._time(text)}`}</span> {app.translate('routes.home.attendance.stack.Hour')}</span>) :
            (<span
              className={
                parseInt(text) > 0 ? 'plus' : 'mines'
              }><span dir="ltr">{`${text > 0 ? '+' : ''}${text}`}</span> {app.translate('routes.home.attendance.stack.Day')}</span>)}
        </span>,
    }, {
      title: app.translate('routes.home.attendance.stack.ApplyDate'),
      key: 'applyDate',
      width: 150,
      render: (text, record) => {
        return jMoment(record.applyDate, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss');
      },
    }, {
      title: app.translate('routes.home.attendance.stack.Total'),
      key: 'total',
      width: 70,
    }, {
      title: app.translate('routes.home.attendance.stack.Description'),
      key: 'description',
    }];

    return (
      <AntTable
        className="ant-jtable ant-jtable-64"
        columns={columns}
        dataSource={items}
        rowSelection={false}
        title={app.translate('routes.Pack Patterns')}
        primaryText={this._primaryText}
        secondaryText={'description'}
        menu={menu}
        loading={loading}
        pagination={{
          pageSize: 15,
        }}
        header={false}
        footer={false}
        jsPagination={true}
        {...rest}
      />
    );
  }
}
