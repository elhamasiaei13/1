import Dashboard from './Dashboard';

export default {
  component: Dashboard,
  priority: 1000,
  permissions: ['Dashboard', 'DashboardChart', 'DashboardBulletin'],
  name: app.translate('routes.home.Dashboard'),
  icon: 'view-dashboard',
  drawer: true,
};
