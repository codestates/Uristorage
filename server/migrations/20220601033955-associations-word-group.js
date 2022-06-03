"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "word_group",
      {
        words_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: "words", // users 모델에서
            key: "id", // 그 아이디 값을 참고합니다.
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        groups_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: "groups",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      { timestamps: false }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("word_group");
  },
};
