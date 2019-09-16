'use strict';

const { Controller } = require("egg");

class UserController extends Controller {

  /** 
   * 博客系统用户登陆
   */
  async login() {
    const { ctx, service } = this;
    ctx.validate({
      email: {
        type: 'email',
        required: true,
      },
      password: {
        type: 'password',
        required: true,
        allowEmpty: false,
        min: 6,
      },
    })
    const res = await service.user.login(ctx.req.body);
    ctx.body = res;
  }

  /**
   * 后台管理系统用户登陆
   */
  async loginAdmin() {
    const { ctx, service } = this;
    ctx.validate({
      email: {
        type: 'email',
        required: true,
      },
      password: {
        type: 'password',
        required: true,
        allowEmpty: false,
        min: 6,
      },
    })
    const res = await service.user.loginAdmin(ctx.req.body);
    ctx.body = res;
  }
  
  /**
   * 用户登出
   */
  async logout() {
    const { ctx } = this;
    if (!ctx.session.SID) {
      throw new Error('您还未登陆或登陆超时');
    }
    ctx.session.SID = null;
    ctx.body = true;
  }

  /**
   * 用户注册
   */
  async register() {
    const { ctx, service } = this;
    ctx.validate({ 
      name: 'name',
      password: {
        type: 'password',
        required: true,
        allowEmpty: false,
        min: 6,
      },
      email: {
        type: 'email',
        required: true,
      },
      phone: 'phone',
      type: {
        type: 'enum',
        required: true,
        values: [0, 1, 2, 3, 4],
      },
      introduce: { type: 'string' },
      avatar: { type: 'string' },
    });
    const res = await service.user.register(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 获取当前用户信息（后台管理员）
   */

   async currentUser() {
     const { ctx, service } = this;
     const userId = ctx.session.SID;
     if (!userId) {
       throw new Error('请重新登陆');
     }
     const res = await service.user.currentUser(userId);
     ctx.body = res;
   }

   /**
    * 获取登陆用户（博客系统）
    * 第三方授权登陆的用户信息
    */
   async oauth() {
     const { ctx, service } = this;
     ctx.validate({
       code: {
         type: 'string',
         required: true,
       }
     });
     const res = await service.user.oauth(ctx.request.body);
     ctx.body = res;
   }

   /**
    * 获取用户列表（管理后台）
    */
   async getUserList() {
     const { ctx, service } = this;
     ctx.validate({
      name: {
        type: 'string',
        required: false,
      },
      pageSize: {
        type: 'number',
        required: false,
        default: 10
      },
      pageIndex: {
        type: 'number',
        required: false,
        default: 1
      }
     }, ctx.query);
     const res = await service.user.getUserList(ctx.query);
     ctx.body = res;
   }

   /**
    * 删除用户（管理后台）
    */
  async deleteUser() {
    const { ctx, service } = this;
    ctx.validate({
      id: 'number',
      required: true,
    })
    const res = await service.user.deleteUser(ctx.request.body);
    res.body = res;
  }
  
}

module.exports = UserController;