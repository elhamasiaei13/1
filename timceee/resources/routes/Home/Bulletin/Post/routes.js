import Post from './Post';

export default {
  component: Post,
  priority: 9,
  permissions: ['Post'],
  name: app.translate('routes.home.bulletin.Post'),
  icon: 'calendar-text',
  drawer: true,
};


