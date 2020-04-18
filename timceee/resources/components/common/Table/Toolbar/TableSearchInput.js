import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class TableSearchInput extends React.PureComponent {
  static propTypes = {
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    onSearch: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  /**
   *
   * @private
   */
  _emitEmpty() {
    this.setState({searchValue: ''});
  }

  /**
   *
   * @param {element} e
   * @private
   */
  _onChangeTableSearchInput(e) {
    this.setState({searchValue: e.target.value});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onSearch} = this.props;
    const {searchValue} = this.state;
    const prefix = searchValue ? <MaterialIcon name={'close'} onClick={this._emitEmpty}/> : null;

    return (
      onSearch &&
      <Input.Search
        placeholder={app.translate('main.Search')}
        onSearch={onSearch}
        value={searchValue}
        prefix={prefix}
        onChange={this._onChangeTableSearchInput
        }
        style={{
          width: 200,
          margin: '-13px 32px',
          height: '100%',
          overflowY: 'auto',
        }}
      />
    );
  }
}
