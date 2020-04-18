import React from 'react';
import {connect} from 'react-redux';
import {Card, Button, Modal, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import Chip from 'components/common/Chip';
import MaterialIcon from 'components/common/MaterialIcon';
import Avatar from 'components/common/Avatar';
import Spin from 'components/common/Spin';
import FChart from 'routes/Home/Basic/OrganizationChart/FChart';
import {indexPositions} from 'routes/Home/Basic/OrganizationChart/Module';

@connect((state) => ({
  positions: state.Basic.OrganizationChart.positions,
}), {
  indexPositions,
}, null, {withRef: true})
@autobind
/**
 *
 */
export default class Positions extends React.PureComponent {
  static propTypes = {
    positions: PropTypes.arrayOf(PropTypes.object),
    indexPositions: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.any,
    componentName: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    selected: [],
    componentName: 'Chart',
    onChange: () => {
    },
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      spinning: false,
      showAddForm: false,
      selected: props.selected,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexPositions, componentName, positions} = this.props;
    if(app._.isEmpty(positions)) {
      this.setState({spinning: true}, () => {
        indexPositions(componentName, () => {
          this.setState({spinning: false});
        });
      });
    } else {
      this.setState({spinning: false});
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.selected, np.selected)) {
      this.setState({selected: np.selected});
    }
  }

  /**
   *
   * @return {Number[]}
   */
  selected() {
    return this.state.selected;
  }

  /**
   *
   * @private
   */
  _onAdd= ()=> {
    const {onChange} = this.props;
    let selected = app._.clone(this.positionsChart.selected());
    // selected = selected.map((item) => item * 1);
    // console.log(selected);
    this.setState({
      selected,
      showAddForm: false,
    });
    onChange(selected);
  }

  /**
   *
   * @param {Number} id
   * @private
   */
  _onDelete(id) {
    const {onChange} = this.props;
    let selected = app._.clone(this.state.selected);
    let _index = selected.findIndex((item) => item === id);

    if (_index > -1) {
      selected.splice(_index, 1);

      this.setState({
        selected,
      });

      onChange(selected);
    }
  }

  /**
   *
   * @return {Node[]}
   * @private
   */
  get _chips() {
    const {selected} = this.state;
    const {positions} = this.props;
    let _chips = [];

    positions.map((position) => {
      if (selected.indexOf(position.id) > -1) {
        let _chip = (
          <Chip
            key={position.id}
          >
            <Avatar
              src={position.avatar}
              text={position.name}
            />

            {position.name}

            <MaterialIcon
              name="close-circle"
              onClick={() => this._onDelete(position.id)}
            />
          </Chip>
        );

        if (position.user && position.user.profile) {
          _chip = (
            <Tooltip key={position.id} title={`${position.user.profile.firstName} ${position.user.profile.lastName}`}>
              {_chip}
            </Tooltip>
          );
        }

        _chips.push(_chip);
      }
    });

    if (_chips.length === 0) {
      _chips.push(
        <div
          key={0}
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          {app.translate('main.No data')}
        </div>,
      );
    }

    return _chips;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {selected, showAddForm, spinning} = this.state;
    const {title, positions} = this.props;
    
    return (
      <Spin
        spinning={spinning}
      >
        <Card
          title={title || app.translate('routes.home.requests.procedure.Applicants')}
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() => this.setState({showAddForm: true})}
            >
              {app.translate('main.Add')}
            </Button>
          }
          style={{height: '100%'}}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {this._chips}
          </div>

          {
            showAddForm &&
            <Modal
              title={title || app.translate('routes.Requests')}
              visible={showAddForm}
              onOk={this._onAdd}
              onCancel={() => this.setState({showAddForm: false})}
              width="100%"
              style={{
                height: '100%',
              }}
            >
              <FChart
                ref={(input) => this.positionsChart = input && input.getWrappedInstance()}
                selected={selected}
                items={positions}
              />
            </Modal>
          }
        </Card>
      </Spin>
    );
  }
}
