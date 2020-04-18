import View from './View';

export default {
  priority: 11,
  path: 'view',
  permissions: ['ShiftAssignment'],
  component: View,
  name: app.translate('routes.home.attendance.shift.View'),
  icon: 'view-array',
  drawer: true,
};


