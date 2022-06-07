"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      group.belongsToMany(models.user, { as: "usergroup", through: "user_group", foreignKey: "groups_id", targetKey: "id" }), group.belongsToMany(models.word, { as: "wordgroup", through: "word_group", foreignKey: "groups_id", targetKey: "id" });
    }
  }
  group.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "group",
    }
  );
  return group;
};
