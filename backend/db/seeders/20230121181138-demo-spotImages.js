'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "www.picture1spot1.com",
          preview: true,
        },
        {
          spotId: 1,
          url: "www.picture2spot1.com",
          preview: true,
        },
        {
          spotId: 1,
          url: "www.picture3spot1.com",
          preview: true,
        },
        {
          spotId: 2,
          url: "www.picture1spot2.com",
          preview: true,
        },
        {
          spotId: 2,
          url: "www.picture2spot2.com",
          preview: true,
        },
        {
          spotId: 2,
          url: "www.picture3spot2.com",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};