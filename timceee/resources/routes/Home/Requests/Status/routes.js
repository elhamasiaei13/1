import Status from './Status';

export default {
  priority: 10,
  path: 'status',
  permissions: ['RequestStatus'],
  component: Status,
  name: app.translate('routes.home.requests.Status'),
  icon: 'approval',
  drawer: true,
};


