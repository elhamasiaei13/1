import Inbox from './Inbox';

export default {
  priority: 2,
  path: 'inbox',
  permissions: ['Request@received'],
  component: Inbox,
  name: app.translate('routes.home.requests.Inbox'),
  icon: 'inbox-arrow-down',
  drawer: true,
};


