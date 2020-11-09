'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 中间件,检验是否登录
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/updataArticle', adminauth, controller.admin.main.updataArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/deleteArticle/:id', adminauth, controller.admin.main.deleteArticle);
  router.get('/admin/revampArticle/:id', adminauth, controller.admin.main.revampArticle);
};
