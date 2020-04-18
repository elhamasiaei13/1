import History from './History';

export default {
  priority: 1,
  path: 'history',
  permissions: ['RequestHistory'],
  component: History,
  name: app.translate('routes.home.requests.History'),
  icon: 'history',
  drawer: true,
};


