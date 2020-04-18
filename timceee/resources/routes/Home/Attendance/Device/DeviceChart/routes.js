import DeviceChart from './DeviceChart';

export default {
  // component: Rules,
  priority: 98,
  path: 'device-chart',
  permissions: ['Device'],
  component: DeviceChart,
  name: app.translate('routes.home.attendance.device.Device Chart'),
  icon: 'file-tree',
  drawer: true,
};


