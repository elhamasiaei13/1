import Assignment from './Assignment';

export default {
  priority: 12,
  component: Assignment,
  name: app.translate('routes.home.attendance.stack.Assignment'),
  path: 'assignment',
  permissions: ['StackAssignment'],
  icon: 'account-check',
  drawer: true,
};


