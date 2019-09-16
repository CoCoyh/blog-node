'use strict';

const { Service } = require("egg");
const pre = 'service.project';

class ProjectService extends Service {
  /**
   * 添加项目
   */
  async addProject(params) {
    const { ctx } = this;
    try {
      const { title, url, img, content, start_time, end_time, state } = params;
      const options = {
        title, url, img, content, start_time, end_time, state,
      }
      // 标题校验
      const res = await ctx.model.Project.findOne({ title: params.title });
      if (res) {
        throw new Error('该标题已存在');
      }
      await new ctx.model.Project.save(options);
      return true;
    } catch(e) {
      ctx.logger.error(`[${pre}.addProject]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 更新项目
   */
  async updateProject(params) {
    const { ctx } = this;
    try {
      const { id, title, url, img, content, start_time, end_time, state } = params;
      let conditions = {
        title,
      }
      if(url) {
        conditions.url = url;
      }
      if(img) {
        conditions.img = img;
      }
      if (content) {
        conditions.content = content;
      }
      if (start_time) {
        conditions.start_time = start_time;
      }
      if (end_time) {
        conditions.end_time = end_time;
      }
      if (state) {
        conditions.state = state;
      }
      await ctx.model.Project.updateOne({ id }, conditions);
      return true;
    } catch(e) {
      ctx.logger.error(`[${e}.updateProject]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 删除项目
   */
  async deleteProject(params) {
    const { ctx } = this;
    try {
      await ctx.model.Project.deleteOne({ id: params.id });
      return true;
    } catch(e) {
      ctx.logger.error(`$[${pre}.deleteProject]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取项目列表
   */
  async getProjectList() {
    const { ctx } = this;
    try {
      const { pageIndex, pageSize, title, state } = params;
      let conditions = {};
      if (title) {
        conditions.title = title;
      }
      if (state) {
        conditions.state = state;
      }
      const skip = (pageIndex - 1) * pageSize;
      const fields = { _id: 0, __v: 0 };
      const options = { skip, limit: pageSize, sort: { createdAt: -1 }};
      const res = await Promise.all([
        ctx.model.Project.find(condition, fields, options),
        ctx.model.Project.countDocuments(condition),
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
      ctx.logger.error(`[${pre}.getProjectList]: ${e}`);
      throw new Error(e);
    }
  }

  /**
   * 获取项目详情
   */
  async getProject() {
    const { ctx } = this;
    try {
      const res = await ctx.model.Project.findById(id);
      return res;
    } catch(e) {
      ctx.logger.error(`[${pre}.getProject]: ${e}`);
      throw new Error(e);
    }
  }
}

module.exports = ProjectService;