'use strict';
const { Controller } = require('egg');

class CategoryController extends Controller {
  /**
   * 添加分类
   */
  async addCategory() {
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
    })
    const res = await service.category.addCategory(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 删除分类
   */
  async deleteCategory() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
        required: true,
      }
    });
    const res = await service.category.deleteCategory(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 获取分类列表
   */
  async getCategoryList() {
    const { ctx, service } = this;
    ctx.validate({
      name: {
        type: 'string',
        required: false,
      },
      pageSize: {
        type: 'number',
        required: false,
      },
      pageIndex: {
        type: 'numbere',
        required: false,
      }
    })
    const res = await service.category.getCategoryList(ctx.query);
    ctx.body = res;
  }
}

module.exports = CategoryController;