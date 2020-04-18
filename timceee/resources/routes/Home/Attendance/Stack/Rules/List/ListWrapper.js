import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import List from './List';
import {index} from './../Module';

@connect((state) => ({
  rules: state.Attendance.Stack.Rules.rules,
}), {
  index,
})
@autobind
/**
 *
 * @class ListWrapper
 * @extends PureComponent
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    rules: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    menu: PropTypes.func,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {index} = this.props;
    this.setState({loading: true});

    index({}, () => this.setState({loading: false}));
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {index} = this.props;

    this.setState({loading: true}, () => index({
      filterGroups: [
        {
          or: true,
          filters: [
            {
              key: 'name',
              value,
              operator: 'ct',
            },
            {
              key: 'description',
              value,
              operator: 'ct',
            },
          ],
        },
      ],
    }, () => this.setState({loading: false})));
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _pagination() {
    return {};
  }

  /**
   *
   * @return {ListWrapper.props.rules}
   * @private
   */
  _dataSource() {
    let {rules} = this.props;
    app._.map(rules, (rule) => {
      rule.icon = (rule.type === 'rule' ? 'gavel' : 'file-chart');
    });
    return rules;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {activeItem, onClick, menu, extra, ...rest} = this.props;
    const {loading} = this.state;

    return (
      <List
        items={this._dataSource()}
        loading={loading}
        onSearch={this._onSearch}
        pagination={this._pagination()}
        activeItem={activeItem}
        onClick={onClick}
        menu={menu}
        extra={extra}
        {...rest}
      />
    );
  }
}
