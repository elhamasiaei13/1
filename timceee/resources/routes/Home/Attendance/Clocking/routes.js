import Clocking from './Clocking';

export default {
  priority: 96,
  name: app.translate('routes.home.attendance.clocking.Clocking'),
  path: 'clocking',
  permissions: ['Clocking'],
  component: Clocking,
  icon: 'swap-vertical',
  drawer: true,
};


