'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  autoIncrement.initialize(mongoose);
  const MessageSchema = new Schema({
    
    user:  { type: Schema.Types.ObjectId, ref: 'User', required: true },

    content: { type: String, required: true },
    
    // 回复留言内容
    reply_list: [
      {
        content: { type: String, required: true },
      },
    ],

    // 状态 0 是未处理，1 是已处理
	  state: { type: Number, default: 0 },
  }, {
    timestamps: true,
  });

  // 自增 ID 插件配置
  MessageSchema.plugin(autoIncrement.plugin, {
    model: 'Message',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  return mongoose.model('Message', MessageSchema);
}

