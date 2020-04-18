import Packs from './Packs';

export default {
  priority: 13,
  path: 'packs',
  permissions: ['StackPack', 'StackPackRules', 'StackSignal', 'StackSignalRules'],
  component: Packs,
  name: app.translate('routes.home.attendance.stack.Packs'),
  icon: 'content-paste',
  drawer: true,
};


