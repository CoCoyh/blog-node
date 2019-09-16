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
    * GitHub授权登陆信息
    */
   async oauth(param) {
     const { ctx } = this;
     try {
       const { url, access_token, client_id, client_secret, user} = ctx.config.github;
       const tokenUrl = `${url}${access_token}`;
       const options = {
         client_id, client_secret, code: param.code,
       }
       // 获取access_token
       const res = await ctx.curl(tokenUrl, {
         method: 'POST',
         data: options,
         contentType: 'json',
         dataType: 'json'
       });
       const token = res.split('&')[0].split('=')[1];
       const userInfo = await ctx.curl(`${url}${user}?access_token=${token}`);
       if (!userInfo) {
         throw new Error('授权失败');
       }
       await ctx.model.User.update({open_id: userInfo.id}, {
         $set: {
          open_id: userInfo.id,
          email: uesrInfo.email,
          password: userInfo.login,
          type: 2,
          avatar: userInfo.avatar_url,
          location: userInfo.location,
          name: userInfo.name,
        }
       });
       const info = await ctx.model.User.findOne({ open_id: userInfo.id });
       ctx.session.SID = info.id;
       return true;
     } catch(e) {
       ctx.logger.error(`[${pre}.oauth]: ${e}`);
       throw new Error(e);
     }
   }

   /**
    * 获取用户列表（管理后台）
    */
   async getUserList(params) {
     const { ctx } = this
     try {
       const { type, name, pageIndex, pageSize } = params;
       let condition = {};
       if (type) {
         condition.type = type;
       }
       if (name) {
         condition.name = name;
       }
       const skip = (pageIndex - 1) * pageSize;
       const fields = { _id: 0, __v: 0, open_id: 0 };
       const options = { skip, limit: pageSize, sort: { createdAt: -1 }};
       const res = await Promise.all([
        ctx.model.User.find(condition, fields, options),
        ctx.model.User.countDocuments(condition),
      ])
       return {
         list: res[0],
         pagination: {
          total: res[1],
          pageSize,
          pageIndex,
        },
       }

     } catch(e) {
       ctx.logger.error(`[${pre}.getUserList]: ${e}`);
       throw new Error(e);
     }
   }

   /**
    * 删除用户（管理后台）
    */
  async deleteUser(params) {
    const { ctx } = this;
    try {
      await ctx.model.User.deleteOne({id: params.id});
      return true;
    } catch (e) {
      ctx.logger.error(`[${pre}.deleteUser]: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = UserService;