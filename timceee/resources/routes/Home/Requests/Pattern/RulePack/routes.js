import RulePack from './RulePack';

export default {
  priority: 11,
  path: 'packet',
  permissions: ['RequestRulePack'],
  component: RulePack,
  name: app.translate('routes.home.requests.Definition'),
  icon: 'content-paste',
  drawer: true,
};


