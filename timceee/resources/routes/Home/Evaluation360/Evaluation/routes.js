import Evaluation from './Evaluation';

export default {
  component: Evaluation,
  permissions: ['UserAnswer', 'isNotAdmin'],
  name: app.translate('routes.home.evaluation-360.Evaluation'),
  icon: 'account-convert',
  drawer: true,
};
