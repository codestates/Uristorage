"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_group",
      {
        users_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: "users", // users 모델에서
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
    await queryInterface.dropTable("user_group");
  },
};
