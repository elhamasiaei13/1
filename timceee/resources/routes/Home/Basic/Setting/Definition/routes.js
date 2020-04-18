import Definition from './Definition';

export default {
  component: Definition,
  permissions: ['Setting@index'],
  name: app.translate('routes.home.Definition'),
  icon: 'content-paste',
  drawer: true,
  priority: 1000,
};
