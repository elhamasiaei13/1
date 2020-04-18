import Assignment from './Assignment';

export default {
  priority: 98,
  name: app.translate('routes.home.attendance.policy.Assignment'),
  path: 'assignment',
  component: Assignment,
  permissions: ['PolicyAssignment'],
  icon: 'account-check',
  drawer: true,
};

