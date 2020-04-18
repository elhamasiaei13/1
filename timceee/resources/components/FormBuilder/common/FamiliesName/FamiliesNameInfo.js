import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getFamilies, emptyFamilies} from './Module';
import {Form, Select as SelectInput, Row, Col} from 'antd';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';
import MaterialIcon from 'components/common/MaterialIcon';

@connect((state) => ({
  position: state.FormBuilder.Common.FamiliesNameModule.position,
}), {
  getFamilies,
  emptyFamilies,
})
@autobind
/**
 *
 */
export default class FamiliesNameInfo extends React.PureComponent {
  static propTypes = {
    inline: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    position: PropTypes.object,
    getFamilies: PropTypes.func,
    emptyFamilies: PropTypes.func,
  };

  static defaultProps = {
    inline: true,
    label: undefined,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      position: {},
      values: [],
      spinning: true,
      enable: false,
    };
  }


  /**
   *
   */
  componentDidMount() {
    const {getFamilies, value} = this.props;
    this.setState({spinning: true}, () => {
      getFamilies(this.props.positionId, {includes: ['user.profile', 'user.families']}, (r) => {
        this.setState({position: r, spinning: false});
        if (value && !app._.isEmpty(value)) {
          let _values = JSON.parse(value);
          let enable = this._getEnable(_values);
          this.setState({values: _values, spinning: false, enable});
        }
      });
    });
  }

  /**
   *
   * @param {Array} _values
   * @return {boolean}
   * @private
   */
  _getEnable(_values = []) {
    let enable = false;
    if (Array.isArray(_values)) {
      let index = _values.findIndex((item) => item.user_id !== null);
      if (index > -1) {
        enable = _values[index].accepted;
      }
    }
    return enable;
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.positionId, this.props.positionId)) {
      this.setState({spinning: true}, () => {
        np.getFamilies(np.positionId, {includes: ['user.profile', 'user.families']}, (r) => {
          this.setState({position: r, spinning: false});
          if (value && !app._.isEmpty(value)) {
            let _values = JSON.parse(value);
            let enable = this._getEnable(_values);
            this.setState({values: _values, spinning: false, enable});
          }
        });
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.emptyFamilies();
  }

  _renderFamily(values){
    let _items = [];
    const {position} = this.props;
    const {enable} = this.state;
    _items.push(
      <Col xs={24} key={uuidv1()}>
        {enable ?
          <MaterialIcon
            name="check" style={{ color: 'green'}} size="tiny"/> :
          <MaterialIcon
            name="close" style={{ color: 'red'}} size="tiny"/>
        }
        میخواهم بیمه شوم
      </Col>,
    );
    if (position.user && position.user.families) {
      position.user.families.map((family) => {
        let value = values.find((item) => item.familiesId === family.id || item.families_id === family.id);
        _items.push(
          <Col xs={16} key={uuidv1()}>
            {value && value.accepted ?
              <MaterialIcon
                name="check" style={{ color: 'green'}} size="tiny"/> :
              <MaterialIcon
                name="close" style={{ color: 'red'}} size="tiny"/>
            }
            <span style={{color: (enable ? '#333' : 'rgb(175,175,175)')}}>{family.name} {family.family}</span>
          </Col>,
        );
      });
    }
    return _items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {values} = this.state;

    return (
      <Row>
        {this._renderFamily(values)}
        </Row>
    );
  }
}
