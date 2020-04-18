import Gantt from './Gantt';

export default {
  component: Gantt,
  priority: 11001,
  permissions: ['Post', 'PostCategory'],
  name: app.translate('routes.home.gantt.Gantt', 'Gantt'),
  icon: 'check',
  drawer: true,
};


