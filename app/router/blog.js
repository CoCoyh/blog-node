'use strict';

module.exports = app => {
  const { controller, router } = app;
  
  router.post('/api/login', controller.user.login);
  router.post('/api/register', controller.user.register);
  router.get('/api/oauth', controller.user.oauth);

  router.post('/comment', controller.comment.addComment);

  router.post('/message', controller.message.addMessage);
  
}