'use strict';

const { Service } = require("egg");
const pre = 'service.tag';

class TagService extends Service {
  /**
   * 添加标签
   */
  async addTag(params) {
    const { ctx } = this;
    try {
      const { name, desc, icon } = params;
      const res = await ctx.model.Tag.findOne({ name });
      if (res) {
        throw new Error('该标签已存在');
      }
      const data = { name, desc, icon };
      await ctx.model.Tag(data).save();
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.addTag]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 删除标签
   */
  async deleteTag(params) {
    const { ctx } = this;
    try {
      await ctx.model.Tag.deleteOne({ id: params.id });
      return true;
    } catch (e) {
      ctx.logger.error(`[${pre}.deleteTag]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取标签列表
   */
  async getTagList(params) {
    const { ctx } = this;
    try {
      const { name, pageIndex, pageSize } = params;
      let condition = {}
      if (params.name) {
        condition.name = name;
      }
      const skip = (pageIndex - 1) * pageSize;
      const fields = { _id: 0, __v: 0 };
      const options = { skip, limit: pageSize, sort: { createdAt: -1 }};
      const res = await Promise.all([
        ctx.model.Tag.find(condition, fields, options),
        ctx.model.Tag.countDocuments(condition),
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
      ctx.logger.error(`[${pre}.getTagList]: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = TagService;