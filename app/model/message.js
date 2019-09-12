'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  autoIncrement.initialize(mongoose);
  const MessageSchema = new Schema({
    user_id: { type: String, required: true },

    name: { type: String, default: '' }, 

    avatar: { type: String, default: 'user' },

    phone: {
      type: String,
      default: '',
      validate:  /^1[3456789]\d{9}$/,
    },

    introduce: { type: String, default: '' },

    content: { type: String, required: true },

    email: { 
      type: String,
      required: true,
      required: true,
      validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
    },
    
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

