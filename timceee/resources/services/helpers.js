import 'services/prototypes/array';
// import 'services/prototypes/object';
import 'services/prototypes/react';
import persianJs from 'persianjs';
import _ from 'lodash';
import {autobind} from 'core-decorators';
import {sprintf} from 'sprintf-js';
import message from 'services/message';
import notification from 'services/notification';
import error from 'services/error';
import local from 'services/local';
import Loading from 'services/loading';
import Transform from 'services/transform';
import Lang from 'services/Lang';
import range from 'services/range';
import authorize from 'services/decorators/authorize';
import pagination from 'config/pagination';

let _lang = (new Lang());

Window.prototype.app = {
  message,
  notification,
  loading: (message, callback) => new Loading(message, callback),
  transform: Transform,
  lang: _lang,
  translate: _lang.translate,
  persianJs,
  _,
  range,
  error,
  local,
  config: {
    pagination,
  },
  pagination: (page, total, limit) => ({
    current: page,
    total: total,
    pageSize: limit,
    showTotal: (total, range) => _lang.translate('main.showingFromToOf', {
      start: range[0],
      end: range[1],
      total,
    }),
  }),
};

// decorators
Window.prototype.autobind = autobind;
Window.prototype.authorize = authorize;

Window.prototype.sprintf = sprintf;

window.jQuery = window.$ = jQuery;
