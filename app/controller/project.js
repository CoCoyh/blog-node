'use strict';

const { Controller } = require("egg");

class ProjectController extends Controller {
  /**
   * 添加项目
   */
  async addProject() {
    const { ctx } = this;
    ctx.validate({
      title: 'title',
      url: {
        type: 'string',
      },
      img: {
        type: 'string',
      },
      content: 'content',
      start_time: {
        type: 'dateTime',
      },
      end_time: {
        type: 'dateTime',
      },
      state: [0, 1, 2],
    });
    const res = await service.category.addProject(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 更新项目
   */
  async updateProject() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
      },
      title: {
        type: 'title',
        required: false,
      },
      url: {
        type: 'string',
        required: false,
      },
      img: {
        type: 'string',
        required: false,
      },
      content: {
        type: 'content',
        required: false,
      },
      start_time: {
        type: 'dateTime',
        required: false,
      },
      end_time: {
        type: 'dateTime',
        required: false,
      },
      state: {
        type: 'enum',
        values: [0, 1, 2],
        required: false,
      }
    });
    const res = await service.category.updateProject(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 删除项目
   */
  async deleteProject() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
        required: true,
      }
    })
    const res = await service.category.deleteProject(ctx.request.body);
    ctx.body = res;
  }

  /**
   * 获取项目列表
   */
  async getProjectList() {
    const { ctx, service } = this;
    ctx.validate({
      title: {
        type: 'string',
        required: false,
      },
      state: {
        type: 'enum',
        values: [0, 1, 2],
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
    const res = await service.category.getProjectList(ctx.query);
    ctx.body = res;
  }

  /**
   * 获取项目详情
   */
  async getProject() {
    const { ctx, service } = this;
    ctx.validate({
      id: {
        type: 'number',
      }
    }, ctx.query);
    const res = await service.category.getProject(ctx.query);
    ctx.body = res;
  }
}

module.exports = ProjectController;