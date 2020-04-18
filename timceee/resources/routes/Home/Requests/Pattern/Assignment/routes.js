import Assignment from './Assignment';

export default {
  priority: 10,
  component: Assignment,
  name: app.translate('routes.home.requests.Assignment'),
  path: 'assignment',
  permissions: ['RequestRulePackAssignment'],
  icon: 'account-check',
  drawer: true,
};


