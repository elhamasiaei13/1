import WorkingHour from './WorkingHour';

export default {
  priority: 96,
  name: app.translate('routes.home.attendance.working-hours.Working Hours'),
  path: 'working-hours',
  permissions: ['WorkingHour'],
  component: WorkingHour,
  icon: 'clock',
  drawer: true,
};


