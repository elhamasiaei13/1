import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class Sort extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    columnKey: PropTypes.string,
    sort: PropTypes.string,
    sortOnClick: PropTypes.func,
    sortActive: PropTypes.bool,
  };
  static defaultProps = {
    sort: 'ASC',
    sortActive: false,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      sortIcon: ( props.sort === 'ASC' || props.sort === 'desc' ? (props.sort === 'ASC' ? 'up' : 'down') : 'down'),
      sortActive: ( props.sortActive),
    };
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      sortIcon: ( np.sort === 'ASC' || np.sort === 'DESC' ? (np.sort === 'ASC' ? 'up' : 'down') : 'down'),
      sortActive: ( np.sortActive ),
    });
  }

  /**
   *
   * @private
   */
  _handleSortOnClick() {
    const {sortIcon} = this.state;
    const {sortOnClick, title, columnKey} = this.props;

    this.setState({
      sortActive: true,
      sortIcon: (sortIcon === 'down' ? 'up' : 'down'),
    }, () => {
      sortOnClick(( columnKey ? columnKey : title ? title : this ), ( this.state.sortIcon === 'up' ? 'ASC' : 'DESC' ));
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {sort} = this.props;
    const {sortIcon, sortActive} = this.state;

    if (sort) {
      return (
        <MaterialIcon
          name={`sort-${sort.toLowerCase()}ending`} // -bold-box
          // size="tiny"
          onClick={this._handleSortOnClick}
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            color: (sortActive ? 'rgb(16, 142, 233)' : 'rgb(99, 99, 99)'),
            height: '4px',
            lineHeight: '4px',
          }}
        />
      );
    }
    return null;
  }
}
