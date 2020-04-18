import GanttTest from './GanttTest';

export default {
  component: GanttTest,
  priority: 11001,
  permissions: ['Post', 'PostCategory'],
  name: app.translate('routes.home.ganttTest.GanttTest', 'GanttTest'),
  icon: 'check',
  drawer: true,
};

