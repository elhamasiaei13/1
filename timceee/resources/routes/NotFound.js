import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Card, Button} from 'antd';

@withRouter
@autobind
/**
 *
 */
export default class NotFound extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {history} = this.props;

    return (
      <div
        className="wrapper"
        style={{
          textAlign: 'center',
        }}
      >

        <Card
          className="errorPage"
        >

          <MaterialIcon
            name="alert-outline"
            size="medium"
            style={{
              color: '#ff9800',
            }}
          />

          <h3>
            {app.translate('routes.Possible Reasons')}
          </h3>
          <h2>
            1-{app.translate('routes.301')}
          <br />
            2-{app.translate('routes.404')}
          </h2>

          <Button
            onClick={() => history.goBack()}
            style={{
              marginTop: 24,
            }}
          >
            {app.translate('main.Back')}
          </Button>

        </Card>

      </div>
    );
  }
}
