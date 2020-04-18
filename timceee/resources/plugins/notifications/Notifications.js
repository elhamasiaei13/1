import React from 'react';
import uuidv1 from 'uuid/v1';
import Avatar from 'components/common/Avatar';
import Icon from 'components/common/MaterialIcon';
import {Card, Row, Col} from 'antd';

@autobind
/**
 *
 */
export default class Notifications extends React.PureComponent {
  _notification(title, content, avatar = {}) {
    return (
      <Card
        key={uuidv1()}
        className="notification"
        onClick={() => console.log('click')}
        style={{
          cursor: 'pointer',
        }}
      >
        <Row>
          <Col
            sm={5}
            style={{
              height: 32,
            }}
          >
            <Avatar src={avatar.src} text={avatar.text} icon={avatar.icon}/>
          </Col>
          <Col
            sm={17}
            style={{
              height: 32,
            }}
          >
            <h3
              style={{
                lineHeight: '32px',
              }}
            >
              {title}
            </h3>
          </Col>
          <Col
            sm={2}
            style={{
              height: 32,
            }}
          >
            <Icon
              name="close"
              size="tiny"
              onClick={() => console.log('close')}
            />
          </Col>
          <Col
            sm={24}
            style={{
              marginTop: 8,
            }}
          >
            <p>{content}</p>
          </Col>
        </Row>
      </Card>
    );
  }

  /**
   *
   * @return {XML[]}
   */
  render() {
    let notifications = [];

    ['متن شماره 1', 'متن شماره 2', 'متن شماره 3'].map((tst, index) => {
      notifications.push(this._notification('اردلان', tst));
    });

    return notifications;
  }
}
