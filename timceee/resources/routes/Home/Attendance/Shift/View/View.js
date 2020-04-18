import React from 'react';
import {Row, Col, Modal} from 'antd';
import PropTypes from 'prop-types';
import PersonnelList from 'routes/Home/Basic/Personnel/List/ListWrapper';
import Shift from './Shift';

@authorize
@autobind
/**
 *
 */
export default class View extends React.PureComponent {
  static propTypes = {
    personnel: PropTypes.object,
    can: PropTypes.func,
  };

  static defaultProps = {
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      personnel: props.personnel ? [props.personnel] : [],

    };
    if (this.personnelsRef) {
      this.personnelsRef.empty();
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
  }


  /**
   *
   * @param {object} item
   * @private
   */
  _setPersonnel(item) {
    this.setState({personnel: [item]});
  }

  /**
   *
   * @private
   */
  _onCancelPersonnel() {
    this.setState({personnel: null});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {personnel} = this.state;
    const {can} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          overflowY: 'auto',
          height: '100%',
          margin: 0,
        }}
      >
        {app._.isEmpty(personnel) ?
          <Col sm={24} md={8}
               style={{
                 overflowY: 'auto',
                 height: '100%',
               }}
          >
            <PersonnelList
              onClick={(item) => can('Writ@index') && this._setPersonnel(item)}
              ref={(input) => this.personnelsRef = input && input.getWrappedInstance()}
            />
          </Col>
          :
          <Col
            style={{
              overflowY: 'auto',
              height: '100%',
            }}
          >
            <Shift
              onCancel={this._onCancelPersonnel}
              personnel={personnel[0]}
            />

          </Col>
        }
      </Row>
    );
  }
}


