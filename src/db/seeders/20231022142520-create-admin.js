'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = await bcrypt.hash('admin', 10);
    return queryInterface.bulkInsert('users', [{
      name: 'Admin',
      password: password,
      email: 'admin@admin.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
};
