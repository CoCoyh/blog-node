'user strict';
const crypto = require('crypto');
const { argv } = require('yargs');
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  autoIncrement.initialize(mongoose);

  const UserSchema = new Schema({
    // 第三方 授权登陆的标识用户的ID
    open_id: { type: String, default: '' },

    name: { type: String, required: true },

    // 用户类型 0—博主，1-其他用户，2.gitHub, 3-weixin, 4. qq(0, 1是注册的用户，2，3，4都是第三方授权的用户)
    type: { type: Number, defaut: 1, enum: [0, 1, 2, 3, 4] }, 

    phone: { 
      type: String,
      default: '',
      validate: /^1[3456789]\d{9}$/,
    },

    // 封面
    img_url: { type: String, default: '' },

    eamil: { 
      type: String, 
      required: true,
      validate: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    },

    introduce: { type: String, default: '' },

    avatar: { type: String, default: 'user' },

    location: { type: String, default: 'user' },

    password: {
      type: String,
      required: true,
      default: crypto
      .createHash('md5')   // createHash(方法用于创建Hash实例。Hash不能直接使用new 关键字创建对象
      .update(argv.auth_default_password || 'root')  // update()产生计算后的hash
      .digest('hex'),  // 计算所有需要被哈希化的数据摘要（通过Hash.update()方法）
    },

    create_time: { type: Date, defaut: Date.now },

    update_time: { type: Date, default: Date.now },
  });

  // 自增 ID 插件配置
  UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  return mongoose.model('User', UserSchema);
}

