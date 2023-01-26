'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 3,
          startDate: "2021-11-19", //new Date ()
          endDate: "2021-11-21",
        },
        {
          spotId: 2,
          userId: 3,
          startDate: "2022-11-19",
          endDate: "2022-11-21",
        },
        {
          spotId: 1,
          userId: 2,
          startDate: "2022-05-19",
          endDate: "2022-05-21",
        },
        {
          spotId: 2,
          userId: 1,
          startDate: "2022-04-19",
          endDate: "2022-04-21",
        },

        {
          spotId: 1,
          userId: 4,
          startDate: "2023-02-19",
          endDate: "2023-03-21",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      null,
      {}
    );
  },
};
