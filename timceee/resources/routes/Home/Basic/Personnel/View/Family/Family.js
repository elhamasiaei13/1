import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import List from './List';
import Spin from 'components/common/Spin';
import {connect} from 'react-redux';
import {indexCities, indexProvinces} from './../../Module';

@connect((state) => ({
  cities: state.Basic.Personnel.cities,
  provinces: state.Basic.Personnel.provinces,
}), {
  indexCities,
  indexProvinces,
})
@autobind
/**
 *
 */
export default class Family extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object),
    provinces: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    indexCities: PropTypes.func,
    indexProvinces: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      family: null,
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexCities, indexProvinces} = this.props;

    indexProvinces((err) => !err && this.setState({loading: false}));
    indexCities((err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      family: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {family, loading} = this.state;
    const {user, cities, provinces} = this.props;

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
            onAdd={() => this.setState({family: {}})}
            onEdit={(family) => this.setState({family})}
          />

          {
            family &&
            <Form
              family={family}
              user={user}
              cities={cities}
              provinces={provinces}
              onCancel={this._onCancel}
            />
          }

        </Spin>

      </div>
    );
  }
}
