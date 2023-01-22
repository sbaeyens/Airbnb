'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "www.picture1review1.com",
          preview: true,
        },
        {
          reviewId: 1,
          url: "www.picture2review1.com",
          preview: true,
        },
        {
          reviewId: 1,
          url: "www.picture3review1.com",
          preview: true,
        },
        {
          reviewId: 2,
          url: "www.picture1review2.com",
          preview: true,
        },
        {
          reviewId: 2,
          url: "www.picture2review2.com",
          preview: true,
        },
        {
          reviewId: 2,
          url: "www.picture3review2.com",
          preview: true,
        },
        {
          reviewId: 3,
          url: "www.picture3review3.com",
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
