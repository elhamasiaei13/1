import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import List from './List';
import Spin from 'components/common/Spin';
import {connect} from 'react-redux';
import {indexInsuranceTypes} from './../../Module';

@connect((state) => ({
  types: state.Basic.Personnel.insuranceTypes,
}), {
  indexTypes: indexInsuranceTypes,
})
@autobind
/**
 *
 */
export default class Insurance extends React.PureComponent {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    indexTypes: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      insurance: null,
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexTypes} = this.props;

    indexTypes((err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      insurance: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {insurance, loading} = this.state;
    const {user, types} = this.props;

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
            types={types}
            onAdd={() => this.setState({insurance: {}})}
            onEdit={(insurance) => this.setState({insurance})}
          />

          {
            insurance &&
            <Form
              insurance={insurance}
              user={user}
              types={types}
              onCancel={this._onCancel}
            />
          }

        </Spin>

      </div>
    );
  }
}
