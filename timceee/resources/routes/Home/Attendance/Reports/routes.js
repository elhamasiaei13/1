import Reports from './Reports';

export default {
  priority: 99,
  name: app.translate('routes.home.attendance.reports.Reports'),
  path: 'reports',
  permissions: ['Report'],
  component: Reports,
  icon: 'file-chart',
  drawer: true,
};


