'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Disney Lane",
          city: "Anaheim",
          state: "CA",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Apartment Near Disneyland",
          description:
            "This is a sample description of what this building will be like",
          price: 100.0,
        },
        {
          ownerId: 2,
          address: "456 Gamble St",
          city: "Las Vegas",
          state: "NV",
          country: "United States of America",
          lat: 40.7645358,
          lng: -60.4730327,
          name: "House Near The Strip",
          description:
            "Come party at this Vegas house. Here are some details about the house.",
          price: 250.0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        country: {
          [Op.in]: ["United States of America"],
        },
      },
      {}
    );
  },
};
