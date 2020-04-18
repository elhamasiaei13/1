import Dashboard from './Dashboard';

export default {
  priority: 99,
  path: 'dashboard',
  permissions: ['Request@index'],
  component: Dashboard,
  name: app.translate('routes.home.requests.Dashboard'),
  icon: 'view-dashboard',
  drawer: true,
};


