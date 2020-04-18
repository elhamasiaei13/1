import Calendar from './Calendar';

export default {
  priority: 95,
  name: app.translate('routes.home.attendance.calendar.Calendar'),
  path: 'calendar',
  permissions: ['Calendar'],
  component: Calendar,
  icon: 'calendar',
  drawer: true,
};


