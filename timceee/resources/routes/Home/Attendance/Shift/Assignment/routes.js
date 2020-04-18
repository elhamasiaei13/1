import Assignment from './Assignment';

export default {
  priority: 12,
  component: Assignment,
  name: app.translate('routes.home.attendance.shift.Assignment'),
  path: 'assignment',
  permissions: ['ShiftAssignment'],
  icon: 'account-check',
  drawer: true,
};


