import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col} from 'antd';

@autobind
/**
 *
 */
export default class Delete extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmitDestroyWithChild: PropTypes.func,
    onSubmitDestroy: PropTypes.func,
    visible: PropTypes.bool,
    confirmLoadingDestroy: PropTypes.bool,
    confirmLoadingDestroyWithChild: PropTypes.bool,
    haveChild: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    onCancel: () => {
    },
    onSubmitDestroyWithChild: () => {
    },
    onSubmitDestroy: () => {
    },
    visible: false,
    confirmLoadingDestroy: false,
    confirmLoadingDestroyWithChild: false,
    haveChild: true,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {title, haveChild, onCancel, onSubmitDestroy, onSubmitDestroyWithChild, visible, confirmLoadingDestroy, confirmLoadingDestroyWithChild} = this.props;


    let btn = [
      <Button
        key="back"
        size="large"
        onClick={onCancel}
      >{app.translate('main.Cancel')}
      </Button>];
    if (haveChild) {
      btn.push(
        <Button
          key="submit"
          type="primary"
          size="large"
          loading={confirmLoadingDestroyWithChild}
          onClick={onSubmitDestroyWithChild}>
          حذف با زیر مجموعه
        </Button>);
    }

    btn.push(
      <Button
        key="submit2"
        type="primary"
        size="large"
        loading={confirmLoadingDestroy}
        onClick={onSubmitDestroy}>
        حذف
      </Button>);

    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        footer={btn}
      >
        <Row>
          {haveChild && <Col sm={24}>
            در صورت حذف به همراه زیر مجموعه تمامی زیر مجموعه ها به همراه پست انتخاب شده حذف می گردد
          </Col>
          }
          <Col sm={24}>
            در صورت حذف تکی، زیر مجموعه ها به پست بالا منتقل شده و سپس پست انتخاب شده حذف می گردد
          </Col>
        </Row>
      </Modal>
    );
  }
}
