import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import Avatar from 'components/common/Avatar';

@autobind
/**
 *
 */
export default class StateDiagram extends React.PureComponent {
  static propTypes = {
    size: PropTypes.oneOf([
      'small', 'default', 'large',
    ]),
    priorityKey: PropTypes.string,
    items: PropTypes.array,
    viewMode: PropTypes.oneOf([
      'diagram', 'list',
    ]),
  };

  static defaultProps = {
    size: 'default',
    viewMode: 'diagram',
  };

  _items(items, priorityKey) {
    let key = '';
    let _items = [];

    app._.map(items, (item) => {
      key = item[priorityKey];
      if (!_items[key]) {
        _items[key] = [];
      }
      _items[key].push(item);
    });


    return _items;
  }

  _render(items, priorityKey) {
    let _items = this._items(items, priorityKey);
    let view = [];
    let index = 1;
    let className = 'unknown';
    let list = [];

    for (let x in _items) {
      if (app._.isArray(_items[x])) {
        className = 'unknown';
        list = [];
        app._.map(_items[x], (item) => {
          list.push(
            <span
              className="listTooltip"
              key={`${x}.${Math.random()}`}
            >
              <Avatar
                size="small"
                src={item.user && item.user.avatar}
                text={item.user ? `${item.user.firstName} ${item.user.lastName}` : app.translate('main.null user')}
              />
              {item.status === 'accepted' &&
              <MaterialIcon
                name="check"
                size="tiny"
                style={{
                  color: '#66ff66',
                }}
                className={item.status}
              />
              }
              {item.status === 'rejected' &&
              <MaterialIcon
                name="close"
                size="tiny"
                style={{
                  color: '#ff6666',
                }}
                className={item.status}
              />
              }
              <span>
              {item.user ? `${item.user.firstName} ${item.user.lastName}` : app.translate('main.null user')}
              </span>
              <span>
              (
                {
                  item.position ? item.position.name : app.translate('main.substitute')
                }
                )
              </span>

              </span>,
          );


          if ((className === 'unknown' || className === 'waiting') && item.status !== 'unknown') {
            if ((className !== 'accepted' && className !== 'rejected')) {
              className = item.status;
            }

          }
        });
        view.push(
          <div
            key={`${index}`}
            className={className}>
            <Tooltip placement="bottom" title={list}>
              <span> {app.translate('components.common.state-diagram.Step', 'Step')} {index}
                : {list.length} {app.translate('components.common.state-diagram.Person', 'Person')}  </span>
            </Tooltip>
          </div>,
        );
      }
      index++;
    }
    return view;
  }
  _renderList(items, priorityKey) {
    let _items = this._items(items, priorityKey);
    let view = [];
    let index = 1;
    let className = 'unknown';
    let list = [];

    for (let x in _items) {
      if (app._.isArray(_items[x])) {
        className = 'unknown';
        list = [];
        app._.map(_items[x], (item) => {
          list.push(
            <span
              className="listTooltip"
              key={`${x}.${Math.random()}`}
            >
              <Avatar
                size="small"
                src={item.user && item.user.avatar}
                text={item.user ? `${item.user.firstName} ${item.user.lastName}` : app.translate('main.null user')}
              />
              {item.status === 'accepted' &&
              <MaterialIcon
                name="check"
                size="tiny"
                style={{
                  color: '#66ff66',
                }}
                className={item.status}
              />
              }
              {item.status === 'rejected' &&
              <MaterialIcon
                name="close"
                size="tiny"
                style={{
                  color: '#ff6666',
                }}
                className={item.status}
              />
              }
              <span>
              {item.user ? `${item.user.firstName} ${item.user.lastName}` : app.translate('main.null user')}
              </span>
              <span>
              (
                {
                  item.position ? item.position.name : app.translate('main.substitute')
                }
                )
              </span>

              </span>,
          );


          if ((className === 'unknown' || className === 'waiting') && item.status !== 'unknown') {
            if ((className !== 'accepted' && className !== 'rejected')) {
              className = item.status;
            }

          }
        });
        view.push(
          <div
            key={`${index}`}
            className={className}>
              <span> {app.translate('components.common.state-diagram.Step', 'Step')} {index}
                : {list.length} {app.translate('components.common.state-diagram.Person', 'Person')}  </span>
            <div className='diagramList'>
              {list}
            </div>
          </div>,
        );
      }
      index++;
    }
    return view;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      priorityKey,
      viewMode,
      items,
      ...rest
    } = this.props;

    return (
      <div
        style={{
          margin: '0px auto',
        }}
      >
        {!app._.isEmpty(items) ? viewMode === 'diagram' ?
          <div
            className="StateDiagram"
            {...rest}
          >
            <div>
              <MaterialIcon
                name="telegram"
                size="tiny"
              />
            </div>
            {this._render(items, priorityKey)}
            <div>
              <MaterialIcon
                name="archive"
                size="tiny"
              />
            </div>
          </div>
          :
          <div
            className="StateDiagramList"
          >
            {this._renderList(items, priorityKey)}
          </div>
          : ''
        }
      </div>
    );
  }
}
