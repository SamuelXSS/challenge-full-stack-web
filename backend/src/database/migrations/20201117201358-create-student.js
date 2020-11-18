'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ra: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // 0 for Registration no-locked | 1 for Registration Locked -- You can only delete a user if the registration is locked
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  }
};
