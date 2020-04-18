import Questionnaire from './Questionnaire';

export default {
  component: Questionnaire,
  priority: 99,
  permissions: ['Questionnaire'],
  name: app.translate('routes.home.evaluation-360.Question Questionnaire'),
  icon: 'comment-question-outline',
  drawer: true,
};
