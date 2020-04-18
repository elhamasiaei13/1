import Definition from './Definition';

export default {
  priority: 100,
  name: app.translate('routes.home.attendance.policy.Definition'),
  path: 'definition',
  component: Definition,
  permissions: ['Policy'],
  icon: 'content-paste',
  drawer: true,
};


