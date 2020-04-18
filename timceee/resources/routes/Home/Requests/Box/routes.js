// import Request from './Request';

export default {
  // component: Request,
  priority: 98,
  path: 'box',
  permissions: ['Request@posted', 'Request@received', 'Request@index'],
  name: app.translate('routes.home.requests.Box'),
  icon: 'dropbox',
  drawer: true,
};


