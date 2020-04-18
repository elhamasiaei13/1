import React from 'react';
import {Card, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class DashboardCard extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    minHeight: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    loading: PropTypes.bool,
    reload: PropTypes.func,
  };

  static defaultProps = {
    title: undefined,
    minHeight: '480px',
    loading: false,
    children: null,
    reload: undefined,
  };

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  _menu() {
    const {loading, reload} = this.props;
    let menu = [];

    menu.push(<Button
      type="dashed"
      key={`reload${Math.random()}`}
      onClick={reload}
    >
      <MaterialIcon name="reload" spin={loading}/>
    </Button>);

    return menu;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {title, loading, children, reload, minHeight} = this.props;

    return (
      <Card
        title={title}
        extra={reload && <Button.Group>{this._menu()}</Button.Group>}
        style={{
          overflowY: 'auto',
          height: '100%',
          minHeight,
          margin: '4px 0px',
        }}
      >
        <Spin
          spinning={loading}
        >
          {children}
        </Spin>
      </Card>
    );
  }
}
