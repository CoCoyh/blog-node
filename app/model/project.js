'user strict';
const autoIncrement = require('mongoose-auto-increment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  autoIncrement.initialize(mongoose);

  const ProjectSchema = new Schema({
    title: { type: String, required: true },

    content: { type: String, required: true }, 

    img: { type: String, required: true },

    url: { type: String, required: true },

    // 状态 0: 未完成 1：进行中 2: 已完成
    state: { type: Number, default: 0 },

    start_time: { type: Date, default: Date.now },

    end_time: { type: Date, defaut: Date.now },
  }, {
    timestamps: true,
  });

  // 自增 ID 插件配置
  ProjectSchema.plugin(autoIncrement.plugin, {
    model: 'Project',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
  });
  return mongoose.model('Project', ProjectSchema);
}

