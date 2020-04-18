import DeviceList from './DeviceList';

export default {
  // component: Rules,
  priority: 100,
  path: 'device-list',
  permissions: ['Device'],
  component: DeviceList,
  name: app.translate('routes.home.attendance.device.Device List'),
  icon: 'deskphone',
  drawer: true,
};


