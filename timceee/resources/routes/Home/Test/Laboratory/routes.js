import Laboratory from './Laboratory';

export default {
  component: Laboratory,
  priority: 500,
  permissions: ['Dashboard'],
  name: app.translate('routes.home.laboratory.Laboratory'),
  icon: 'air-conditioner',
  drawer: true,
};
