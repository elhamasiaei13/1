import GanttTg from './Gantt';

export default {
  component: GanttTg,
  priority: 11001,
  permissions: ['Post', 'PostCategory'],
  name: app.translate('routes.home.ganttTest.Gantt', 'Gantt'),
  icon: 'check',
  drawer: true,
};

