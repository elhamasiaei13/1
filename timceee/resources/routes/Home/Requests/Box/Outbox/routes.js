import Outbox from './Outbox';

export default {
  priority: 1,
  path: 'sended',
  permissions: ['Request@posted','isNotAdmin'],
  component: Outbox,
  name: app.translate('routes.home.requests.Outbox'),
  icon: 'inbox-arrow-up',
  drawer: true,
};


