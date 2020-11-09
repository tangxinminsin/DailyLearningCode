
'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = '123d';
  }
  //   判断用户密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
    // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openID: openId };
      // eslint-disable-next-line key-spacing
      this.ctx.body = { data: '登录成功', openId:'openId' };
    } else {
      this.ctx.body = { data: '登陆失败' };
    }
  }
  // 获取文章类别接口
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    // 获取文章信息
    const tmpArticle = this.ctx.request.body;
    // 插入数据库
    const result = await this.app.mysql.insert('article', tmpArticle);
    // 判断数据库是否增加了一行
    const insertSuccess = result.affectedRows === 1;
    // 获取插入文章在数据库中的Id
    const insertId = result.insertId;
    // console.log(insertSuccess);
    this.ctx.body = {
      insertSuccess,
      insertId,
    };
  }
  // 修改文章
  async updataArticle() {
    // 获取文章信息
    const tmpArticle = this.ctx.request.body;
    // 插入数据库
    const result = await this.app.mysql.update('article', tmpArticle);
    // 判断数据库是否增加了一行
    const updataSuccess = result.affectedRows === 1;

    this.ctx.body = {
      updataSuccess,
    };
  }
  // 获取文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "DATE_FORMAT(article.addtime,'%Y-%m-%d %H:%i:%s' ) as addtime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = {
      list: resList,
    };
  }
  // 删除文章
  async deleteArticle() {
    const delid = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id: delid });
    this.ctx.body = {
      data: res,
    };
  }
  // 修改文章
  async revampArticle() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'article.article_content as article_content,' +
    "DATE_FORMAT(article.addtime,'%Y-%m-%d %H:%i:%s' ) as addtime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ,' +
    'type.id as typeId ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
