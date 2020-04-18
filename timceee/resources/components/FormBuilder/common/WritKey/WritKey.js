import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Form, Select as AntdSelect} from 'antd';
import uuidv1 from 'uuid/v1';
import MaterialIcon from 'components/common/MaterialIcon';
import jMoment from 'moment-jalaali';

import {
  getWrits,
} from './Module';

@connect((state) => ({
  writs: state.FormBuilder.Common.Writ.writs,
}), {
  getWrits,
})
@autobind
/**
 *
 */
export default class WritKey extends React.PureComponent {
  static propTypes = {
    writs: PropTypes.arrayOf(
      PropTypes.object,
    ),
    getWrits: PropTypes.func,
    positionId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),


    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    required: PropTypes.bool,
    meta: PropTypes.object,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    defaultValue: PropTypes.any,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    addonBefore: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    addonAfter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    prefix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    onPressEnter: PropTypes.func,
    autosize: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number,
      }),
    ]),
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
    input: {},
    disabled: false,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }


  /**
   *
   */
  componentWillMount() {
    super.componentWillMount();

  }

  /**
   *
   */
  componentDidMount() {
    const {getWrits, positionId} = this.props;
    getWrits(positionId, {includes: ['type']});
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.positionId, this.props.positionId)) {
      np.getWrits(np.positionId, {includes: ['type']});
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    // super.componentWillUnmount();
  }

  _renderItem() {
    const {writs} = this.props;
    let items = [];
    writs.map((item) => {
      items.push(<AntdSelect.Option key={uuidv1()} value={`${item.id}`}>
        {item.key} - {item.type && item.type.name} -
        {
          item.values.dateFrom && <span dir="rtl">
          {jMoment(item.values.dateFrom).format('jYYYY/jMM/jDD')} - {jMoment(item.values.dateTo).format('jYYYY/jMM/jDD')}
          </span>
        }
        {
          item.values.date && <span dir="rtl">
          {jMoment(item.values.date).format('jYYYY/jMM/jDD')} - {item.values.timeFrom} - {item.values.timeTo}
          </span>
        }
      </AntdSelect.Option>);
    });
    return items;
  }

  /**
   *
   * @return {String}
   * @private
   */
  _validateStatus() {
    const {disabled, required, validateStatus, input, meta} = this.props;
    let _status = validateStatus;

    if (!disabled) {
      if (meta.asyncValidating) {
        _status = 'validating';
      } else if (meta.touched) {
        if (meta.error) {
          _status = 'error';
        } else {
          if (!required && app._.isEmpty(input.value)) {
            _status = 'warning';
          } else if (meta.valid) {
            _status = 'success';
          }
        }
      }
    }

    return _status;
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, size, onPressEnter, addonBefore,
      addonAfter, disabled, prefix, suffix, label,
      required, validateStatus, meta, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
      >
        <AntdSelect
          defaultValue={defaultValue}
          onChange={input.onChange}
          style={{
            width: '100%',
          }}
        >{this._renderItem()}
        </AntdSelect>
      </Form.Item>
    );
  }


}
