import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReportsFormContainer from './ReportsFormContainer';
import {show, emptyRule} from './../Module';

@connect((state) => ({
  rule: state.Attendance.Reports.rule,
}), {
  show,
  emptyRule,
})
@autobind
/**
 *
 * @class ReportsFormContainerWrapper
 * @extends PureComponent
 */
export default class ReportsFormContainerWrapper extends React.PureComponent {
  static propTypes = {
    show: PropTypes.func,
    emptyRule: PropTypes.func,
    rule: PropTypes.object,
    onClick: PropTypes.func,
    onCancel: PropTypes.func,
    item: PropTypes.object,
    formValue: PropTypes.object,
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
    this._reload(this.props.item);
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.item, np.item)) {
      this._reload(np.item);
    }
  }

  _reload(item) {
    const {show, emptyRule} = this.props;
    this.setState({loading: true});
    emptyRule();
    show( item.id, {
      includes: [
        'form.fields',
      ],
    }, () => this.setState({loading: false}));
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {item, onClick, rule, onCancel, formValue, ...rest} = this.props;
    const {loading} = this.state;
    return (
      <ReportsFormContainer
        form={rule.form}
        title={item.label}
        loading={loading}
        reload={this._reload}
        onClick={onClick}
        onCancel={onCancel}
        formValue={formValue}
        {...rest}
      />
    );
  }
}
