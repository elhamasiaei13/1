import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getRequestWrit, emptyRequestWrit} from './Module';
import {Form, Select as SelectInput} from 'antd';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';

@connect((state) => ({
  writ: state.FormBuilder.Common.SelectWrit.writ,
}), {
  getRequestWrit,
  emptyRequestWrit,
})
@autobind
/**
 *
 */
export default class SelectWritInfo extends React.PureComponent {
  static propTypes = {
    inline: PropTypes.bool,
    label: PropTypes.string,
    writId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    writ: PropTypes.object,
    getRequestWrit: PropTypes.func,
    emptyRequestWrit: PropTypes.func,
  };

  static defaultProps = {
    inline: true,
    label: undefined,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      writ: {},
    };
  }


  /**
   *
   */
  componentDidMount() {
    const {getRequestWrit} = this.props;
    getRequestWrit(this.props.writId, {includes:['type']}, (r) => {
      this.setState({writ: r});
    });
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.writId, this.props.writId)) {
      np.getRequestWrit(np.writId, {includes:['type']}, (r) => {
        this.setState({writ: r});
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.emptyRequestWrit();
  }


  /**
   *
   * @return {Object}
   * @private
   */
  _inline() {
    const {inline} = this.props;

    if (inline) {
      return {
        labelCol: {span: 6},
        wrapperCol: {span: 18},
      };
    }

    return {};
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {writ, label} = this.props;

    return (
      <span>
        {writ.key} - {writ.type && writ.type.name} -
          <span dir="ltr">{jMoment(writ.dateFrom).format('jYYYY-jMM-jDD')} / {jMoment(writ.dateTo).format('jYYYY-jMM-jDD')}</span>
        </span>
    );
  }
}
