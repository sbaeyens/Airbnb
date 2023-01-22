'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 3,
          review: "Great place! Close to Disneyland!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 3,
          review: "Wasn't clean. Too far from the city",
          stars: 2,
        },
        {
          spotId: 1,
          userId: 2,
          review:
            "This place was great. Much better than the house I have in Vegas",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 1,
          review:
            "Not as close as advertised in the listing",
          stars: 3,
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
