import config from 'config/api';
import Promise from 'promise';
import Axios from 'axios';
import store from 'store';
import Qs from 'qs';
import { authenticated } from 'routes/Auth/Module';
import { success, error } from 'routes/General/Module';

const methods = [
  'get',
  'delete',
  'head',
  'options',
  'post',
  'put',
  'patch',
];

@autobind
/**
 *
 */
export default class Api {
  /**
   *
   */
  constructor() {
    this.axios = Axios.create({
      baseURL: `${config.protocol}://${config.url}`,

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

      params: {},

      paramsSerializer: (params) => {
        let _params = app.transform.camelToSnake(params);
        return Qs.stringify(_params, {
          arrayFormat: 'indices',
          format: 'RFC3986',
        });
      },

      transformRequest: [(data) => {
        let _data = app.transform.camelToSnake(data);
        _data = JSON.stringify(_data);
        return _data;
      }],

      validateStatus: (status) => {
        if (status === 401 && localStorage.getItem('access-token')) {
          app.message(app.translate('routes.auth.Token Expired'), 'warning', 5);

          store.dispatch(authenticated(false));
        }

        return status >= 200 && status < 300;
      },

      transformResponse: [(data) => {
        if (app._.isEmpty(data)) {
          return data;
        }

        let _data = JSON.parse(data);
        _data = app.transform.snakeToCamel(_data);
        return _data;
      }],
    });

    methods.map((method) => this[method] = this._fetch(method));
  }

  /**
   *
   * @param {string} method
   * @return {Function}
   * @private
   */
  _fetch(method) {
    return (url, { data, params, ...options } = {}) => {
      this.axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access-token')}`;

      // this.axios.interceptors.response.use(function(res) {
      //   store.dispatch(success(res, url));
      //   // Do something with response data
      //   return res;
      // }, function(err) {
      //   console.log(err);
      //   store.dispatch(error(err, url));
      //   // Do something with response error
      //   return Promise.reject(err);
      // });

      let _params = this.axios.defaults.params;
      if (params) {
        _params = Object.assign({}, _params, params);
      }

      if (['post', 'put', 'patch'].indexOf(method) > -1) {
        store.dispatch({ type: 'DATA_REQUESTED', data, url, method, params: _params });
      }

      return this.axios({
          method,
          url,
          data,
          params: _params,
          ...options,
        })
        .then((res) => {
          store.dispatch(success(res, url));

          return res.data;
        })
        .catch((err) => {
          store.dispatch(error(err, url));

          return Promise.reject(err);
        });
    };
  }
}
