// -------------------------------------------------------------------< constants >-------------------------------------------------------------------

// ********************************************************************* users ***********************************************************************
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE@HOME/BASIC/PERSONNEL';
const INDEX_USERS_SUCCESS = 'INDEX_USERS_SUCCESS';
const SHOW_USER_SUCCESS = 'SHOW_USER_SUCCESS';
const STORE_USER_SUCCESS = 'STORE_USER_SUCCESS';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const DESTROY_USER_SUCCESS = 'DESTROY_USER_SUCCESS';
// ******************************************************************* insurances ********************************************************************
const INDEX_INSURANCE_TYPES_SUCCESS = 'INDEX_INSURANCE_TYPES_SUCCESS';
const INDEX_USER_INSURANCES_SUCCESS = 'INDEX_USER_INSURANCES_SUCCESS';
const STORE_USER_INSURANCES_SUCCESS = 'STORE_USER_INSURANCES_SUCCESS';
const UPDATE_USER_INSURANCES_SUCCESS = 'UPDATE_USER_INSURANCES_SUCCESS';
const DESTROY_USER_INSURANCES_SUCCESS = 'DESTROY_USER_INSURANCES_SUCCESS';
// ******************************************************************* contracts *********************************************************************
const INDEX_RECRUITMENT_TYPES_SUCCESS = 'INDEX_RECRUITMENT_TYPES_SUCCESS';
const INDEX_USER_CONTRACTS_SUCCESS = 'INDEX_USER_CONTRACTS_SUCCESS';
const STORE_USER_CONTRACTS_SUCCESS = 'STORE_USER_CONTRACTS_SUCCESS';
const UPDATE_USER_CONTRACTS_SUCCESS = 'UPDATE_USER_CONTRACTS_SUCCESS';
const DESTROY_USER_CONTRACTS_SUCCESS = 'DESTROY_USER_CONTRACTS_SUCCESS';
// ******************************************************************** financial ********************************************************************
const INDEX_BANKS_SUCCESS = 'INDEX_BANKS_SUCCESS';
const INDEX_FINANCIALS_SUCCESS = 'INDEX_FINANCIALS_SUCCESS';
const STORE_FINANCIALS_SUCCESS = 'STORE_FINANCIALS_SUCCESS';
const UPDATE_FINANCIALS_SUCCESS = 'UPDATE_FINANCIALS_SUCCESS';
const DESTROY_FINANCIALS_SUCCESS = 'DESTROY_FINANCIALS_SUCCESS';
// ******************************************************************** families ********************************************************************
const INDEX_PROVINCES_SUCCESS = 'INDEX_PROVINCES_SUCCESS';
const INDEX_CITIES_SUCCESS = 'INDEX_CITIES_SUCCESS';
const INDEX_FAMILIES_SUCCESS = 'INDEX_FAMILIES_SUCCESS';
const STORE_FAMILIES_SUCCESS = 'STORE_FAMILIES_SUCCESS';
const UPDATE_FAMILIES_SUCCESS = 'UPDATE_FAMILIES_SUCCESS';
const DESTROY_FAMILIES_SUCCESS = 'DESTROY_FAMILIES_SUCCESS';
// ********************************************************************** phones *********************************************************************
const INDEX_PHONES_SUCCESS = 'INDEX_PHONES_SUCCESS';
const STORE_PHONE_SUCCESS = 'STORE_PHONE_SUCCESS';
const UPDATE_PHONE_SUCCESS = 'UPDATE_PHONE_SUCCESS';
const DESTROY_PHONE_SUCCESS = 'DESTROY_PHONE_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* users ***********************************************************************
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexUsersSuccess(payload) {
  return {
    type: INDEX_USERS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _showUserSuccess(payload) {
  return {
    type: SHOW_USER_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _storeUserSuccess(payload) {
  return {
    type: STORE_USER_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _updateUserSuccess(payload) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _destroyUserSuccess(payload) {
  return {
    type: DESTROY_USER_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************* insurances ********************************************************************
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexInsuranceTypesSuccess(payload) {
  return {
    type: INDEX_INSURANCE_TYPES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexUserInsurancesSuccess(payload) {
  return {
    type: INDEX_USER_INSURANCES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _storeUserInsurancesSuccess(payload) {
  return {
    type: STORE_USER_INSURANCES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _updateUserInsurancesSuccess(payload) {
  return {
    type: UPDATE_USER_INSURANCES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _destroyUserInsurancesSuccess(payload) {
  return {
    type: DESTROY_USER_INSURANCES_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************* contracts *********************************************************************
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexRecruitmentTypesSuccess(payload) {
  return {
    type: INDEX_RECRUITMENT_TYPES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexUserContractsSuccess(payload) {
  return {
    type: INDEX_USER_CONTRACTS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _storeUserContractsSuccess(payload) {
  return {
    type: STORE_USER_CONTRACTS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _updateUserContractsSuccess(payload) {
  return {
    type: UPDATE_USER_CONTRACTS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _destroyUserContractsSuccess(payload) {
  return {
    type: DESTROY_USER_CONTRACTS_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** financial ********************************************************************
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexBanksSuccess(payload) {
  return {
    type: INDEX_BANKS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexUserFinancialsSuccess(payload) {
  return {
    type: INDEX_FINANCIALS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _storeUserFinancialsSuccess(payload) {
  return {
    type: STORE_FINANCIALS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _updateUserFinancialsSuccess(payload) {
  return {
    type: UPDATE_FINANCIALS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _destroyUserFinancialsSuccess(payload) {
  return {
    type: DESTROY_FINANCIALS_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** families ********************************************************************

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexProvincesSuccess(payload) {
  return {
    type: INDEX_PROVINCES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexCitiesSuccess(payload) {
  return {
    type: INDEX_CITIES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexUserFamiliesSuccess(payload) {
  return {
    type: INDEX_FAMILIES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _storeUserFamiliesSuccess(payload) {
  return {
    type: STORE_FAMILIES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _updateUserFamiliesSuccess(payload) {
  return {
    type: UPDATE_FAMILIES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _destroyUserFamiliesSuccess(payload) {
  return {
    type: DESTROY_FAMILIES_SUCCESS,
    payload: payload,
  };
}
// ********************************************************************** phones *********************************************************************

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexUserPhonesSuccess(payload) {
  return {
    type: INDEX_PHONES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _storeUserPhoneSuccess(payload) {
  return {
    type: STORE_PHONE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _updateUserPhoneSuccess(payload) {
  return {
    type: UPDATE_PHONE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _destroyUserPhoneSuccess(payload) {
  return {
    type: DESTROY_PHONE_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* users ***********************************************************************

/**
 *
 * @param {String} [searchValue='']
 * @return {{type: String, payload: String}}
 */
export function setSearchValue(searchValue = '') {
  return {
    type: SET_SEARCH_VALUE,
    payload: searchValue,
  };
}

/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @param {String} [component='personnel']
 * @return {Function}
 */
export function indexUsers(params = {}, callback = () => {}, component = 'personnel') {
  return (dispatch, gs, api) => {
    // THIS SHIT WAS NOT MY IDEA, BUT SEEMS LIKE I SHOULD STOP THINKING HERE SO... LET'S NOT GIVE A F***
    if (app.authorize.can('User@index')) {
      if (component === 'personnel') {
        if (app.authorize.can('User@all')) {
          api.get('/users', { params })
            .then((res) => {
              dispatch(_indexUsersSuccess(res));
              callback(undefined, res);
            })
            .catch((err) => {
              app.error(err, 'routes.home.basic.personnel', 'User', app.translate('routes.home.basic.personnel.Indexing Personnel Failed'));
              // app.message(app.translate('routes.home.basic.personnel.Indexing Personnel Failed'), 'error');
              callback(err);
            });
        } else if (app.authorize.can('User@sub')) {
          api.get('/user/subset', { params })
            .then((res) => {
              dispatch(_indexUsersSuccess(res));
              callback(undefined, res);
            })
            .catch((err) => {
              app.error(err, 'routes.home.basic.personnel', 'User', app.translate('routes.home.basic.personnel.Indexing Personnel Failed'));
              // app.message(app.translate('routes.home.basic.personnel.Indexing Personnel Failed'), 'error');
              callback(err);
            });
        } else if (app.authorize.can('User@self')) {
          api.get('/user', { params })
            .then((res) => {
              dispatch(_indexUsersSuccess({ data: { users: [res.data.user] } }));
              callback(undefined, res);
            })
            .catch((err) => {
              app.error(err, 'routes.home.basic.personnel', 'User', app.translate('routes.home.basic.personnel.Indexing Personnel Failed'));
              // app.message(app.translate('routes.home.basic.personnel.Indexing Personnel Failed'), 'error');
              callback(err);
            });
        }
      } else if (component === 'clocking') {
        if (app.authorize.can('Clocking@all')) {
          api.get('/users', { params })
            .then((res) => {
              dispatch(_indexUsersSuccess(res));
              callback(undefined, res);
            })
            .catch((err) => {
              app.error(err, 'routes.home.basic.personnel', 'User', app.translate('routes.home.basic.personnel.Indexing Personnel Failed'));
              // app.message(app.translate('routes.home.basic.personnel.Indexing Personnel Failed'), 'error');
              callback(err);
            });
        } else if (app.authorize.can('Clocking@sub')) {
          api.get('/user/subset', { params })
            .then((res) => {
              dispatch(_indexUsersSuccess(res));
              callback(undefined, res);
            })
            .catch((err) => {
              app.error(err, 'routes.home.basic.personnel', 'User', app.translate('routes.home.basic.personnel.Indexing Personnel Failed'));
              // app.message(app.translate('routes.home.basic.personnel.Indexing Personnel Failed'), 'error');
              callback(err);
            });
        }
      }

      // api.get('/users', { params })
      //   .then((res) => {
      //     dispatch(_indexUsersSuccess(res));
      //     callback(undefined, res);
      //   })
      //   .catch((err) => {
      //     app.error(err, 'routes.home.basic.personnel', 'User', app.translate('routes.home.basic.personnel.Indexing Personnel Failed'));
      //     // app.message(app.translate('routes.home.basic.personnel.Indexing Personnel Failed'), 'error');
      //     callback(err);
      //   });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyUsers() {
  app.dispatch(setSearchValue());
  return _indexUsersSuccess({ data: { users: [] }, meta: {} });
}

/**
 *
 * @param {Number} user
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showUser(user, params = {}, callback = (r) => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('User@index')) {
      api.get(`/users/${user}`, { params })
        .then((res) => {
          dispatch(_showUserSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(err, 'routes.home.basic.personnel', 'User', app.translate('routes.home.basic.personnel.Showing Personnel Failed'));
          // app.message(app.translate('routes.home.basic.personnel.Showing Personnel Failed'), 'error');
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyUser() {
  return _showUserSuccess({ data: { user: {} } });
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeUser(data, callback = (r) => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('User@store')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Adding new person'));

      api.post(`/users`, { data: { user: data } })
        .then((res) => {
          dispatch(_storeUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.New person added successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'User',
            app.translate('routes.home.basic.personnel.Adding new person failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} user
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUser(user, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('User@update')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Updating person'));

      api.put(`/users/${user}`, { data: { user: data } })
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Person updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'User',
            app.translate('routes.home.basic.personnel.Updating person failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} user
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function patchUser(user, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('User@update')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Updating person'));

      api.patch(`/users/${user}`, { data: { user: data } })
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Person updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'User',
            app.translate('routes.home.basic.personnel.Updating person failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} user
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyUser(user, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('User@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Removing person'));

      api.delete(`/users/${user}`)
        .then((res) => {
          dispatch(_destroyUserSuccess(user));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Person removed successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'User',
            app.translate('routes.home.basic.personnel.Removing person failed')
          ));
          callback(err);
        });
    }
  };
}


/**
 * @param {Number} personnelId
 * @param {Object} params
 * @param {function} callback
 * @return {Function}
 */
export function getUserInfo(personnelId, params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/user/${personnelId}/info`, {params})
      .then((r) => {
        callback(r);
      })
      .catch((e) => {
        callback(e);
        // console.log('', e);
      });
  };
}

// ******************************************************************* insurances ********************************************************************
/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexInsuranceTypes(callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get('/insurances/types')
      .then((res) => {
        dispatch(_indexInsuranceTypesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.basic.personnel', 'Insurance type',
          app.translate('routes.home.basic.personnel.Indexing insurance types failed')
        );
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} user - user id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexUserInsurances(user, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Insurance@index')) {
      api.get(`/users/${user}`, {
          params: {
            includes: [
              'insurances',
            ],
          },
        })
        .then((res) => {
          dispatch(_indexUserInsurancesSuccess({ data: { insurances: res.data.user.insurances } }));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(err, 'routes.home.basic.personnel', 'Insurance',
            app.translate('routes.home.basic.personnel.Indexing insurances failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyUserInsurances() {
  return _indexUserInsurancesSuccess({ data: { insurances: [] } });
}

/**
 *
 * @param {Number} user - user id
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeUserInsurances(user, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Insurance@store')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Adding new insurance'));

      api.post(`/users/${user}/insurances`, { data: { insurance: data } })
        .then((res) => {
          dispatch(_storeUserInsurancesSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.New insurance added successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err,
            'routes.home.basic.personnel', 'Insurance',
            app.translate('routes.home.basic.personnel.Adding new insurance failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} insurance - insurance id
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUserInsurances(insurance, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Insurance@update')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Updating insurance'));

      api.put(`/users/insurances/${insurance}`, { data: { insurance: data } })
        .then((res) => {
          dispatch(_updateUserInsurancesSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Insurance updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Insurance',
            app.translate('routes.home.basic.personnel.Updating insurance failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} insurance - insurance id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyUserInsurances(insurance, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Insurance@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Removing insurance'));

      api.delete(`/users/insurances/${insurance}`)
        .then((res) => {
          dispatch(_destroyUserInsurancesSuccess(insurance));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Insurance removed successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Insurance',
            app.translate('routes.home.basic.personnel.Removing insurance failed')
          ));
          callback(err);
        });
    }
  };
}

// ******************************************************************* contracts *********************************************************************
/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexRecruitmentTypes(callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get('/recruitments/types')
      .then((res) => {
        dispatch(_indexRecruitmentTypesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.basic.personnel', 'Contract',
          app.translate('routes.home.basic.personnel.Indexing contract types failed')
        );
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} user - user id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexUserContracts(user, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Contract@index')) {
      api.get(`/users/${user}`, {
          params: {
            includes: [
              'contracts',
            ],
          },
        })
        .then((res) => {
          dispatch(_indexUserContractsSuccess({ data: { contracts: res.data.user.contracts } }));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.personnel', 'Contract',
            app.translate('routes.home.basic.personnel.Indexing contracts failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyUserContracts() {
  return _indexUserContractsSuccess({ data: { contracts: [] } });
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeUserContract(data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Contract@store')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Adding new contract'));

      api.post(`/users/contracts`, { data: { contract: data } })
        .then((res) => {
          dispatch(_storeUserContractsSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.New contract added successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Contract',
            app.translate('routes.home.basic.personnel.Adding new contract failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} contract - contract id
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUserContract(contract, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Contract@update')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Updating contract'));

      api.put(`/users/contracts/${contract}`, { data: { contract: data } })
        .then((res) => {
          dispatch(_updateUserContractsSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Contract updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Contract',
            app.translate('routes.home.basic.personnel.Updating contract failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 * Destroy user contracts
 * @param {Number} contract - contract id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyUserContract(contract, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Contract@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Removing contract'));

      api.delete(`/users/contracts/${contract}`)
        .then((res) => {
          dispatch(_destroyUserContractsSuccess(contract));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Contract removed successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Contract',
            app.translate('routes.home.basic.personnel.Removing contract failed')
          ));
          callback(err);
        });
    }
  };
}

// ******************************************************************** financial ********************************************************************
/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexBanks(callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get('/banks')
      .then((res) => {
        dispatch(_indexBanksSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.basic.personnel', 'Bank',
          app.translate('routes.home.basic.personnel.Indexing banks failed')
        );
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} user
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexUserFinancials(user, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FinancialInfo@index')) {
      api.get(`/users/${user}`, {
          params: {
            includes: [
              'financialInfos',
            ],
          },
        })
        .then((res) => {
          dispatch(_indexUserFinancialsSuccess({ data: { financialInfos: res.data.user.financialInfos } }));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.personnel', 'Financial information',
            app.translate('routes.home.basic.personnel.Indexing financial information failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyUserFinancials() {
  return _indexUserFinancialsSuccess({ data: { financialInfos: [] } });
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeUserFinancial(data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FinancialInfo@store')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Adding new financial'));

      api.post(`/users/financial_infos`, { data: { financialInfo: data } })
        .then((res) => {
          dispatch(_storeUserFinancialsSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.New financial added successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Financial information',
            app.translate('routes.home.basic.personnel.Adding new financial failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} financialInfo - financialInfo id
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUserFinancial(financialInfo, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FinancialInfo@update')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Updating financial'));

      api.put(`/users/financial_infos/${financialInfo}`, { data: { financialInfo: data } })
        .then((res) => {
          dispatch(_updateUserFinancialsSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Financial updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Financial information',
            app.translate('routes.home.basic.personnel.Updating financial failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 * Destroy user contracts
 * @param {Number} financialInfo - financialInfo id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyUserFinancial(financialInfo, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FinancialInfo@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Removing financial'));

      api.delete(`/users/financial_infos/${financialInfo}`)
        .then((res) => {
          dispatch(_destroyUserFinancialsSuccess(financialInfo));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Financial removed successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Financial information',
            app.translate('routes.home.basic.personnel.Removing financial failed')
          ));
          callback(err);
        });
    }
  };
}


// ******************************************************************** families ********************************************************************

/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexProvinces(callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get('/countries/109/provinces')
      .then((res) => {
        dispatch(_indexProvincesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.basic.personnel', 'Provinces',
          app.translate('routes.home.basic.personnel.Indexing Cities failed')
        );
        callback(err);
      });
  };
}


/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexCities(callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get(`/countries/provinces/cities`)
      .then((res) => {
        dispatch(_indexCitiesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.basic.personnel', 'city',
          app.translate('routes.home.basic.personnel.Indexing Cities failed')
        );
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} user
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexUserFamilies(user, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FamiliesInfo@index')) {
      api.get(`/users/${user}`, {
        params: {
          includes: [
            'families',
          ],
        },
      })
        .then((res) => {
          dispatch(_indexUserFamiliesSuccess({ data: { families: res.data.user.families } }));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.personnel', 'Families information',
            app.translate('routes.home.basic.personnel.Indexing families information failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyUserFamilies() {
  return _indexUserFamiliesSuccess({ data: { families: [] } });
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeUserFamily(data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FamiliesInfo@store')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Adding new financial'));

      api.post(`/users/families`, { data: { family: data } })
        .then((res) => {
          dispatch(_storeUserFamiliesSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.New financial added successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Family information',
            app.translate('routes.home.basic.personnel.Adding new financial failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} family - family id
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUserFamily(family, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FamiliesInfo@update')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Updating financial'));

      api.put(`/users/families/${family}`, { data: { family: data } })
        .then((res) => {
          dispatch(_updateUserFamiliesSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Family updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Family information',
            app.translate('routes.home.basic.personnel.Updating financial failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 * Destroy user contracts
 * @param {Number} family - family id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyUserFamily(family, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('FamiliesInfo@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Removing financial'));

      api.delete(`/users/families/${family}`)
        .then((res) => {
          dispatch(_destroyUserFamiliesSuccess(family));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Family removed successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Family information',
            app.translate('routes.home.basic.personnel.Removing financial failed')
          ));
          callback(err);
        });
    }
  };
}


// ********************************************************************** phones *********************************************************************
/**
 *
 * @param {Number} user - user id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexUserPhones(user, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Phone@index')) {
      api.get(`/users/${user}`, {
          params: {
            includes: [
              'phones',
            ],
          },
        })
        .then((res) => {
          dispatch(_indexUserPhonesSuccess({ data: { phones: res.data.user.phones } }));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.personnel', 'Phone',
            app.translate('routes.home.basic.personnel.Indexing phones failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyUserPhones() {
  return _indexUserPhonesSuccess({ data: { phones: [] } });
}

/**
 *
 * @param {Number} user
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeUserPhone(user, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Phone@store')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Adding new phone'));

      api.post(`/users/${user}/phones`, { data: { phone: data } })
        .then((res) => {
          dispatch(_storeUserPhoneSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.New phone added successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Phone',
            app.translate('routes.home.basic.personnel.Adding new phone failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} phone - phone id
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUserPhone(phone, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Phone@update')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Updating phone'));

      api.put(`/phones/${phone}`, { data: { phone: data } })
        .then((res) => {
          dispatch(_updateUserPhoneSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Phone updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Phone',
            app.translate('routes.home.basic.personnel.Updating phone failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 * Destroy user phones
 * @param {Number} phone - phone id
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyUserPhone(phone, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Phone@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.personnel.Removing phone'));

      api.delete(`/phones/${phone}`)
        .then((res) => {
          dispatch(_destroyUserPhoneSuccess(phone));
          loader.hide(() => app.message(app.translate('routes.home.basic.personnel.Phone removed successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.personnel', 'Phone',
            app.translate('routes.home.basic.personnel.Removing phone failed')
          ));
          callback(err);
        });
    }
  };
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  users: [],
  pagination: {},
  searchValue: '',
  usersMeta: {},
  user: {},
  insuranceTypes: [],
  insurances: [],
  recruitmentTypes: [],
  contracts: [],
  banks: [],
  provinces: [],
  cities: [],
  financialInfos: [],
  families: [],
  phones: [],
}, action) {
  let _index;
  let user;
  let meta;
  let insurances;
  let contracts;
  let financialInfos;
  let families;
  let phones;

  switch (action.type) {
    case SET_SEARCH_VALUE:
      return Object.assign({}, state, { searchValue: action.payload });
    case INDEX_USERS_SUCCESS:
      meta = action.payload.meta;
      return Object.assign({}, state, {
        users: action.payload.data.users,
        pagination: meta ? app.pagination(meta.currentPage + 1, meta.total, meta.limit) : {},
        usersMeta: meta,
      });
    case SHOW_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    case STORE_USER_SUCCESS:
      return Object.assign({}, state, {
        users: [
          action.payload,
          ...state.users,
        ],
      });
    case UPDATE_USER_SUCCESS:
      _index = state.users.findIndex((_user) => _user.id === action.payload.id);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, _index),
          {
            ...state.users[_index],
            ...action.payload,
          },
          ...state.users.slice(_index + 1, state.users.length),
        ],
        user: Object.assign({}, state.user, action.payload),
      });
    case DESTROY_USER_SUCCESS:
      _index = state.users.findIndex((_user) => _user.id === action.payload);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, _index),
          ...state.users.slice(_index + 1, state.users.length),
        ],
      });
    case INDEX_INSURANCE_TYPES_SUCCESS:
      return Object.assign({}, state, {
        insuranceTypes: action.payload.insuranceTypes,
      });
    case INDEX_USER_INSURANCES_SUCCESS:
      return Object.assign({}, state, {
        insurances: action.payload.insurances,
      });
    case STORE_USER_INSURANCES_SUCCESS:
      insurances = app._.cloneDeep(state.insurances);
      insurances.push(action.payload);
      return Object.assign({}, state, {
        insurances,
      });
    case UPDATE_USER_INSURANCES_SUCCESS:
      insurances = app._.cloneDeep(state.insurances);
      _index = insurances.findIndex((_insurance) => _insurance.id === action.payload.id);
      insurances[_index] = action.payload;
      return Object.assign({}, state, {
        insurances,
      });
    case DESTROY_USER_INSURANCES_SUCCESS:
      insurances = app._.cloneDeep(state.insurances);
      _index = insurances.findIndex((_insurance) => _insurance.id === action.payload);
      insurances.splice(_index, 1);
      return Object.assign({}, state, {
        insurances,
      });
    case INDEX_RECRUITMENT_TYPES_SUCCESS:
      return Object.assign({}, state, {
        recruitmentTypes: action.payload.recruitmentTypes,
      });
    case INDEX_USER_CONTRACTS_SUCCESS:
      return Object.assign({}, state, {
        contracts: action.payload.contracts,
      });
    case STORE_USER_CONTRACTS_SUCCESS:
      // contracts = app._.cloneDeep(state.contracts);
      // contracts.push(action.payload);
      return Object.assign({}, state, {
        contracts: [
          action.payload,
          ...state.contracts,
        ],
      });
    case UPDATE_USER_CONTRACTS_SUCCESS:
      contracts = app._.cloneDeep(state.contracts);
      _index = contracts.findIndex((_contract) => _contract.id === action.payload.id);
      contracts[_index] = action.payload;
      return Object.assign({}, state, {
        contracts,
      });
    case DESTROY_USER_CONTRACTS_SUCCESS:
      contracts = app._.cloneDeep(state.contracts);
      _index = contracts.findIndex((_contract) => _contract.id === action.payload);
      contracts.splice(_index, 1);
      return Object.assign({}, state, {
        contracts,
      });
    case INDEX_BANKS_SUCCESS:
      return Object.assign({}, state, {
        banks: action.payload.banks,
      });
    case INDEX_FINANCIALS_SUCCESS:
      return Object.assign({}, state, {
        financialInfos: action.payload.financialInfos,
      });
    case STORE_FINANCIALS_SUCCESS:
      financialInfos = app._.cloneDeep(state.financialInfos);
      financialInfos.push(action.payload);
      return Object.assign({}, state, {
        financialInfos,
      });
    case UPDATE_FINANCIALS_SUCCESS:
      financialInfos = app._.cloneDeep(state.financialInfos);
      _index = financialInfos.findIndex((_financialInfo) => _financialInfo.id === action.payload.id);
      financialInfos[_index] = action.payload;
      return Object.assign({}, state, {
        financialInfos,
      });
    case DESTROY_FINANCIALS_SUCCESS:
      financialInfos = app._.cloneDeep(state.financialInfos);
      _index = financialInfos.findIndex((_financialInfo) => _financialInfo.id === action.payload);
      financialInfos.splice(_index, 1);
      return Object.assign({}, state, {
        financialInfos,
      });

    case INDEX_PROVINCES_SUCCESS:
      return Object.assign({}, state, {
        provinces: action.payload.provinces,
      });

    case INDEX_CITIES_SUCCESS:
      return Object.assign({}, state, {
        cities: action.payload.cities,
      });
    case INDEX_FAMILIES_SUCCESS:
      return Object.assign({}, state, {
        families: action.payload.families,
      });
    case STORE_FAMILIES_SUCCESS:
      families = app._.cloneDeep(state.families);
      families.push(action.payload);
      return Object.assign({}, state, {
        families,
      });
    case UPDATE_FAMILIES_SUCCESS:
      families = app._.cloneDeep(state.families);
      _index = families.findIndex((_family) => _family.id === action.payload.id);
      families[_index] = action.payload;
      return Object.assign({}, state, {
        families,
      });
    case DESTROY_FAMILIES_SUCCESS:
      families = app._.cloneDeep(state.families);
      _index = families.findIndex((_family) => _family.id === action.payload);
      families.splice(_index, 1);
      return Object.assign({}, state, {
        families,
      });
    case INDEX_PHONES_SUCCESS:
      return Object.assign({}, state, {
        phones: action.payload.phones,
      });
    case STORE_PHONE_SUCCESS:
      user = app._.cloneDeep(state.user);
      if (user.phones) {
        user.phones.push(action.payload);
      }
      phones = app._.cloneDeep(state.phones);
      phones.push(action.payload);
      return Object.assign({}, state, {
        user,
        phones,
      });
    case UPDATE_PHONE_SUCCESS:
      user = app._.cloneDeep(state.user);
      if (user.phones) {
        _index = user.phones.findIndex((_phone) => _phone.id === action.payload.id);
        user.phones[_index] = action.payload;
      }
      phones = app._.cloneDeep(state.phones);
      _index = phones.findIndex((_phone) => _phone.id === action.payload.id);
      phones[_index] = action.payload;
      return Object.assign({}, state, {
        phones,
        user,
      });
    case DESTROY_PHONE_SUCCESS:
      user = app._.cloneDeep(state.user);
      if (user.phones) {
        _index = user.phones.findIndex((_phone) => _phone.id === action.payload.id);
        user.phones.splice(_index, 1);
      }
      phones = app._.cloneDeep(state.phones);
      _index = phones.findIndex((_phone) => _phone.id === action.payload);
      phones.splice(_index, 1);
      return Object.assign({}, state, {
        phones,
        user,
      });
    default:
      return state;
  }
}
