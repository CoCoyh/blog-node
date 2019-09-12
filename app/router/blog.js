'use strict';

module.exports = app => {
  const { controller, router } = app;
  
  router.post('/login/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.get('/login/oauth', controller.user.oauth);

  router.post('/comment', controller.comment.addComment);

  router.post('/message', controller.message.addMessage);
  
}