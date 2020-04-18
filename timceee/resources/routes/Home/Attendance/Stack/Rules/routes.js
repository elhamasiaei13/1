import Rules from './Rules';

export default {
  priority: 100,
  path: 'rules',
  permissions: ['StackRule'],
  component: Rules,
  name: app.translate('routes.home.attendance.stack.Rules'),
  icon: 'gavel',
  drawer: true,
};


