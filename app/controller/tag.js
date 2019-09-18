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
      },
      desc: {
        type: 'string',
        max: 200,
        required: false,
      },
      icon: {
        type: 'string',
        required: false,
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
    ctx.validate({
      name: {
        type: 'string',
      },
      pageSize: {
        type: 'number',
      },
      pageIndex: {
        type: 'number'
      }
    }, ctx.query)
    const res = await service.tag.getTagList(ctx.query);
    ctx.body = res;
  }
}

module.exports = TagController;