'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  autoIncrement.initialize(mongoose);
  const CategorySchema = new Schema({
    name: { type: String, required: true },

    desc: { type: String, defaut: '' }, 
  }, {
    timestamps: true,
  });

  // 自增 ID 插件配置
  CategorySchema.plugin(autoIncrement.plugin, {
    model: 'Category',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  return mongoose.model('Category', CategorySchema);
}

