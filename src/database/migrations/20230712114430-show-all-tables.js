'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      create view "GET_ALL_TABLES" as select table_name from information_schema.tables where table_schema = 'public' AND table_type='BASE TABLE';
    `);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      drop view "GET_ALL_TABLES";
    `);

  }
};
