'use strict';

const TIMESTAMP = require('sequelize-mysql-timestamp')(this.app.sequelize);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER } = Sequelize;
    await queryInterface.createTable('t_bas_user', {
      id: {
        type: INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
      },
      name: {
        type: STRING(50), allowNull: false, defaultValue: '', field: 'usr_name',
      },
      createTime: {
        type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), order: 'DESC',
      },
      updateTime: {
        type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      creator: {
        type: STRING(50), allowNull: false, field: 'creator', defaultValue: '',
      },
      reviser: {
        type: STRING(50), allowNull: false, field: 'reviser', defaultValue: '',
      },
    });
  },

  down: (queryInterface) => queryInterface.dropTable('t_bas_user'),
};
