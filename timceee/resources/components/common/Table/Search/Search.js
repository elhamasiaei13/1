import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Popover, Button, Input} from 'antd';

@autobind
/**
 *
 */
export default class Search extends React.PureComponent {
  static propTypes = {
    columnKey: PropTypes.string,
    onSearch: PropTypes.func,
    searchActive: PropTypes.bool,
    defaultKey: PropTypes.string,
    defaultValue: PropTypes.string,
  };
  static defaultProps = {
    searchActive: false,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      searchActive: (props.searchActive),
      visible: false,
        value: props.defaultValue,
      };
    }

    /**
     *
     * @param {object} np
     */
    componentWillReceiveProps(np) {
      this.setState({
        value: np.defaultValue,
      });
    }
  /**
   *
   */
  hide() {
    this.setState({
      visible: false,
    });
  }

  onChange(value) {
    this.setState({value});
  }

  _onClick() {
    this.setState({
      visible: false,
    });
    let {value} = this.state;
    this.props.onSearch(this.props.defaultKey, value);
  }

  /**
   *
   * @param {Boolean} visible
   */
  handleVisibleChange(visible) {
    this.setState({visible});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {columnKey, onSearch, defaultKey, defaultValue} = this.props;
    const {searchActive, value} = this.state;

    return (
      <Popover
        content={
          <span>
            <Input
              type='text'
              value={value}
              defaultValue={this.props.defaultValue}
              onChange={(e) => this.onChange(e.target.value)}
            />
            <Button
              type="primary"
              onClick={() => this._onClick()}
              style={{
                margin: '5px',
              }}>
              {app.translate('main.Search')}
            </Button>
          </span>
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottom"
        className="filterbox"
        title={app.translate('main.Search')}
        onClick={() => this.setState({visible: true})}
      >
        <MaterialIcon
          name='magnify'
          size="tiny"
          style={{
            cursor: 'pointer',
            color: (defaultValue !=='' ? 'rgb(16, 142, 233)' : 'rgb(99, 99, 99)'),
          }}
        />
      </Popover>
    );
  }
}
