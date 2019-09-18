'use strict';

const { Service } = require('egg');
const pre = 'service.message';

class MessageService extends Service {
  /**
   * 新增留言消息
   */
  async addMessage(params) {
    const { ctx } = this;
    try {
      const { user_id, content, email, name, phone } = params;
      let data = {
        content,
        email,
        name,
        phone
      }
      
      if (user_id) {
        const userIno = await ctx.model.User.findById({ _id: user_id });
        data.phone = userIno.phone;
        data.user_id = userInfo._id;
        data.avatar = userInfo.avatar;
        data.introduce = userInfo.introduce;
      }
      await new ctx.model.Message(data).save();
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.addMessage]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 回复留言
   */
  async replyMessage(params) {
    const { ctx } = this;
    try {
      const { id, content, state } = params;
      await ctx.model.Message.update({ _id: id }, {state, $addToSet: {reply_list: { content }}});
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.replyMessage]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 删除留言
   */
  async deleteMessage(params) {
    const { ctx } = this;
    try {
      await ctx.model.Message.deleteOne({ _id: params.id });
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.deleteMessage]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取留言列表
   */
  async getMessageList() {
    const { ctx } = this;
    try {
      const { pageIndex, pageSize, content, state } = params;
      let conditions = {};
      if (content) {
        conditions.content = content;
      }
      if (state) {
        conditions.state = state;
      }
      const skip = (pageIndex - 1) * pageSize;
      const fields = { _id: 0, __v: 0 };
      const options = { skip, limit: pageSize, sort: { createdAt: -1 }};
      const res = await Promise.all([
        ctx.model.Message.find(condition, fields, options),
        ctx.model.Message.countDocuments(condition),
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
      ctx.logger.error(`[${pre}.getMessageList]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取留言详情
   */
  async getMessage() {
    
  }
 
}

module.exports = MessageService;