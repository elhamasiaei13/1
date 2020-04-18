import Rules from './Rules';

export default {
  // component: Rules,
  priority: 100,
  path: 'rules',
  permissions: ['Rule'],
  component: Rules,
  name: app.translate('routes.home.attendance.rules.Rules'),
  icon: 'gavel',
  drawer: true,
};


