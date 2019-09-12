'use strict';

const { Service } = require("egg");
const pre = 'service.tag';

class TagService extends Service {
  /**
   * 添加标签
   */
  async addTag() {
    const { ctx } = this;
    try {
      const res = await ctx.model.Tag.findOne({ name: params.name });
      if (res) {
        throw new Error('该标签已存在');
      }
      await new ctx.model.Tag.save({ name: params.name, desc: params.desc, icon: params.icon })
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.addTag]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 删除标签
   */
  async deleteTag() {
    const { ctx } = this;
    try {
      
    } catch (e) {
      ctx.logger.error(`[${pre}.deleteTag]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取标签列表
   */
  async getTagList() {
    
  }
}

module.exports = TagService;