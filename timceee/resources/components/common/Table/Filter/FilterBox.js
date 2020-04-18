import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Dropdown, Menu, Checkbox, Button, Radio} from 'antd';

@autobind
/**
 *
 */
export default class FilterBox extends React.PureComponent {
  static propTypes = {
    columnKey: PropTypes.string,
    filters: PropTypes.arrayOf(
      PropTypes.object,
    ),
    filterKeys: PropTypes.arrayOf(
      PropTypes.string,
    ),
    filterMultiple: PropTypes.bool,
    filterOnClick: PropTypes.func,
    filterHide: PropTypes.func,
    changeActive: PropTypes.func,
  };
  static defaultProps = {
    columnKey: '',
    filters: [],
    filterKeys: [],
    filterMultiple: true,
    filterOnClick: () => {
    },
    filterHide: () => {
    },
    changeActive: () => {
    },
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      filter: props.filters,
      _defaultValue: props.filterKeys,
    };
  }


  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      filter: np.filters,
      // _defaultValue: np.filterKeys,
    });
  }

  /**
   *
   * @param {object} filter
   * @private
   */
  _onChange(filter) {
    this.setState({_defaultValue: filter});
  }

  /**
   *
   * @param {Array} element
   * @param {Array} filteredValue
   * @param {string} columnKey
   * @return {Array}
   */
  _findFilterCheckbox(element, filteredValue, columnKey) {
    let find = [];

    if (filteredValue) {
      find = find.concat(filteredValue);
    }
    if (Array.isArray(element)) {
      for (let i = 0; i < element.length; i++) {
        if (element[i].key === columnKey) {
          find = find.concat(element[i].value);
        }
      }
    }

    return find;
  }

  /**
   *
   * @param {Array} element
   * @param {Array} filteredValue
   * @param {string} columnKey
   * @return {string}
   */
  _findFilterRadio(element, filteredValue, columnKey) {
    if (filteredValue) {
      if (Array.isArray(filteredValue)) {
        return filteredValue[0];
      } else {
        return filteredValue;
      }
    }
    if (Array.isArray(element)) {
      for (let i = 0; i < element.length; i++) {
        if (element[i].key === columnKey) {
          if (Array.isArray(element[i].value)) {
            return element[i].value[0];
          }
          return element[i].value;
        }
      }
    }

    return null;
  }


  /**
   *
   * @param {Array} filterKey
   * @param {Array} filters
   * @param {Array} filteredValue
   * @param {Boolean} filterMultiple
   * @return {Array}
   * @private
   */
  _getDefaultValue(filterKey, filters, filteredValue, filterMultiple) {
    let defaultValueCheckbox = [];
    let defaultValueRadio = '';

    if (filterMultiple === false) {
      let _defaultValueRadio = this._findFilterRadio(filters, filteredValue, filterKey);
      if (_defaultValueRadio) {
        defaultValueRadio = _defaultValueRadio;
      }
      return defaultValueRadio;
    } else {
      let _defaultValueCheckbox = this._findFilterCheckbox(filters, filteredValue, filterKey);
      if (!app._.isEmpty(_defaultValueCheckbox)) {
        defaultValueCheckbox.push(..._defaultValueCheckbox);
      }
      return defaultValueCheckbox;
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {columnKey, filters, filterOnClick, filterHide, changeActive, filterMultiple} = this.props;
    let _filtersRadio = [];
    let _filtersCheckbox = [];
    let {_defaultValue} = this.state;

    if (!app._.isEmpty(filters)) {
      filters.map((filter) => {
        _filtersRadio.push(
          <span
            key={`${filter.value}`}>
          <Radio
            value={`${filter.value}`}
          >
            {filter.text}
          </Radio>
          <br/>
        </span>,
        );

        _filtersCheckbox.push(
          <span
            key={filter.value}
          >
          <Checkbox
            value={`${filter.value}`}
          >
            {filter.text}
          </Checkbox>
          <br/>
        </span>,
        );
      });
      return (
        <div className="custom-filter-dropdown">
          {
            filterMultiple === false
              ?
              <Radio.Group value={_defaultValue}
                           onChange={(value) => this._onChange([value.target.value])}>
                {_filtersRadio}
              </Radio.Group>
              :
              <Checkbox.Group value={_defaultValue} onChange={(value) => this._onChange(value)}>
                {_filtersCheckbox}
              </Checkbox.Group>
          }
          <br/>
          <Button.Group>
            <Button
             disabled={app._.isEqual(this.state._defaultValue, this.props.filterKeys) && app._.isEmpty(this.state._defaultValue)}
              onClick={() => {
                this._onChange([]);
                changeActive(false);
                filterHide();
                filterOnClick(columnKey, []);
              }}>{app.translate('main.Reset')}</Button>
            <Button
              disabled={app._.isEqual(this.state._defaultValue, this.props.filterKeys) }
              type="primary"
              onClick={() => {
                filterHide();
                changeActive(!app._.isEmpty(this.state._defaultValue));
                filterOnClick(columnKey, this.state._defaultValue);
              }}>{app.translate('main.Ok')}</Button>
          </Button.Group>
        </div>
      );
    }
    return null;
  }
}
