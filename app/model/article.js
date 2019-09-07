'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  autoIncrement.initialize(mongoose);
  const ArticleSchema = new Schema({
    title: { type: String, required: true },

    author: { type: String, required: true },

    desc: { type: String, default: '' },

    content: { type: String, required: true },

    // 文章字数
    numbers: { type: String, default: 0 }, 

    // 文章封面
    img_url: { type: String, default: '' }, 

    // 文章类型 0: 普通文章（为以后扩展）
    type: { type: Number, defaut: 1, enum: [0] }, 

    // 文章状态 0: 草稿， 1: 已发布
    state: { type: Number, default: 0, enum: [0, 2] },

    // 文章来源 0: 原创， 1: 转载 2: 混合
    origin: { type: Number, default: 0, enum: [0, 1, 2] },

    // 文章标签
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }],

    // 文章分类
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],

    // 文章评论
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }],

    // 点赞的用户
    like_users: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
      },
    ],

    // 阅读人数
    views: { type: Number, default: 0 },

    // 点赞数
    likes: { type: Number, default: 0 },

    create_time: { type: Date, defaut: Date.now },

    update_time: { type: Date, default: Date.now },
  });

  // 自增 ID 插件配置
  ArticleSchema.plugin(autoIncrement.plugin, {
    model: 'Article',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  return mongoose.model('Article', ArticleSchema);
}

