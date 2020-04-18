import GanttTestOrgContainarWrapper from './GanttTestOrgContainarWrapper';

export default {
  component: GanttTestOrgContainarWrapper,
  priority: 11001,
  permissions: ['Post', 'PostCategory'],
  name: app.translate('routes.home.ganttTest.GanttTest', 'GanttTest'),
  icon: 'check',
  drawer: true,
};

