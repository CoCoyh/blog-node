'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  autoIncrement.initialize(mongoose);

  const CommentSchema = new Schema({
    article_id: { type: String, required: true },

    content: { type: String, required: true }, 

    is_top: { type: Boolean, default: false },

    // 评论点赞数
    likes: { type: Number, default: 0 },

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // 父评论的用户信息
    user: {
      user_id: { type: mongoose.Schema.Types.ObjectId },

      name: { type: String, required: true },

      // 用户类型 0：博主 1：其他用户
      type: { type: Number, detault: 1 },
    
      avatar: { type: String, default: 'user' }
    },

    // 第三者评论
    third_comments: [
      {
        // 谁在评论
        user: {
          user_id: { type: mongoose.Schema.Types.ObjectId },
        
          name: { type: String, required: true },

          type: { type: Number, default: 1 },

          avatar: { type: String, default: 'user' },
        },
        // 对谁评论
        to_user: {
          user_id: { type: mongoose.Schema.Types.ObjectId },

          name: { type: String, required: true },

          type: { type: Number, default: 1 },

          avatar: { type: String, default: 'user' },
          
        },
        likes: { type: Number, default: 0 },
        
        content: { type: String, required: true },

        // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
        state: { type: Number, default: 1 },

        // 创建时间
        create_time: { type: Date, defaut: Date.now },
      },
    ], 

    // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
    state: { type: Number, default: 1 },

    // 是否已经处理过 => 1 是 / 2 否 ；新加的评论需要审核，防止用户添加 垃圾评论
    is_handle: { type: Boolean, default: false },

    create_time: { type: Date, defaut: Date.now },

    update_time: { type: Date, default: Date.now },
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

