import QuestionCategory from './QuestionCategory';

export default {
  component: QuestionCategory,
  priority: 100,
  permissions: ['QuestionCategory'],
  name: app.translate('routes.home.evaluation-360.Question QuestionCategory'),
  icon: 'file-tree',
  drawer: true,
};
