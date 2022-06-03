"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class word_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  word_group.init(
    {
      words_id: DataTypes.INTEGER,
      groups_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "word_group",
    }
  );
  return word_group;
};
