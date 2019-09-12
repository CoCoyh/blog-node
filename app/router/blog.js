'use strict';

module.exports = app => {
  const { controller, router } = app;
  
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.get('/user', controller.user.getUser);

  router.post('/comment', controller.comment.addComment);

  router.post('/message', controller.message.addMessage);
  
}