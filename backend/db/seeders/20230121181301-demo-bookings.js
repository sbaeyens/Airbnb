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
          startDate: new Date("2021-11-19"), //new Date ()
          endDate: new Date("2021-11-21"),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2022-11-19"),
          endDate: new Date("2022-11-21"),
        },
        {
          spotId: 1,
          userId: 2,
          startDate: new Date("2022-05-19"),
          endDate: new Date("2022-05-21"),
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date("2022-04-19"),
          endDate: new Date("2022-04-21"),
        },

        {
          spotId: 1,
          userId: 4,
          startDate: new Date("2023-02-19"),
          endDate: new Date("2023-03-21"),
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2023-04-19"),
          endDate: new Date("2023-04-21"),
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2023-05-19"),
          endDate: new Date("2023-05-21"),
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2023-06-19"),
          endDate: new Date("2023-07-21"),
        },
        {
          spotId: 4,
          userId: 1,
          startDate: new Date("2022-01-19"),
          endDate: new Date("2022-02-04"),
        },
        {
          spotId: 6,
          userId: 1,
          startDate: new Date("2021-10-19"),
          endDate: new Date("2021-11-04"),
        },
        {
          spotId: 7,
          userId: 1,
          startDate: new Date("2022-03-24"),
          endDate: new Date("2022-03-27"),
        },
        {
          spotId: 6,
          userId: 1,
          startDate: new Date("2023-09-24"),
          endDate: new Date("2023-09-27"),
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date("2023-12-14"),
          endDate: new Date("2023-12-27"),
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
