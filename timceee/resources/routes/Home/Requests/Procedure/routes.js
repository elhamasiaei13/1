import Procedure from './Procedure';

export default {
  priority: 96,
  path: 'procedure',
  permissions: ['RequestWorkflow'],
  icon: 'message-processing',
  component: Procedure,
  name: app.translate('routes.home.requests.Procedure'),
  drawer: true,
};


