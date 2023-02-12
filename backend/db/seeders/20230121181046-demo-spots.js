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
        {
          ownerId: 1,
          address: "123 Main St",
          city: "New York",
          state: "NY",
          country: "United States of America",
          lat: 36.121558,
          lng: -115.172067,
          name: "Luxury Downtown Loft",
          description:
            "Stay in style with this luxury loft located in the heart of downtown Vegas.",
          price: 300.0,
        },
        {
          ownerId: 3,
          address: "789 Side St",
          city: "Paris",
          state: "TX",
          country: "United States of America",
          lat: 36.169941,
          lng: -115.13983,
          name: "Contemporary Chic Condo",
          description:
            "Experience contemporary luxury in this chic condo located just minutes from the Strip.",
          price: 400.0,
        },
        {
          ownerId: 1,
          address: "246 High St",
          city: "Las Vegas",
          state: "NV",
          country: "United States of America",
          lat: 36.164041,
          lng: -115.172997,
          name: "Mid-Century Modern Home",
          description:
            "Step back in time with this mid-century modern home, just a short drive from the Strip.",
          price: 200.0,
        },
        {
          ownerId: 3,
          address: "369 Low St",
          city: "Las Vegas",
          state: "NV",
          country: "United States of America",
          lat: 36.204824,
          lng: -115.268383,
          name: "Rustic Retreat",
          description:
            "Escape the city and retreat to this rustic home, located in the scenic Red Rock Canyon.",
          price: 150.0,
        },
        {
          ownerId: 2,
          address: "159 Top St",
          city: "Las Vegas",
          state: "NV",
          country: "United States of America",
          lat: 36.174965,
          lng: -115.137221,
          name: "Elegant Estate",
          description:
            "Indulge in luxury and stay in this elegant estate, located just minutes from the Strip.",
          price: 500.0,
        },
        {
          ownerId: 1,
          address: "753 Park St",
          city: "Las Vegas",
          state: "NV",
          country: "United States of America",
          lat: 36.159466,
          lng: -115.131413,
          name: "Cozy Cottage",
          description:
            "Relax and unwind in this cozy cottage, located just steps away from stunning parks.",
          price: 100.0,
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
