import Login from './Login';
import Reset from './Reset';

export default [
  {
    path: 'login',
    component: Login,
    name: app.translate('routes.Login'),
  },
  {
    path: 'password/reset',
    component: Reset,
    name: app.translate('routes.Password Reset'),
  },
];
