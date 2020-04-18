// import Attendance from './Attendance';

export default {
  // component: Attendance,
  priority: 8,
  path: 'attendance',
  permissions: ['Rule', 'Report', 'Device', 'Clocking', 'WorkingHour', 'Calendar', 'Shift', 'Writ', 'Stack'],
  component: null,
  name: app.translate('routes.home.Attendance'),
  icon: 'av-timer',
  drawer: true,
};


