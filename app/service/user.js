'use strict';
const { Service } = require('egg');
const pre = 'service.user';
class UserService extends Service {
  async login(params) {
    const { ctx } = this;
    const { email, password } = params;
    try {
      const userInfo = await ctx.model.User.findOne({ email, password });
      if (!userInfo) {
        throw new Error('该用户不存在');
      }
      ctx.logger.info(`[${pre}.login]: userInfo = ${userInfo}`);
      ctx.session.SID = userInfo.id;
      return true;      
    } catch(e) {
      ctx.logger.error(`[${pre}.login]: catch with error: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 后台管理登陆
   * @param {*} params 
   */
  async loginAdmin(params) {
    const { ctx } = this;
    const { email, password } = params;
    try {
      const userInfo = await ctx.model.User.findOne({ email, password });
      if (!userInfo) {
        throw new Error('该用户不存在');
      }
      if (userInfo.type !== 0) {
        throw new Error('你没有权限登陆');
      }
      ctx.logger.info(`[${pre}.login]: userInfo = ${userInfo}`);
      ctx.session.SID = userInfo.id;
      return true;      
    } catch(e) {
      ctx.logger.error(`[${pre}.login]: catch with error: ${e}`);
      throw new Error(e);
    }
  }
  
  /**
   * 用户登出
   */
  async logout() {

  }

  /**
   * 用户注册
   */
  async register(params) {
    const { ctx } = this;
    try {
      const userInfo = await ctx.model.User.findOne({ email: params.email });
      if (userInfo) {
        throw new Error('该用户已存在');
      }
      await new ctx.model.User(params).save();
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.register]: catch with error: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取当前用户信息（后台管理员）
   */

   async currentUser(userId) {
     const { ctx } = this;
     try {
       const user = await ctx.model.findOne({ id: userId });
       if (!user) {
         throw new Error('该用户不存在');
       }
       return user;
     } catch (e) {
       ctx.logger.error(`[${pre}.currentUser]: ${e}`);
       throw new Error(e);
     }
   }

   /**
    * 获取登陆用户（博客系统）
    */
   async getUser() {
     
   }

   /**
    * 获取用户列表（管理后台）
    */
   async getUserList() {

   }

   /**
    * 删除用户（管理后台）
    */
  async deleteUser() {

  }
}

module.exports = UserService;