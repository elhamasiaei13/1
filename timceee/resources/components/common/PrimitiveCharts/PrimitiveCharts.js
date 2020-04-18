import React from 'react';
import {Toolbar, ToolbarGroup} from 'components/common/Toolbar';
import {Input, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import PropTypes from 'prop-types';
import v1uuid from 'uuid/v1';
// import 'assets/js/jquery-ui-1.10.2.custom.min';
import 'assets/js/primitives.min';
// import 'assets/js/bporgeditor.min';
import 'assets/styles/primitives.styl';

@autobind
/**
 *
 */
export default class PrimitiveCharts extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array,
    buttons: PropTypes.array,
    hasButtons: PropTypes.bool,
    selectable: PropTypes.bool,
    showAllCheckboxes: PropTypes.bool,
    onButtonClick: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onCursorChanged: PropTypes.func,
    cursorItem: PropTypes.number,
    selected: PropTypes.array,
  };

  static defaultProps = {
    items: [],
    buttons: [],
    hasButtons: true,
    selectable: true,
    showAllCheckboxes: true,
    selected: [],
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.searchInputId = v1uuid();
    this.state = {
      searchValue: null,
      matchedSearch: [],
      found: 0,
      onScale: 1,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {
      items, hasButtons, buttons, onButtonClick, selectable, showAllCheckboxes,
      onSelectionChanged, onCursorChanged, cursorItem,
    } = this.props;


    let options = new primitives.orgdiagram.Config();

    options.elbowType = primitives.common.ElbowType.Round;
    options.arrowsDirection = primitives.common.GroupByType.Children;
    options.onSelectionChanged = onSelectionChanged;
    options.onCursorChanged = onCursorChanged;
    options.defaultTemplateName = 'post';
    options.connectorType = 2;
    options.scrollbar = 2;
    options.templates = [this.getPostTemplate(), this.getDepartmentTemplate()];
    options.onItemRender = this.onItemRender;
    options.showCallout = false;

    // chart items (posts, departments, ...)
    let _items = [];
    items.map((item) => {
      /*  switch (item.type) {
          case 'department':
            item.templateName = 'department';
            break;
          case 'post':
            item.templateName = 'post';
            break;
        }
        */

      _items.push(new primitives.orgdiagram.ItemConfig(item));
    });
    options.items = _items;

    // buttons
    if (hasButtons) {
      options.hasButtons = primitives.common.Enabled.Auto;
      options.buttons = buttons;
      options.onButtonClick = onButtonClick;
    } else {
      options.hasButtons = primitives.common.Enabled.False;
    }

    // checkboxes
    if (selectable) {
      if (showAllCheckboxes) {
        options.hasSelectorCheckbox = primitives.common.Enabled.True;
      } else {
        options.hasSelectorCheckbox = primitives.common.Enabled.Auto;
      }
    } else {
      options.hasSelectorCheckbox = primitives.common.Enabled.False;
    }

    if (cursorItem) {
      options.cursorItem = cursorItem;
    }


    $(this.chart).orgDiagram(options);

    $(this.chart).orgDiagram({selectedItems: this.props.selected});

    $('#btnZoomOut').button().click(() => {
      if (this.state.onScale > 0.2) {
        this.setState((prv) => ({
          onScale: (prv.onScale - 0.1),
        }), () => this.onScale(this.state.onScale));
      }
    });

    $('#btnZoomIn').button().click(() => {
      if (this.state.onScale < 2) {
        this.setState((prv) => ({
          onScale: (prv.onScale + 0.1),
        }), () => this.onScale(this.state.onScale));
      }
    });

    $('#btnZoomReset').button().click(() => {
      if (this.state.onScale !== 1) {
        this.setState({onScale: 1}, () => this.onScale(1));
      }
    });

    let that = this;

    $(this.chart).on('wheel', function (event) {
      event.preventDefault();
      if (event.originalEvent.wheelDelta < 0) {
        if (that.state.onScale > 0.2) {
          that.setState((prv) => ({
            onScale: (prv.onScale - 0.1),
          }), () => that.onScale(that.state.onScale));
        }
      }
      else if (event.originalEvent.wheelDelta > 0) {
        if (that.state.onScale < 2) {
          that.setState((prv) => ({
            onScale: (prv.onScale + 0.1),
          }), () => that.onScale(that.state.onScale));
        }
      }
    });
    window.setTimeout(function () {
      $(`#${that.searchInputId}`).focus();
    }, 500);
    // $('.chart').keydown(function(){});
  }


  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (np.items !== this.props.items) {
      $(this.chart).orgDiagram('update',
        primitives.orgdiagram.UpdateMode.Recreate);
    }
  }

  /**
   *
   * @param {Object} np
   * @param {Object} ns
   */
  componentWillUpdate(np, ns) {
    let buttons = (np.hasButtons ? (np.buttons ? np.buttons : buttons) : null);
    let hasButtons = (np.hasButtons ? primitives.common.Enabled.Auto :
      primitives.common.Enabled.False);
    let _items = [];
    np.items.map((item) => {
      /*  item.title = item.name;
        item.description = item.user.name;
        switch (item.type) {
          case 'department':
            item.templateName = 'department';
            break;
          case 'post':
            item.templateName = 'post';
            break;
          default: // TODO remove this
            if (item.hasGroup) {
              item.templateName = 'department';
            } else {
              item.templateName = 'post';
            }
        }*/

      _items.push(new primitives.orgdiagram.ItemConfig(item));
    });

    $(this.chart).orgDiagram({items: _items, buttons, hasButtons});

    this.reCreate();
  }

  onScale(scale) {
    if (scale != null) {
      $(this.chart).orgDiagram({scale: scale});
    }
    $('.ui-tooltip').remove();
    $(this.chart).orgDiagram('update', primitives.orgdiagram.UpdateMode.Refresh);
  }

  fa2en(_value) {
    let value = _value;
    value = value.replace(/[۰]/g, '0');
    value = value.replace(/[۱]/g, '1');
    value = value.replace(/[۲]/g, '2');
    value = value.replace(/[۳]/g, '3');
    value = value.replace(/[۴]/g, '4');
    value = value.replace(/[۵]/g, '5');
    value = value.replace(/[۶]/g, '6');
    value = value.replace(/[۷]/g, '7');
    value = value.replace(/[۸]/g, '8');
    value = value.replace(/[۹]/g, '9');
    return value;
  }

  /**
   *
   * @param {String} value
   */
  onSearch(value) {
    if (value) {
      const {searchValue} = this.state;
      const {items} = this.props;
      let _matched = [];
      let _value = app.persianJs(value).arabicChar().toString();
      let en_value = this.fa2en(value);

      if (searchValue !== _value) {
        if (_value.length > 0) {
          items.map((item) => {
            if ((_matched.indexOf(item.id) < 0)
              && ((item.title
                && item.title.length > 0
                && item.title.search(_value) >= 0)
                || (item.description
                  && item.description.length > 0
                  && item.description.search(_value) >= 0)
                || (item.personnelId
                  && item.personnelId.length > 0
                  && item.personnelId.search(en_value) >= 0))) {
              // TODO personnel code search
              _matched.push(item.id);
            }
          });
        }

        this.setState({
          searchValue: _value,
          matchedSearch: _matched,
        }, () => this.getNextMatchedSearch());
      } else {
        this.getNextMatchedSearch();
      }
    } else {
      this.setState({
        searchValue: '',
        matchedSearch: [],
      }, () => this.getNextMatchedSearch());
    }
  }

  /**
   *
   */
  getNextMatchedSearch() {
    const {matchedSearch} = this.state;

    $(this.chart).orgDiagram({highlightItem: null});

    let _index = matchedSearch.indexOf(this.getActiveItem());

    if (_index > -1 && _index === matchedSearch.length - 1) {
      _index = -1;
    }

    if (_index < matchedSearch.length - 1) {
      this.setState({found: (_index + 1)});
      $(this.chart).orgDiagram({cursorItem: matchedSearch[_index + 1]});
    }

    this.refresh();
  }

  /**
   *
   */
  getPrevMatchedSearch() {
    const {matchedSearch} = this.state;

    $(this.chart).orgDiagram({highlightItem: null});

    let _index = matchedSearch.indexOf(this.getActiveItem());

    if (_index === 0 && matchedSearch.length !== 0) {
      _index = matchedSearch.length;
    }

    if (_index > 0) {
      this.setState({found: (_index - 1)});
      $(this.chart).orgDiagram({cursorItem: matchedSearch[_index - 1]});
    }

    this.refresh();
  }

  /**
   *
   */
  reCreate() {
    let selectedItems = $(this.chart).orgDiagram('option', 'selectedItems');
    $(this.chart).orgDiagram({selectedItems: selectedItems});
    $(this.chart).orgDiagram('update',
      primitives.orgdiagram.UpdateMode.Recreate);
  }

  /**
   *
   */
  refresh() {
    let selectedItems = $(this.chart).orgDiagram('option', 'selectedItems');
    $(this.chart).orgDiagram({selectedItems: selectedItems});
    $(this.chart).orgDiagram('update',
      primitives.orgdiagram.UpdateMode.Refresh);
  }

  /**
   *
   * @return {Array}
   */
  get selected() {
    return $(this.chart).orgDiagram('option', 'selectedItems');
  }
  /**
   *
   * @return {Array}
   */
  get items() {
    return $(this.chart).orgDiagram('option', 'items');
  }

  /**
   *
   * @return {Number}
   */
  getActiveItem() {
    return $(this.chart).orgDiagram('option', 'cursorItem');
  }

  /**
   *
   * @return {primitives.famdiagram.TemplateConfig|primitives.orgdiagram.TemplateConfig}
   */
  getPostTemplate() {
    let result = new primitives.orgdiagram.TemplateConfig();
    result.name = 'post';

    result.itemSize = new primitives.common.Size(150, 100);

    // minimized items marker size and options
    result.minimizedItemSize = new primitives.common.Size(40, 10);
    result.minimizedItemCornerRadius = null;
    result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
    result.minimizedItemShapeType = primitives.common.ShapeType.Circle;
    result.minimizedItemLineWidth = 0;
    result.minimizedItemLineType = primitives.common.LineType.Solid;
    result.minimizedItemOpacity = 1.0;
    result.minimizedItemBorderColor = 'rgb(0, 188, 212)';
    result.minimizedItemFillColor = 'rgb(0, 188, 212)';

    let itemTemplate = jQuery(
      `<div class="bp-item bp-corner-all bt-item-frame"><div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="left: 0; width: 100%; height: 40%;background: #e74c3c;position: relative"><div name="roles" style="position: absolute;bottom: -6px;"></div><div name="title" class="bp-item bp-title" style=" width: 100%; text-align: center;"></div></div><div name="description" class="bp-item" style="position: relative; width: 40%; height: 58%; font-size: 10px;padding: 2% 5%; float: right"></div><img name="avatar" src="" class="bp-item" style="background: rgb(188, 188, 188); left: 0; width: 32%; height: 53%; font-size: 10px;margin: 2% 10%; border: none; outline: none !important; border-radius: 50%"/></div>`,
    ).css({
      width: result.itemSize.width + 'px',
      height: result.itemSize.height + 'px',
    }).addClass('bp-item bp-corner-all bt-item-frame');

    result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

    return result;
  }

  /**
   *
   * @return {primitives.famdiagram.TemplateConfig|primitives.orgdiagram.TemplateConfig}
   */
  getDepartmentTemplate() {
    let result = new primitives.orgdiagram.TemplateConfig();
    result.name = 'department';
    result.isActive = true;
    result.itemSize = new primitives.common.Size(200, 100);

    // minimized items marker size and options
    result.minimizedItemSize = new primitives.common.Size(40, 20);
    result.minimizedItemCornerRadius = null;
    result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
    result.minimizedItemShapeType = primitives.common.ShapeType.Rhombus;
    result.minimizedItemLineWidth = 0;
    result.minimizedItemLineType = primitives.common.LineType.Solid;
    result.minimizedItemOpacity = 1.0;


    let itemTemplate = $(
      `<div class="bp-item bp-corner-all bt-item-frame"><div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="left: 0; width: 100%; height: 100%;"><div name="roles" style="position: absolute;bottom: -6px;"></div><div name="title" title="" class="bp-item bp-title" style="width: 100%;text-align: center;position: absolute;top: 50%;left: 50%;transform: translateY(-50%) translateX(-50%);"></div></div></div>`,
    ).css({
      width: result.itemSize.width + 'px',
      height: result.itemSize.height + 'px',
    }).addClass('bp-item');
    result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

    return result;
  }

  /**
   *
   */
  onItemRender(event, data) {
    switch (data.renderingMode) {
      case primitives.common.RenderingMode.Create:
        /* Initialize widgets here */
        break;
      case primitives.common.RenderingMode.Update:
        break;
    }

    let itemConfig = data.context;

    if (data.templateName === 'department') {
      data.element.find('[name=titleBackground]')
        .css({'background': 'rgb(0, 188, 212)'});
      let fields = ['title', 'roles'];
      for (let index = 0; index < fields.length; index++) {
        let field = fields[index];

        let element = data.element.find('[name=' + field + ']');
        if (field === 'roles') {
          let roles = itemConfig[field];
          let _role = [];
          for (let i = 0; i < roles.length; i++) {
            _role.push(`<span class="roleChart" style="background: ${roles[i].color? roles[i].color: '#ccc'}" title="${roles[i].name}"></span>`);
          }
          element.html(_role);
        } else {
          if (element.text() != itemConfig[field]) {
            element.text(itemConfig[field]);
            element.attr('title', itemConfig[field]);
          }
        }
      }
    }

    if (data.templateName === 'post') {
      let fields = ['title', 'description', 'avatar', 'roles'];
      for (let index = 0; index < fields.length; index++) {
        let field = fields[index];

        let element = data.element.find('[name=' + field + ']');
        if (field === 'roles') {
          let roles = itemConfig[field];
          let _role = [];
          for (let i = 0; i < roles.length; i++) {
            _role.push(`<span class="roleChart" style="background: ${roles[i].color? roles[i].color: '#ccc'}" title="${roles[i].name}"></span>`);
          }
          element.html(_role);
        } else {
          if (field === 'avatar') {
            element.attr('src', itemConfig[field]);
          } else {
            if (element.text() != itemConfig[field]) {
              element.text(itemConfig[field]);
              element.attr('title', itemConfig[field]);
            }
          }
        }
      }
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {searchValue, matchedSearch, onScale, found} = this.state;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          //   height: (document.body.scrollHeight - 140),
        }}
        className="chart"
      >
        <Toolbar>
          <ToolbarGroup>
            <Input.Search
              placeholder={app.translate('main.Search')}
              style={{
                width: 200,
                WebkitMarginEnd: 8,
              }}
              onChange={(e) => this.onSearch(e.target.value)}
              onSearch={this.onSearch}
              id={`${this.searchInputId}`}
            />
            <Button.Group>
              <Button
                onClick={this.getNextMatchedSearch}
                type="primary"
                disabled={!(searchValue && matchedSearch.length > 1 )}
                style={{
                  paddingLeft: 8,
                  height: 32,
                }}
              >
                <MaterialIcon name="chevron-left" size="tiny"/>
              </Button>
              <Button
                onClick={this.getPrevMatchedSearch}
                type="primary"
                disabled={!(searchValue && matchedSearch.length > 1 )}
                style={{
                  paddingRight: 8,
                  height: 32,
                }}
              >
                <MaterialIcon name="chevron-right" size="tiny"/>
              </Button>
            </Button.Group>

            {
              searchValue && searchValue.length > 0 &&
              <span style={{
                padding: '7px',
              }}>{app.translate('main.Search results')} : {matchedSearch.length} {(matchedSearch.length > 0) ? ` / ${found + 1}` : ``}</span>
            }
          </ToolbarGroup>
        </Toolbar>

        <div
          ref={(input) => this.chart = input}
          style={{
            direction: 'ltr',
            width: '100%',
            background: '#ffffff',
            height: 'calc(100% - 64px)',
            //   height: (document.body.scrollHeight - 140 - 48),
          }}
        />

        <div style={{
          margin: '20px',
          marginTop: '-64px',
        }}>
          <span style={{
            padding: '13px',
            borderRadius: '8px',
            background: 'rgba(0,0,0,0.3)',
            display: 'inline-block',
          }}>
            <Button.Group>
              <Button id="btnZoomOut" style={{width: '35px', padding: '0'}} type="primary" icon="minus"/>
              <Button style={{width: '80px', color: '#999'}}>{parseInt(onScale * 100)} %</Button>
              <Button id="btnZoomIn" style={{width: '35px', padding: '0'}} type="primary" icon="plus"/>
            </Button.Group>

              <Button id="btnZoomReset" style={{width: '90px', padding: '0', margin: '0px 8px'}}>{app.translate('main.Reset')}</Button>
          </span>
        </div>
      </div>
    );
  }
}
