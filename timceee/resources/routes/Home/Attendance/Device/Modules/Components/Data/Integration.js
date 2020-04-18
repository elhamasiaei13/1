import React from 'react';
import PropTypes from 'prop-types';
import Spin from 'components/common/Spin';
import {Row, Col} from 'antd';
import {connect} from 'react-redux';
import {request} from 'routes/Home/Attendance/Device/Module';
import {ListWrapper as List} from 'routes/Home/Basic/Personnel/List';

@connect(null, {
  request,
}, null, {withRef: true})
@autobind
/**
 *
 * @abstract
 */
export default class Integration extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    request: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      deviceUsers: [],
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {request, device} = this.props;

    request(device.id, 'getPersons', null, (err, res) => !err && this.setState({deviceUsers: res.data.users, loading: false}));
  }

  /**
   *
   * @param {Function} [callback=(function())]
   */
  submit(callback = () => {
  }) {
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {deviceUsers, loading} = this.state;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Row
          gutter={16}
          style={{
            height: '100%',
          }}
        >

          <Col
            style={{
              height: '100%',
            }}
          >

            <List
              selected={[]}
              reference={(input) => this.usersList = input}
              disabled={(item) => deviceUsers.indexOf(item.id) === -1}
            />

          </Col>

        </Row>
      </Spin>
    );
  }
}
