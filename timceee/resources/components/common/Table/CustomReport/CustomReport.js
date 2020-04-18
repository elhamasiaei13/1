import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Input, Modal, Button, Select} from 'antd';
import Sortable from './common/Sortable';
import uuidv1 from 'uuid/v1';

@autobind
/**
 *
 */
export default class CustomReport extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onExport: PropTypes.func,
  };
  static defaultProps = {
    visible: false,
    onCancel: () => {
    },
    onExport: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      items: props.items,
      changeAdd: 'null',
      separator: ',',
      type: 'csv',
      showTitle: 'true',
      showFooter: 'true',
    };
  }


  _submit() {
    const {onCancel, onExport} = this.props;
    const {separator, type, showTitle, showFooter} = this.state;
    let _items = [];
    let _export;
    this.state.items.map((item, index) => {
      _items.push({
        dataIndex: (item.dataIndex ? item.dataIndex : ''),
        title: (item.title ? item.title : ''),
        len: (item.len ? item.len : null),
        type: (item.type ? item.type : 'def'),
        reTitle: (item.reTitle ? item.reTitle : null),
      });
    });
    _export = {
      config: {
        separator: separator,
        type: type,
        showTitle: showTitle,
        showFooter: showFooter,
      },
      data: _items,
    };
    onExport(_export);
    onCancel();
  }

  _save() {
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('JGPRCustomReport', JSON.stringify(this.state));
      app.message(app.translate('components.common.table.save CustomReports success'));
    } else {
      app.message(app.translate('components.common.table.save CustomReports fault', 'error'));
    }
  }

  /*

    '58512e5ecf247'=> 'کارکرد',
    '583eaa68c243a'=> 'اضافه اول وقت',
    '583eaaa35b488'=> 'اضافه آخر وقت',
    '583eaac487e0a'=> 'اضافه خارج وقت',
    '583eaafec0ebe'=> 'تاخیر',
    '583eab1e3a132'=> 'تعجیل',
    '583eab35558ed'=> 'غیبت روزانه',
    '583eab4d43bb8'=> 'غیبت ساعتی',
    '583eab5f62c73'=> 'فرجه',
    '585e5555c61f8'=> 'شناوری',
    '58732d6ccc3de'=> 'مرخصی روزانه',
    '5875b9e96b461'=> 'اضافه کار در مرخصی',
    '5875e59c3eca7'=> 'ماموریت روزانه',
    '5875ea766e730'=> 'مرخصی ساعتی',
    '588ed799dc6b5'=> 'ماموریت ساعتی',
    '5875b9e96b462'=> 'اضافه کار در ماموریت',
    '5875b9e96b463'=> 'شب‌کاری',
    '5875b9e96b464'=> 'جمعه کاری',
    '59704313b5a80'=> 'Report generator',
    '59704313b5a79'=> 'Report total generator',
    '583eaa68c24c1'=> 'اضافه غیر مجاز اول وقت',
    '583eaa68c24c2'=> 'اضافه غیر مجاز آخر وقت',
    '5875b9e96b4c3'=> 'تعطیل کار غیر مجاز اول وقت',
    '5875b9e96b4c4'=> 'تعطیل کار غیر مجاز آخر وقت',
    '59704313b5b02'=> 'اضافه کار در ماموریت روزانه',
    '59704313b5b03'=> 'اضافه کار در حین حرکت',

    '5875ea766f001'=> 'مرخصی ساعتی استحقاقی',
    '5875ea766f002'=> 'مرخصی ساعتی استعلاجی',
    '5875ea766f003'=> 'مرخصی ساعتی تشویقی',
    '5875ea766f004'=> 'مرخصی ساعتی بدون حقوق',
    '5875ea766f005'=> 'مرخصی روزانه - استحقاقی',
    '5875ea766f006'=> 'مرخصی روزانه - استعلاجی',
    '5875ea766f007'=> 'مرخصی روزانه - تشویقی',
    '5875ea766f008'=> 'مرخصی روزانه - بدون حقوق',
    '5875ea766f009'=> 'مرخصی روزانه - فوت بستگان درجه یک',
    '5875ea766f010'=> 'مرخصی روزانه - ازدواج',
    '5875ea766f011'=> 'مرخصی روزانه - زایمان',

    '59704313b5a01'=> 'سیاست مرخصی ساعتی',


    */
  _load() {
    if (typeof(Storage) !== 'undefined') {
      let js = localStorage.getItem('JGPRCustomReport');
      if (!js) {
        let iranTablo = '{"items":[' +
          '{"title":"کد پرسنلی","dataIndex":"personnelId","width":145,"className":"","valuesType":"string","len":"6","type":"def0"},' +
          '{"title":"اضافه کار عادی","dataIndex":"583Eaa68C243A583Eaaa35B4885875B9E96B4615875B9E96B46259704313B5B0259704313B5B03","dataKey":"42bcaaa01","len":"5","type":"def0"},' +
          '{"title":"اضافه کار تعطیل","dataIndex":"5875B9E96B464","dataKey":"42bcaaa02","len":"5","type":"def0"},' +
          '{"title":"مرخصی با حقوق","dataIndex":"5875Ea766F0015875Ea766F0035875Ea766F0055875Ea766F0075875Ea766F0095875Ea766F0105875Ea766F011","dataKey":"42bcaaa03","len":"5","type":"def0"},' +
          '{"title":"مرخصی بدون حقوق","dataIndex":"5875Ea766F0045875Ea766F008","dataKey":"42bcaaa04","len":"5","type":"def0"},' +
          '{"title":"بیماری","dataIndex":"5875Ea766F0025875Ea766F006","dataKey":"42bcaaa05","len":"5","type":"def0"},' +
          '{"title":"غیبت","dataIndex":"583Eab35558Ed583Eab4D43Bb8","dataKey":"42bcaaa06","len":"5","type":"def0"},' +
          '{"title":"تاخیر","dataIndex":"583Eaafec0Ebe","width":145,"className":"","valuesType":"string","len":"5","type":"def0"},' +
          '{"title":"شب کاری","dataIndex":"5875b9e96b463","width":145,"className":"","valuesType":"string","len":"5","type":"def0"},' +
          '{"title":"NULL","dataIndex":"null","dataKey":"42bcaaa09","reTitle":"نوبتکاری","len":"5","type":"def0"}' +
          '],"separator":"","type":"txt","showTitle":"false","showFooter":"false"}';
        js = iranTablo;
      }
      let _state = JSON.parse(js);
      this.setState({
        items: (_state.items ? _state.items : []),
        separator: (_state.separator ? _state.separator : ''),
        type: (_state.type ? _state.type : 'txt'),
        showTitle: (_state.showTitle ? _state.showTitle : 'false'),
        showFooter: (_state.showFooter ? _state.showFooter : 'false'),
      });
      app.message(app.translate('components.common.table.load CustomReports success'));
    } else {
      app.message(app.translate('components.common.table.load CustomReports fault', 'error'));
    }
  }

  _onChangeAdd(value) {
    this.setState({changeAdd: value});
  }

  _onDeleteItem(key) {
    let items = app._.cloneDeep(this.state.items);
    let index = items.findIndex((item) => item.dataIndex === key);
    if (index > -1) {
      items.splice(index, 1);
      this.setState({items});
    }
  }

  _findTitle() {
    let {items} = this.props;
    let {changeAdd} = this.state;
    let _item = items.find((item) => item.dataIndex === changeAdd);

    return _item ? _item.title : 'NULL';
  }

  _onAdd() {
    let {changeAdd, items} = this.state;

    this.setState({
      items: [
        {
          dataKey: uuidv1(),
          dataIndex: changeAdd,
          title: this._findTitle(),
        },
        ...items,
      ],
    });
  }

  _renderItemList() {
    const {items} = this.props;
    let list = [];
    list.push(<Select.Option key="null" value="null">Null</Select.Option>);
    app._.map(items, (item) => {
      list.push(<Select.Option key={item.dataIndex} value={item.dataIndex}>{item.title}</Select.Option>);
    });
    return list;
  }


  _onChangeListItemInput(e, name, _index) {
    let items = app._.cloneDeep(this.state.items);
    items.map((item, index) => {
      if (`${item.dataIndex}_${index}` === `${_index}`) {
        item[name] = e.target.value;
      }
    });
    this.setState({items: items});
  }

  _onChangeListItemSelect(value, name, key) {
    let items = app._.cloneDeep(this.state.items);
    let _key = key.split('.');
    items.map((item, index) => {
      if (`${item.dataIndex}_${index}` === _key[0]) {
        item[name] = _key[1] ? _key[1] : value;
      }
    });
    this.setState({items: items});
  }

  _checkKey() {
    return this.state.items.map((item, index) => ({
      len: null,
      type: 'def',
      reTitle: null,
      ...item,
    }));
  }

  _onSort(ids) {
    const {items} = this.state;
    let _items = [];
    let item;
    ids.map((id) => {
      item = items.find((_item) => _item.dataIndex === id || _item.dataKey === id);
      _items.push(item);
    });
    this.setState({items: _items});
  }

  _onChangeShowTitle(value) {
    this.setState({showTitle: value});
  }

  _onChangeShowFooter(value) {
    this.setState({showFooter: value});
  }

  _onChangeType(value) {
    this.setState({type: value});
  }

  _onChangeSeparator(e) {
    this.setState({separator: e.target.value});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {visible, onCancel} = this.props;
    const {separator, type, showTitle, showFooter} = this.state;
    let _items = this._checkKey();
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        title="Custom Report"
        width='800px'
        style={{
          height: '90%',
        }}
        footer={[
          <Button key="back" size="large" onClick={onCancel}>
            {app.translate('main.Cancel')}
          </Button>,
          <Button key="submit" type="primary" disabled={false} size="large" onClick={this._submit}>
            {app.translate('main.Submit')}
          </Button>, <span key="submit20" style={{
            float: 'right',
          }}>
              <Button key="load" disabled={!(typeof(Storage) !== 'undefined')} size="large" onClick={this._load}>
                {app.translate('main.Load')}
              </Button>
              <Button key="save" disabled={!(typeof(Storage) !== 'undefined')} size="large" onClick={this._save}>
                {app.translate('main.Save')}
              </Button>
          </span>,
        ]}
      >
        <div
          className="customReport"
        >
          <div
            className="toolbar"
          >
            <div className="toolBox">
              <Input.Group compact>
                <Select name="type" id="type" style={{width: '80px'}} value={type} onChange={this._onChangeType}>
                  <Select.Option key="csv" value="csv">CSV</Select.Option>
                  <Select.Option key="text" value="txt">TXT</Select.Option>
                </Select>

                <Input addonBefore={app.translate('components.common.table.Separator')} value={separator} onChange={this._onChangeSeparator}
                       addonAfter={<div>{app.translate('components.common.table.showTitle')}<Select style={{width: '50px', margin: '-4px 8px'}} value={showTitle}
                                                                                                    onChange={this._onChangeShowTitle}>
                         <Select.Option key="true" value="true">{app.translate('components.common.table.true')}</Select.Option>
                         <Select.Option key="false" value="false">{app.translate('components.common.table.false')}</Select.Option>
                       </Select>{app.translate('components.common.table.showFooter')}<Select style={{width: '50px', margin: '-4px 8px'}} value={showFooter}
                                                                                            onChange={this._onChangeShowFooter}>
                         <Select.Option key="true" value="true">{app.translate('components.common.table.true')}</Select.Option>
                         <Select.Option key="false" value="false">{app.translate('components.common.table.false')}</Select.Option>
                       </Select></div>} type="text" style={{width: '380px'}}/>
              </Input.Group>
            </div>
            <div className="addBox">
              <Input.Group compact>
                <Select style={{width: '200px'}} defaultValue="null" onChange={this._onChangeAdd}>
                  {this._renderItemList()}
                </Select>
                <MaterialIcon className="add" name="plus" size="tiny" onClick={this._onAdd}/>
              </Input.Group>
            </div>
          </div>
          <Sortable
            items={_items}
            onSort={this._onSort}
            onChangeListItemInput={this._onChangeListItemInput}
            onChangeListItemSelect={this._onChangeListItemSelect}
            onDeleteItem={this._onDeleteItem}
          />
        </div>
      </Modal>);
  }
}
