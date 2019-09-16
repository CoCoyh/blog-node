'use strict';
const { Service } = require('egg');
const pre = 'service.category';

class CategoryService extends Service {
  /**
   * 添加分类
   */
  async addCategory(params) {
    const { ctx } = this;
    try {
      const options = {
        name: params.name,
        desc: params.desc,
      }
      const res = await ctx.model.Category.find({ name: params.name });
      if (res) {
        throw new Error('该分类名已存在');
      }
      await new ctx.model.save(options);
      return true;
    } catch (e) {
      ctx.logger.error(`[${pre}.addCategory]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 删除分类
   */
  async deleteCategory(params) {
    const { ctx } = this;
    try {
      await ctx.model.Category.deleteOne({ id: params.id });
      return true;
    } catch (e) {
      ctx.logger.error(`[${pre}.deleteCategory]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取分类列表
   */
  async getCategoryList(params) {
    const { ctx } = this;
    try {
      let conditions = {};
      if (params.name) {
        conditions.name = params.name;
      }
      const skip = (params.pageIndex - 1) * params.pageSize;
      const fields = { _id: 0, __v: 0, open_id: 0 };
      const options = { skip, limit: params.pageSize, sort: { createdAt: -1 }};
      const res = await Promise.all([
        ctx.model.User.find(conditions, fields, options),
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
    } catch (e) {
      ctx.logger.error(`[${pre}.getCategoryList]: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = CategoryService;