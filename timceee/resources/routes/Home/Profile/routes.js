import Profile from './Profile';

export default {
  priority: 10,
  exact: true,
  path: 'profile',
  permissions: ['Clocking', 'User', 'Request', 'Dashboard'],
  component: Profile,
  name: app.translate('routes.home.profile.Profile'),
  icon: 'account',
  drawer: false,
};
