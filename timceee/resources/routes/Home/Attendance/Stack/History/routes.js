import History from './History';

export default {
  priority: 1,
  path: 'history',
  permissions: ['StackLog'],
  component: History,
  name: app.translate('routes.home.attendance.stack.History'),
  icon: 'history',
  drawer: true,
};


