import React from 'react';
import PropTypes from 'prop-types';
import ReportsForm from './ReportsForm';
import {Button, Card} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';


@autobind
/**
 *
 * @class ReportsFormContainer
 * @extends PureComponent
 */
export default class ReportsFormContainer extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
    onClick: PropTypes.func,
    reload: PropTypes.func,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    title: PropTypes.string,
    formValue: PropTypes.object,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, onCancel, onClick, form, reload, formValue, title, ...rest} = this.props;

    return (

      <Card
        className="wrapper"
        title={title}
        extra={
          <Button.Group>
            <Button
              type="default"
              onClick={() => onCancel()}
            >
              {app.translate('main.Cancel')}
            </Button>
          </Button.Group>
        }
      >
        <Spin
          spinning={loading}
        >
          <ReportsForm
            formFields={form}
            onClick={onClick}
            formValue={formValue}
            {...rest}
          />
        </Spin>
      </Card>
    );
  }
}
