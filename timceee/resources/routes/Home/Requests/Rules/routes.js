import Rules from './Rules';

export default {
  priority: 100,
  path: 'rules',
  permissions: ['RequestRules@index'],
  component: Rules,
  name: app.translate('routes.home.requests.Rules'),
  icon: 'gavel',
  drawer: true,
};


