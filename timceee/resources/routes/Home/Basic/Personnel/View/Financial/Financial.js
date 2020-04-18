import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import List from './List';
import Spin from 'components/common/Spin';
import {connect} from 'react-redux';
import {indexBanks} from './../../Module';

@connect((state) => ({
  banks: state.Basic.Personnel.banks,
}), {
  indexBanks,
})
@autobind
/**
 *
 */
export default class Financial extends React.PureComponent {
  static propTypes = {
    banks: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    indexBanks: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      financialInfo: null,
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexBanks} = this.props;

    indexBanks((err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      financialInfo: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {financialInfo, loading} = this.state;
    const {user, banks} = this.props;

    return (
      <div
        style={{
          padding: 8,
        }}
      >
        <Spin
          spinning={loading}
        >

          <List
            user={user}
            banks={banks}
            onAdd={() => this.setState({financialInfo: {}})}
            onEdit={(financialInfo) => this.setState({financialInfo})}
          />

          {
            financialInfo &&
            <Form
              financialInfo={financialInfo}
              user={user}
              banks={banks}
              onCancel={this._onCancel}
            />
          }

        </Spin>

      </div>
    );
  }
}
