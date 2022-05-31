"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "words",
      [
        {
          users_id: 8, //외부키
          word: "여사친",
          summary: "사랑보다 먼",
          content: "사랑보다 먼 우정보다 가까운 어색한 사이",
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          users_id: 1,
          word: "여사친",
          summary: "없음",
          content: "그런거 없음",
          public: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("words", null, {});
  },
};
