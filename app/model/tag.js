'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  autoIncrement.initialize(mongoose);
  const TagSchema = new Schema({
    name: { type: String, required: true },

    desc: { type: String, default: '' }, 

    icon: { type: String, default: '' },
  }, {
    timestamps: true,
  });

  // 自增 ID 插件配置
  TagSchema.plugin(autoIncrement.plugin, {
    model: 'Tag',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  return mongoose.model('Tag', TagSchema);
}

