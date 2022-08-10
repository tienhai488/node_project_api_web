"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "example@example.com",
        password: "tienhai123",
        firstName: "Tien",
        lastName: "Hai",
        address: "Tuy Phuoc Binh Dinh",
        gender: 1,
        typeRole: "11",
        keyRole: "11",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
