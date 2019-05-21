'use strict';

const TIMESTAMP = require('sequelize-mysql-timestamp')(this.app.sequelize);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('t_bas_test', {
    name: {
      type: Sequelize.STRING(50), allowNull: false, defaultValue: '', field: 'usr_name',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), order: 'DESC',
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    creator: {
      type: Sequelize.STRING(50), allowNull: false, field: 'creator', defaultValue: '',
    },
    reviser: {
      type: Sequelize.STRING(50), allowNull: false, field: 'reviser', defaultValue: '',
    },
  }).then(() => queryInterface.addConstraint('Item', ['usr_name', 'room_id'], {
    type: 'unique',
    name: 'unique_wechat_romm',
  })),

  down: (queryInterface) => queryInterface.dropTable('t_bas_test'),
};
