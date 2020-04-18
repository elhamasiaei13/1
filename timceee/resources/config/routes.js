import requireAll from 'services/requireAll';
import _ from 'lodash';
// import Dashboard from 'routes/Dashboard/Dashboard';
// import * as Requests from 'routes/Home/Requests';
// import OrganizationChart from 'routes/Basic/OrganizationChart/OrganizationChart';
// import Personnel from 'routes/Basic/Personnel/Personnel';
// import Roles from 'routes/Basic/Roles/Roles';
// import * as Device from 'routes/Home/Attendance/Device/index';
// import Clocking from 'routes/Home/Attendance/Clocking';
// import WorkingHours from 'routes/Home/Attendance/WorkingHours';
// import Calendar from 'routes/Home/Attendance/Calendar';
// import Writs from 'routes/Home/Attendance/Writs';
// import Rules from 'routes/Home/Attendance/Rules';
// import * as Shift from 'routes/Home/Attendance/Shift';
// import * as Policy from 'routes/Home/Attendance/Policy';
// import * as Stack from 'routes/Home/Attendance/Stack';
// import Profile from 'routes/Home/Profile';
// import Storage from 'routes/Storage';
// import ActivityLog from 'routes/Home/Test/ActivityLog';
// import Reports from 'routes/Home/Attendance/Reports';

// search for languages: translate\('routes\.[^(home|auth)]
// search for reducers: state\.Basic

let routes = {};

// TODO move all routes to related path
requireAll(require.context('./../routes', true, /\/routes\.js$/)).map((module) => {
  let _data = module.data.default;
  let _routes = routes;

  let _keys = module.path.replace(/(^\.\/|\/routes\.js$)/g, '');

  _keys = _keys.split('/');

  let _key = _.camelCase(_keys.shift());

  _keys = _keys.map((_key) => _.kebabCase(_key));

  if (!_routes[_key]) {
    _routes[_key] = [];
  }

  _routes = _routes[_key];

  _keys.map((_key) => {
    let _route = _routes.find((_route) => _route.path === _key);

    if (!_route) {
      if (!_.isArray(_data)) {
        _route = {
          routes: [],
          priority: 1,
          ..._data,
          type: 'route',
          exact: false, // TODO set true
          path: _key,
        };
      } else {
        _route = {
          type: 'route',
          priority: 1,
          permissions: [],
          drawer: true,
          path: _key,
          routes: [],
        };
      }

      _routes.push(_route);
    }

    _routes = _route.routes;
  });

  if (_.isArray(_data)) {
    _routes.push(..._data.map((_route) => ({ ..._route, exact: true })));
  }
});

const sortRoutesBy = (array, parser) => {
  let _arr = _.clone(array);

  _arr = _arr.map((_item) => {
    _item.routes = sortRoutesBy(_item.routes, parser);

    return _item;
  })

  return _.sortBy(_arr, parser);
};

routes.home = sortRoutesBy(routes.home, (o) => -o.priority);

