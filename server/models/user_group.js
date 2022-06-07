"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_group.init(
    {
      users_id: DataTypes.INTEGER,
      groups_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      freezeTableName: true,
      sequelize,
      modelName: "word_group",
    }
  );
  return user_group;
};
