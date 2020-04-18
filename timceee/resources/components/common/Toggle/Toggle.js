import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Row, Col} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon/index';

@autobind
/**
 *
 */
export default class Toggle extends React.PureComponent {
  static propTypes = {
    key: PropTypes.string,
    label: PropTypes.string,
    inline: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    checkedChildren: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    unCheckedChildren: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    size: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    key: '',
    label: null,
    checked: false,
    defaultChecked: true,
    onChange: () => {
    },
    checkedChildren: <MaterialIcon name="check"/>,
    unCheckedChildren: <MaterialIcon name="close"/>,
    size: 'default',
    inline: true,
    style: {},
    className: 'antd-toggle',
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked,
      render: true,
    };
  }


  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    this.setState((prevState, props) => ({
      render: !prevState.render,
    }), () => {
      this.setState((prevState, props) => ({
        render: !prevState.render,
      }));
    });

    if (!app._.isEqual(this.props.checked, np.checked)) {
      this.setState({
        checked: np.checked,
      });
    }
  }

  /**
   *
   * @param {Boolean} flag
   * @private
   */
  _onChange(flag) {
    const {onChange, key} = this.props;
    let _key = (key !== '' ? key : 'key' + Math.random());
    this.setState({checked: flag});
    onChange(flag, _key);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {label, defaultChecked, inline, checkedChildren, unCheckedChildren, size, className, style,} = this.props;
    const {checked, render,} = this.state;

    return (
      render ?
        label ?
          <div
            style={style}
            className={className}
          >
            <Row
              style={{
                margin: '3px',
              }}
            >
              <Col
                sm={24}
                style={{fontSize: (size === 'small' ? '10px' : ''), transition: '0.3s', color: (checked === true ? '#000000' : '#999999')}}
              >
                {label} :
                {!inline ? <br /> : ''}
                <Switch
                  checked={checked}
                  defaultChecked={defaultChecked}
                  onChange={this._onChange}
                  checkedChildren={checkedChildren}
                  unCheckedChildren={unCheckedChildren}
                  size={size}
                />
              </Col>
            </Row>
          </div>
          :
          <div
            style={style}
            className={className}
          >
            <Switch
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={this._onChange}
              checkedChildren={checkedChildren}
              unCheckedChildren={unCheckedChildren}
              size={size}
            />
          </div>
        :
        <div/>
    );
  }
}
