'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  autoIncrement.initialize(mongoose);

  const CommentSchema = new Schema({
    articles: { type: Schema.Types.ObjectId, ref: 'article', required: true },

    content: { type: String, required: true }, 

    is_top: { type: Boolean, default: false },

    // 评论点赞数
    likes: { type: Number, default: 0 },

    // 父评论的用户信息
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // 第三者评论
    third_comments: [
      {
        // 谁在评论
        user:  { type: Schema.Types.ObjectId, ref: 'User', required: true },

        // 对谁评论
        to_user:  { type: Schema.Types.ObjectId, ref: 'User', required: true },

        likes: { type: Number, default: 0 },
        
        content: { type: String, required: true },

        // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
        state: { type: Number, default: 1 },

        // 创建时间
        create_time: { type: Date, defaut: Date.now },
      },
    ], 

    // 状态 => 0 待审核 / 1 删除
    state: { type: Number, default: 1 },
    
  }, {
    timestamps: true
  });

  // 自增 ID 插件配置
  CommentSchema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });

  return mongoose.model('Comment', CommentSchema);
}

