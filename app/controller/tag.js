'use strict';

const { Controller } = require("egg");

class TagController extends Controller {
  /**
   * 添加标签
   */
  async addTag() {
    const { ctx, service } = this;
    ctx.validate({
      name: {
        type: 'string',
        required: true,
      },
      desc: {
        type: 'string',
        max: 200,
      },
      icon: {
        type: 'string',
      }
    })
    const res = await service.tag.addTag(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 删除标签
   */
  async deleteTag() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
        required: true,
      }
    });
    const res = await service.tag.deleteTag(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 获取标签列表
   */
  async getTagList() {
    const { ctx, service } = this;
    const res = await service.tag.getTagList(ctx.query);
    ctx.body = res;
  }
}

module.exports = TagController;