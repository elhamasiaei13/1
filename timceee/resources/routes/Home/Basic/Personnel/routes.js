import Personnel from './Personnel';

export default {
  component: Personnel,
  permissions: ['User'],
  name: app.translate('routes.home.Personnel'),
  icon: 'account',
  drawer: true,
};
