'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo@user.io",
          username: "Demo User",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sean",
          lastName: "Baeyens",
          email: "user1@user.io",
          username: "SeanBaeyens",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Nathaly",
          lastName: "Sanchez",
          email: "user2@user.io",
          username: "NathS",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Dave",
          lastName: "Mason",
          email: "user3@user.io",
          username: "dMason55",
          hashedPassword: bcrypt.hashSync("password4"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2", "FakeRenter3"],
        },
      },
      {}
    );
  },
};
