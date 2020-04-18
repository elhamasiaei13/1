import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Radio} from 'antd';
// import widgets from 'plugins/widgets';
import Notifications from 'plugins/notifications';

@autobind
/**
 *
 */
export default class SideNav extends React.PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
  };

  static defaultProps = {
    collapsed: false,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tab: 'widgets',
    };
  }

  /**
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.collapsed !== nextProps.collapsed && !nextProps.collapsed) {
      this.setState({
        tab: 'widgets',
      });
    }
  }

  /**
   *
   * @param {*} error
   * @param {*} info
   */
  componentDidCatch(error, info) {
    super.componentDidCatch(error, info);

    this.setState({
      tab: 'widgets',
    });
  }

  /**
   *
   * @param {Object} event
   */
  handleOutsideClick(event) {
    const {collapsed, setCollapsed} = this.props;

    if (!collapsed) {
     // console.log(event);
      setCollapsed(true);
    }
  }

  get _widgets() {
    return null;
  }

  /**
   *
   * @return {*}
   * @private
   */
  get _tab() {
    const {tab} = this.state;

    switch (tab) {
      case 'notifications':
        return <Notifications/>;
      case 'widgets':
      default:
        return this._widgets;
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {tab} = this.state;
    const {collapsed} = this.props;

    return (
      <Layout.Sider
        // className={false && collapsed ? 'side-nav side-nav-collapsed' : 'side-nav'}
        className={collapsed ? 'side-nav side-nav-collapsed' : 'side-nav'}
        width={256}
      >

        <div
          className="wrapper"
        >

          <Radio.Group
            className="side-toggle"
            onChange={(e) => this.setState({tab: e.target.value})}
            value={tab}
            style={{
              width: '100%',
              textAlign: 'center',
              margin: '16px 0',
            }}
          >
            <Radio.Button value="widgets">
              widgets
            </Radio.Button>
            <Radio.Button value="notifications">
              notifications
            </Radio.Button>
          </Radio.Group>

          <div
            className="wrapper"
            style={{
              height: 'calc(100% - 60px)',
            }}
          >
            {this._tab}
          </div>

        </div>

      </Layout.Sider>
    );
  }
}
