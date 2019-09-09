'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router } = app;

  // 博客系统API
  require('./router/blog')(app);
  // 后台管理系统API
  require('./router/admin')(app);

  // 用户
  router.post('/login', controller.user.login);
  router.post('/logout', controller.user.logout);

  // 文章
  router.get('/articleList', controller.article.getArticleList);
  router.get('/article', controller.article.getArticle);
  router.put('/article', controller.article.updateArticle);

  // 评论
  router.get('/commentList', controller.comment.getCommentList);
};
