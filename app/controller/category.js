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
        required: true,
      },
      desc: {
        type: 'string',
        max: 200,
      },
    })
    const res = await service.Category.addCategory(ctx.request.body);
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
    const res = await service.Category.deleteCategory(ctx.request.body);
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
      },
      pageSize: {
        type: 'number',
      },
      pageIndex: {
        type: 'numbere'
      }
    })
    const res = await service.Category.getCategoryList(ctx.query);
    ctx.body = res;
  }
}

module.exports = CategoryController;