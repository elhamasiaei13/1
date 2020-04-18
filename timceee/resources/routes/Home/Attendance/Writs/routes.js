import Writs from './Writs';

export default {
  priority: 94,
  name: app.translate('routes.home.attendance.writs.Writs'),
  path: 'writs',
  permissions: ['Writ'],
  component: Writs,
  icon: 'folder-open',
  drawer: true,
};


