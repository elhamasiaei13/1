import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import List from './List';
import {connect} from 'react-redux';
import {indexRecruitmentTypes} from './../../Module';

@connect((state) => ({
  types: state.Basic.Personnel.recruitmentTypes,
}), {
  indexTypes: indexRecruitmentTypes,
})
@autobind
/**
 *
 */
export default class Contract extends React.PureComponent {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    indexTypes: PropTypes.func,
    user: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      contract: null,
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
      contract: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {contract} = this.state;
    const {user, types} = this.props;

    return (
      <div
        style={{
          padding: 8,
        }}
      >

        <List
          user={user}
          types={types}
          onAdd={() => this.setState({contract: {}})}
          onEdit={(contract) => this.setState({contract})}
        />

        {
          contract &&
          <Form
            contract={contract}
            user={user}
            types={types}
            onCancel={this._onCancel}
          />
        }

      </div>
    );
  }
}