export default {
  routes: {
    ...routes,
    home: [
      ...routes.home,
      {
        type: 'redirect',
        exact: true,
        path: '/login',
        permissions: [],
        component: null,
        name: null,
        icon: null,
        drawer: false,
        routes: [{
          type: null,
          exact: true,
          path: '/',
          permissions: [],
          component: null,
          name: null,
          icon: null,
          drawer: false,
          routes: [],
        }],
      },
      {
        type: 'redirect',
        exact: true,
        path: '/',
        permissions: [],
        component: null,
        name: null,
        icon: null,
        drawer: false,
        routes: [{
          type: null,
          exact: true,
          path: 'dashboard',
          permissions: [],
          component: null,
          name: null,
          icon: null,
          drawer: false,
          routes: [],
        }],
      },
      /*
      // {
      //   id: 3,
      //   type: 'route',
      //   exact: true,
      //   path: 'dashboard',
      //   permissions: ['Dashboard'],
      //   component: Dashboard,
      //   name: app.translate('routes.Dashboard'),
      //   icon: 'view-dashboard',
      //   drawer: true,
      //   routes: [],
      // },
      // {
      //   id: 4,
      //   type: 'route',
      //   exact: false,
      //   path: 'basic',
      //   permissions: ['Position', 'User', 'Role'],
      //   component: null,
      //   name: app.translate('routes.Basic Information'),
      //   icon: 'information-outline',
      //   drawer: true,
      //   routes: [
      //     {
      //       id: 1,
      //       type: 'route',
      //       exact: false,
      //       path: 'organization-chart',
      //       permissions: ['Position'],
      //       component: OrganizationChart,
      //       name: app.translate('routes.Organization Chart'),
      //       icon: 'domain',
      //       drawer: true,
      //       routes: [],
      //     },
      //     {
      //       id: 2,
      //       type: 'route',
      //       exact: false,
      //       path: 'personnel',
      //       permissions: ['User'],
      //       component: Personnel,
      //       name: app.translate('routes.Personnel'),
      //       icon: 'account',
      //       drawer: true,
      //       routes: [],
      //     },
      //     {
      //       id: 3,
      //       type: 'route',
      //       exact: false,
      //       path: 'roles',
      //       permissions: ['Role'],
      //       component: Roles,
      //       name: app.translate('routes.Personnel Roles'),
      //       icon: 'clipboard-account',
      //       drawer: true,
      //       routes: [],
      //     },
      //   ],
      // },
      {
        id: 5,
        type: 'route',
        priority: 10,
        exact: false,
        path: 'attendance',
        permissions: ['Rule', 'Report', 'Device', 'Clocking', 'WorkingHour', 'Calendar', 'Shift', 'Writ', 'Stack'],
        component: null,
        name: app.translate('routes.Attendance'),
        icon: 'av-timer',
        drawer: true,
        routes: [
          {
            id: 1,
            type: 'route',
            exact: false,
            path: 'rules',
            permissions: ['Rule'],
            component: Rules,
            name: app.translate('routes.Rules'),
            icon: 'gavel',
            drawer: false,
            routes: [],
          },
          {
            id: 2,
            type: 'route',
            exact: false,
            path: 'reports',
            permissions: ['Report'],
            component: Reports,
            name: app.translate('routes.Reports'),
            icon: 'file-chart',
            drawer: true,
            routes: [],
          },
          {
            id: 3,
            type: 'route',
            exact: false,
            path: 'device',
            permissions: ['Device'],
            component: null,
            name: app.translate('routes.Devices'),
            icon: 'deskphone',
            drawer: true,
            routes: [
              {
                id: 1,
                type: 'route',
                exact: false,
                path: 'device-basic',
                permissions: ['Device'],
                component: Device.DeviceList,
                name: app.translate('routes.Devices List'),
                icon: 'deskphone',
                drawer: true,
                routes: [],
              },
              {
                id: 2,
                type: 'route',
                exact: false,
                path: 'device-chart',
                permissions: ['Device'], // TODO permision
                component: Device.DeviceChart,
                name: app.translate('routes.Devices Chart'),
                icon: 'file-tree',
                drawer: true,
                routes: [],
              },
            ],
          },
          {
            id: 4,
            type: 'route',
            exact: false,
            path: 'clocking',
            permissions: ['Clocking'],
            component: Clocking,
            name: app.translate('routes.Clocking'),
            icon: 'swap-vertical',
            drawer: true,
            routes: [],
          },
          {
            id: 5,
            type: 'route',
            exact: false,
            path: 'working-hours',
            permissions: ['WorkingHour'],
            component: WorkingHours,
            name: app.translate('routes.Working Hours'),
            icon: 'clock',
            drawer: true,
            routes: [],
          },
          {
            id: 6,
            type: 'route',
            exact: false,
            path: 'calendar',
            permissions: ['Calendar'],
            component: Calendar,
            name: app.translate('routes.Calendar'),
            icon: 'calendar',
            drawer: true,
            routes: [],
          },
          {
            id: 7,
            type: 'route',
            exact: false,
            path: 'shifts',
            permissions: ['Shift', 'ShiftAssignment'],
            component: null,
            name: app.translate('routes.Shift'),
            icon: 'calendar-clock',
            drawer: true,
            routes: [{
                id: 1,
                type: 'route',
                exact: true,
                path: 'definition',
                permissions: ['Shift'],
                component: Shift.Definition,
                name: app.translate('routes.Definition'),
                icon: 'content-paste',
                drawer: true,
                routes: [],
              },
              {
                id: 2,
                type: 'route',
                exact: true,
                path: 'assignment',
                permissions: ['ShiftAssignment'],
                component: Shift.Assignment,
                name: app.translate('routes.Assignment'),
                icon: 'account-check',
                drawer: true,
                routes: [],
              },
              {
                id: 3,
                type: 'route',
                exact: true,
                path: 'view',
                permissions: ['ShiftAssignment'], // TODO permision
                component: Shift.View,
                name: app.translate('routes.View'),
                icon: 'view-array',
                drawer: false,
                routes: [],
              },
            ],
          },
          {
            id: 8,
            type: 'route',
            exact: false,
            path: 'writs',
            permissions: ['Writ'],
            component: Writs,
            name: app.translate('routes.Writs'),
            icon: 'folder-open',
            drawer: true,
            routes: [],
          },
          {
            id: 9,
            type: 'route',
            exact: false,
            path: 'policy',
            permissions: ['Policy', 'PolicyAssignment'],
            component: null,
            name: app.translate('routes.Policy'),
            icon: 'scale-balance',
            drawer: true,
            routes: [{
              id: 1,
              type: 'route',
              exact: true,
              path: 'definition',
              permissions: ['Policy'],
              component: Policy.Definition,
              name: app.translate('routes.Definition'),
              icon: 'content-paste',
              drawer: true,
              routes: [],
            },
              {
                id: 2,
                type: 'route',
                exact: true,
                path: 'assignment',
                permissions: ['PolicyAssignment'],
                component: Policy.Assignment,
                name: app.translate('routes.Assignment'),
                icon: 'account-check',
                drawer: true,
                routes: [],
              },
            ],
          },
          {
            id: 10,
            type: 'route',
            exact: false,
            path: 'stacks',
            permissions: ['Stack'],
            component: null,
            name: app.translate('routes.Stack'),
            icon: 'basket',
            drawer: true,
            routes: [{
                id: 1,
                type: 'route',
                exact: false,
                path: 'rules',
                permissions: ['StackRule'],
                component: Stack.Rules,
                name: app.translate('routes.Rules'),
                icon: 'gavel',
                drawer: true,
                routes: [],
              },
              {
                id: 2,
                type: 'route',
                exact: false,
                path: 'packs',
                permissions: ['StackPack', 'StackPackRules','StackSignal', 'StackSignalRules'],
                component: Stack.Packs,
                name: app.translate('routes.Pack Patterns'),
                icon: 'apps',
                drawer: true,
                routes: [],
              },
              {
                id: 3,
                type: 'route',
                exact: false,
                path: 'assignment',
                permissions: ['Stack'],
                component: Stack.Assignment,
                name: app.translate('routes.Assignment'),
                icon: 'account-check',
                drawer: true,
                routes: [],
              },
              {
                id: 4,
                type: 'route',
                exact: false,
                path: 'history',
                permissions: ['StackLog'],
                component: Stack.History,
                name: app.translate('routes.History'),
                icon: 'history',
                drawer: true,
                routes: [],
              },
              {
                id: 5,
                type: 'route',
                exact: false,
                path: 'stack-setting',
                permissions: ['Stack'], // TODO change permision
                component: Stack.Settings,
                name: app.translate('routes.Settings'),
                icon: 'settings',
                drawer: false,
                routes: [],
              },
            ],
          },
        ],
      },
      {
        id: 6,
        type: 'route',
        exact: false,
        path: 'requests',
        priority: 10,
        permissions: ['Request'],
        component: null,
        name: app.translate('routes.Requests'),
        icon: 'email-variant',
        drawer: true,
        routes: [{
            id: 1,
            type: 'route',
            exact: false,
            path: 'dashboard',
            permissions: ['Request@index'], // TODO change permision
            component: Requests.Dashboard,
            name: app.translate('routes.Dashboard'),
            icon: 'view-dashboard',
            drawer: false,
            routes: [],
          },
          {
            id: 2,
            type: 'route',
            exact: false,
            path: 'box',
            permissions: ['Request@posted', 'Request@received', 'Request@index'],
            component: null,
            name: app.translate('routes.Box'),
            icon: 'dropbox',
            drawer: true,
            routes: [{
                id: 1,
                type: 'route',
                exact: false,
                path: 'inbox',
                permissions: ['Request@received'],
                component: Requests.Box.Inbox,
                name: app.translate('routes.Inbox'),
                icon: 'inbox-arrow-down',
                drawer: true,
                routes: [],
              },
              {
                id: 2,
                type: 'route',
                exact: false,
                path: 'sended',
                permissions: ['Request@posted','isNotAdmin'],
                component: Requests.Box.Outbox,
                name: app.translate('routes.Outbox'),
                icon: 'inbox-arrow-up',
                drawer: true,
                routes: [],
              },
            ],
          },
          {
            id: 3,
            type: 'route',
            exact: false,
            path: 'rules',
            permissions: ['Rule'], // TODO change permission
            component: Requests.Rules,
            name: app.translate('routes.Rules'),
            icon: 'gavel',
            drawer: false,
            routes: [],
          },
          {
            id: 4,
            type: 'route',
            exact: false,
            path: 'packet',
            permissions: ['RequestRulePack'],
            component: Requests.RulePack,
            name: app.translate('routes.RulePack'),
            icon: 'content-paste',
            drawer: true,
            routes: [],
          },
          {
            id: 5,
            type: 'route',
            exact: false,
            path: 'assignment',
            permissions: ['RequestRulePackAssignment'],
            component: Requests.Assignment,
            name: app.translate('routes.Assignment'),
            icon: 'account-check',
            drawer: true,
            routes: [],
          },
          {
            id: 6,
            type: 'route',
            exact: false,
            path: 'procedure',
            permissions: ['RequestWorkflow'],
            component: Requests.Procedure,
            name: app.translate('routes.Procedure'),
            icon: 'message-processing',
            drawer: true,
            routes: [],
          },
          {
            id: 7,
            type: 'route',
            exact: false,
            path: 'status',
            permissions: ['RequestStatus'],
            component: Requests.Status,
            name: app.translate('routes.Status'),
            icon: 'approval',
            drawer: false,
            routes: [],
          },
          {
            id: 8,
            type: 'route',
            exact: false,
            path: 'history',
            permissions: ['RequestHistory'],
            component: Requests.History,
            name: app.translate('routes.History'),
            icon: 'email-alert',
            drawer: true,
            routes: [],
          },
        ],
      },
      {
        id: 7,
        type: 'route',
        exact: false,
        path: 'storage',
        permissions: ['Setting'], // TODO Permission ['Storage'],
        component: Storage,
        name: app.translate('routes.Cloud Storage'),
        icon: 'harddisk',
        drawer: false,
        routes: [],
      },
      {
        id: 8,
        type: 'route',
        exact: false,
        path: 'activity-log',
        permissions: ['Setting'], // TODO Permission
        component: ActivityLog,
        name: app.translate('routes.Activity Log'),
        icon: 'file-tree',
        drawer: false,
        routes: [],
      },
      {
        id: 9,
        type: 'route',
        exact: true,
        path: 'profile',
        permissions: ['Clocking','User','Request','Dashboard'],
        component: Profile,
        name: app.translate('routes.Profile'),
        icon: 'account',
        drawer: false,
        routes: [],
      },
      */
    ],
  },
};
