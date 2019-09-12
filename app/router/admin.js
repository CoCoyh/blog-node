'use strict';

module.exports = app => {
  const { controller, router } = app;

  router.post('/login/loginAdmin', controller.user.loginAdmin);
  router.get('/currentUser', controller.user.currentUser);
  router.get('/userList', controller.user.getUserList);
  router.delete('/user', controller.user.deleteUser);

  router.post('/article', controller.article.addArticle);
  router.delete('/article', controller.article.deleteArticle);

  router.put('/comment', controller.comment.updateComment);

  router.post('/project', controller.project.addProject);
  router.put('/project', controller.project.updateProject);
  router.delete('/project', controller.project.deleteProject);
  router.get('/projectList', controller.project.getProjectList);
  router.get('/project', controller.project.getProject);

  router.put('/replyMessage', controller.message.replyMessage);
  router.delete('/message', controller.message.deleteMessage);
  router.get('/messageList', controller.message.getMessageList);
  router.get('/message', controller.message.getMessage);

  router.post('/tag', controller.tag.addTag);
  router.delete('/tag', controller.tag.deleteTag);
  router.get('/tagList', controller.tag.getTagList);

  router.post('/category', controller.category.addCategory);
  router.delete('/category', controller.category.deleteCategory);
  router.get('/categoryList', controller.category.getCategoryList);
}