import React from 'react';
import {connect} from 'react-redux';
import {Card, Button, Modal} from 'antd';
import PropTypes from 'prop-types';
import Chip from 'components/common/Chip';
import Icon from 'components/common/MaterialIcon';
import RequestTypes from './../../../Dashboard/RequestTypes';
import {Types} from 'routes/General/Types';

@autobind
/**
 *
 */
export default class Requests extends React.PureComponent {
  static propTypes = {
    // types: PropTypes.arrayOf(PropTypes.object),
    // indexTypes: PropTypes.func,
    deletable: PropTypes.bool,
    active: PropTypes.bool,
    selected: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    selected: [],
    deletable: true,
    active: true,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false,
      selected: props.selected,
      types: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.setState({types: Types.items('Request')});
    // const {indexTypes} = this.props;
    //
    // indexTypes({
    //   includes: [
    //     'rule',
    //     'children',
    //     'children.children',
    //   ],
    //   filterGroups: [
    //     {
    //       filters: [
    //         {
    //           key: 'request_type_id',
    //           value: null,
    //           operator: 'eq',
    //         },
    //       ],
    //     },
    //   ],
    // });
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
  _onAdd() {
    let selected = app._.clone(this.requestTypes.selected());

    selected = selected.map((item) => ({typeId: item * 1}));

    this.setState({
      selected,
      showAddForm: false,
    });
  }

  /**
   *
   * @param {Number} id
   * @private
   */
  _onDelete(id) {
    let selected = app._.clone(this.state.selected);
    let _index = selected.findIndex((item) => item.typeId === id);

    if (_index > -1) {
      selected.splice(_index, 1);

      this.setState({
        selected,
      });
    }
  }

  /**
   *
   * @param {Number} id
   * @private
   */
  _onStatusChange(id) {
    let selected = app._.clone(this.state.selected);
    let _index = selected.findIndex((item) => item.typeId === id);

    if (_index > -1) {
      selected[_index].active = selected[_index].active === 0 ? 1 : 0;

      this.setState({
        selected,
      });
    }
  }

  _findInSelected(_item, types, label = '') {
    let item = {};
    for (let i = 0; i < types.length; i++) {
      if (types[i].children && types[i].children[0]) {
        item = this._findInSelected(_item, types[i].children, `${types[i].label}`);
      } else {
        if (_item.typeId === types[i].id) {
          item = types[i];
        }
      }
      if (item && item.id) {
        break;
      }
    }
    if (item && item.id) {
      item = Object.assign({}, item, {label: `${label} ${item.label}`});
    }
    return item;
  }

  /**
   *
   * @return {Node[]}
   * @private
   */
  get _chips() {
    const {selected, types} = this.state;
    const {active, deletable} = this.props;
    let _chips = [];
    selected.map((item, index) => {
      let selectedType = this._findInSelected(item, types);
      if (selectedType && selectedType.id) {
        if (deletable) {
          _chips.push(
            <Chip
              key={selectedType.id}
            >
              {selectedType.label}
              <Icon
                name="close-circle"
                onClick={() => this._onDelete(selectedType.id)}
              />
            </Chip>,
          );
        } else {
          let _active = active && selected[index].active;
          _chips.push(
            <Chip
              key={selectedType.id}
            >
              {selectedType.label}
              <Icon
                name={_active ? 'check' : 'close'}
                onClick={() => this._onStatusChange(selectedType.id)}
                disabled={!active}
                style={{
                  color: _active ? '#009688' : '#F44336',
                }}
              />
            </Chip>,
          );
        }
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
    const {selected, types, showAddForm} = this.state;
    const {deletable} = this.props;

    return (
      <Card
        title={app.translate('routes.Requests')}
        extra={
          deletable &&
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.setState({showAddForm: true})}
          >
            {app.translate('main.Add')}
          </Button>
        }
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {this._chips}
        </div>

        <Modal
          title={app.translate('routes.Requests')}
          visible={showAddForm}
          onOk={this._onAdd}
          onCancel={() => this.setState({showAddForm: false})}
          style={{
            maxHeight: '100%',
          }}
        >
          <RequestTypes
            ref={(input) => this.requestTypes = input }
            types={types}
            checkAll
            selected={selected.map((item) => `${item.typeId}`)}
            visible={showAddForm}
          />
        </Modal>
      </Card>
    );
  }
}
