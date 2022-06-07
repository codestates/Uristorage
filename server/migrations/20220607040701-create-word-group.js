"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("word_group", {
      words_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "words",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      groups_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "groups",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("word_group");
  },
};
