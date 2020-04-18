import React from 'react';
import {Layout as AntdLayout} from 'antd';
import Drawer from 'components/layout/Drawer';
import Breadcrumb from 'components/layout/Breadcrumb';
import Context from 'components/layout/Context';
import Footer from 'components/layout/Footer';
import SideNav from 'components/layout/SideNav';
import Nav from 'components/layout/Nav';
import PropTypes from 'prop-types';
import 'assets/less/app.less';
import 'assets/styles/app.styl';

@autobind
/**
 *
 */
export default class RLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      sideNavCollapsed: true,
    };
  }

  /**
   * @param {Boolean} toggled
   */
  onSideNavToggle(toggled) {
    this._setSideNavCollapsed(!toggled);
  }

  /**
   *
   * @param {Boolean} sideNavCollapsed
   * @private
   */
  _setSideNavCollapsed(sideNavCollapsed) {
  //  console.log(sideNavCollapsed);
    this.setState({
      sideNavCollapsed,
    });
  }

  /**
   * @return {XML}
   */
  render() {
    const {sideNavCollapsed} = this.state;
    const {children} = this.props;

    return (
      <AntdLayout
        className="wrapper"
      >

        <Nav
          onHamburgerToggle={this.onSideNavToggle}
        />

        <AntdLayout className="ant-layout-has-sider">

          <Drawer/>

          <AntdLayout>

            <Breadcrumb/>

            <Context>
              {children}
            </Context>

            <Footer/>

          </AntdLayout>

          <SideNav
            collapsed={sideNavCollapsed}
            setCollapsed={this._setSideNavCollapsed}
          />

        </AntdLayout>

      </AntdLayout>
    );
  }
}
