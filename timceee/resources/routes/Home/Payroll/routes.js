import Payroll from './Payroll';

export default {
  component: Payroll,
  priority: 9,
  permissions: ['Payroll', 'isNotAdmin'],
  name: app.translate('routes.home.payroll.Payroll'),
  icon: 'cloud-print-outline',
  drawer: true,
};


