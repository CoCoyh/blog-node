'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  autoIncrement.initialize(mongoose);
  const ArticleSchema = new Schema({
    title: { type: String, required: true },

    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    desc: { type: String, default: '' },

    content: { type: String, required: true },

    // 文章类型 0: 普通文章（为以后扩展）
    type: { type: Number, defaut: 1, enum: [0] }, 

    // 文章状态 0: 草稿， 1: 已发布
    state: { type: Number, default: 0, enum: [0, 1] },

    // 文章来源 0: 原创， 1: 转载 2: 混合
    origin: { type: Number, default: 0, enum: [0, 1, 2] },

    // 文章标签
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],

    // 文章分类
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],

    // 文章评论
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],

    // 点赞的用户
    like_users: [{ type: Schema.Types.ObjectId, ref: 'User'}],

    // 阅读人数
    views: { type: Number, default: 0 },

    // 点赞数
    likes: { type: Number, default: 0 },
  }, {
    timestamps: true
  });

  // 自增 ID 插件配置
  ArticleSchema.plugin(autoIncrement.plugin, {
    model: 'Article',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });

  // 虚拟属性 'numbers'：表示文章内容的长度
  ArticleSchema
    .virtual('numbers')
    .get(function() {
      return this.content.length;
    });
  return mongoose.model('Article', ArticleSchema);
}

