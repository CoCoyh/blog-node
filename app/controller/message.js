'use strict';
const { Controller } = require('egg');

class MessageController extends Controller {
  /**
   * 新增留言消息
   */
  async addMessage() {
    const { ctx, service } = this;
    ctx.validate({
      user_id: {
        type: 'string',
        required: false,
      },
      name: {
        type: 'string',
        min: 3,
        max: 100,
      },
      email: {
        type: 'email',
      },
      phone: 'phone',
      content: {
        type: 'string',
        min: 1,
        max: 500,
      },

    })
    const res = await service.message.addMessage(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 回复留言
   */
  async replyMessage() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'nummber',
      },
      state: {
        type: 'enum',
        values: [0, 1],
        required: false,
      },
      content: {
        type: 'string',
        min: 1,
        max: 500
      }
    })
    const res = await service.message.replyMessage(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 删除留言
   */
  async deleteMessage() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
      }
    })
    const res = await service.message.deleteMessage(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 获取留言列表
   */
  async getMessageList() {
    const { ctx, service } = this;
    ctx.validate({
      content: {
        type: 'string',
        required: false,
      },
      state: {
        type: 'enum',
        values: [0, 1],
        required: false
      },
      pageSize: {
        type: 'number',
        required: false,
        default: 10,
      },
      pageIndex: {
        type: 'number',
        required: false,
        default: 1
      }
    }, ctx.query);
    const res = await service.message.getMessageList(ctx.query);
    ctx.body = res;
  }

  /**
   * 获取留言详情
   */
  async getMessage() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
      }
    }, ctx.query);
    const res = await service.message.getMessage(ctx.query);
    ctx.body = res;
  }
 
}

module.exports = MessageController;