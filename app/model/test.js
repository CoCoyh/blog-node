'use strict';

const sequelizeTime = require('sequelize-mysql-timestamp');

module.exports = (app) => {
  const TIMESTAMP = sequelizeTime(app.sequelize);
  const { STRING, INTEGER, literal } = app.Sequelize;

  const Room = app.model.define('t_bas_room', {
    id: {
      type: INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    usrName: {
      type: STRING(50), allowNull: false, defaultValue: '', field: 'usr_name',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: literal('CURRENT_TIMESTAMP'), order: 'DESC',
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    creator: {
      type: STRING(50), allowNull: false, field: 'creator', defaultValue: '',
    },
    reviser: {
      type: STRING(50), allowNull: false, field: 'reviser', defaultValue: '',
    },
  },
  {
    timestamps: false,
  });
  return Room;
};
