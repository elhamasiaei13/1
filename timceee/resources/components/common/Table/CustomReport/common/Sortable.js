import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Input, Select} from 'antd';
import uuidv1 from 'uuid/v1';

@autobind
/**
 *
 */
export default class Sortable extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array,
    onChangeListItemInput: PropTypes.func,
    onChangeListItemSelect: PropTypes.func,
    onDeleteItem: PropTypes.func,
  };
  static defaultProps = {
    items: [],
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   */
  componentDidMount() {
    const {onSort} = this.props;
    $(function () {
      $('#sortable').sortable({
        update: function (event, ui) {
          let _update = [];
          $('.sortable').each(function (i) {
            $(this).data('id', i); // updates the data object
            $(this).attr('data-id', i); // updates the attribute
            _update.push($(this).attr('data-key'));
          });
          onSort(_update);
        },
      });
      $('#sortable').disableSelection();
    });
  }

  _onDelete(e) {
    let that = this;
    let th = $(e.target).parent('li').attr('data-key');
    $(e.target).parent('li').slideUp(200, function () {
      that.props.onDeleteItem(th);
    });
  }

  _onChange(e, name) {
    let _index = $(e.target).parent('span').parent('li').attr('id');
    this.props.onChangeListItemInput(e, name, _index);
  }

  _renderType(type, key) {
    let _items = [];

    switch (type) {
      case 'string':
        _items.push(<Select.Option key={uuidv1()} value={`${key}.def`}>{app.translate('components.common.table.Default')}</Select.Option>);
        break;
      case 'date':
        _items.push(...[
          <Select.Option key={uuidv1()} value={`${key}.def`}>{app.translate('components.common.table.Default')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.ymd`}>{app.translate('components.common.table.YMD')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.y-m-d`}>{app.translate('components.common.table.Y-M-D')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.y_m_d`}>{app.translate('components.common.table.Y_M_D')}</Select.Option>,
        ]);
        break;
      case 'datetime':
        _items.push(...[
          <Select.Option key={uuidv1()} value={`${key}.def`}>{app.translate('components.common.table.Default')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.ymd`}>{app.translate('components.common.table.YMD')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.his`}>{app.translate('components.common.table.HIS')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.h-i-s`}>{app.translate('components.common.table.H-I-S')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.y-m-d`}>{app.translate('components.common.table.Y-M-D')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.y_m_d`}>{app.translate('components.common.table.Y_M_D')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.ymdhis`}>{app.translate('components.common.table.YMDHIS')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.y-m-d-h-i-s`}>{app.translate('components.common.table.Y-M-D-H-I-S')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.y_m_d-h-i-s`}>{app.translate('components.common.table.Y_M_D-H-I-S')}</Select.Option>,
        ]);
        break;
      case 'time':
        _items.push(...[
          <Select.Option key={uuidv1()} value={`${key}.def`}>{app.translate('components.common.table.Default')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.int`}>{app.translate('components.common.table.INT')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.his`}>{app.translate('components.common.table.HIS')}</Select.Option>,
          <Select.Option key={uuidv1()} value={`${key}.h-i-s`}>{app.translate('components.common.table.H-I-S')}</Select.Option>,
        ]);
        break;
      default :
        _items.push(<Select.Option key={uuidv1()} value={`${key}.def`}>{app.translate('components.common.table.Default')} {type}</Select.Option>);
    }


    _items.push(<Select.Option key={uuidv1()} value={`${key}.def0`}>{app.translate('components.common.table.Default null')}</Select.Option>);

    return _items;
  }

  _renderItem(items) {
    let li = [];
    let _key = '';
    // console.log('items', items);
    items.map((item, index) => {
      if (item.dataIndex && item.title) {
        _key = `${item.dataIndex}_${index}`;
        li.push(
          <li
            key={_key}
            className="sortable"
            id={_key}
            data-id={index}
            data-key={item.dataKey ? item.dataKey : item.dataIndex}
          >
            <MaterialIcon name="close" size="tiny" onClick={(e) => this._onDelete(e)}/>
            <Input.Group compact>
              <MaterialIcon name="format-line-spacing" size="tiny"/>
              <div style={{width: '150px', overflow: 'hidden'}}>{item.title}</div>
              <Input type="number" min="0" max="300" style={{width: '50px'}} value={item.len ? item.len : null}
                     onChange={(e) => this._onChange(e, 'len')}/>
              <Select className="customReport-select" style={{width: '150px'}} defaultValue={`${_key}.def`}
                      value={item.type ? `${_key}.${item.type}` : `${_key}.def`}
                      onChange={(value, label) => this.props.onChangeListItemSelect(label, 'type', value)}>
                {this._renderType(item.valuesType, _key)}
              </Select>
              <Input
                style={{width: '150px'}}
                value={item.reTitle ? item.reTitle : null}
                onChange={(e) => this._onChange(e, 'reTitle')}/>
            </Input.Group>
          </li>,
        );
      }
    });
    return li;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {items} = this.props;
    return (
      <ul id="sortable">
        {this._renderItem(items)}
      </ul>
    );
  }
}
