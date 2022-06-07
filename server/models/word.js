"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      word.belongsTo(models.user, {
        foreignKey: "users_id",
        targetKey: "id",
        onDelete: "cascade",
      }),
        word.belongsToMany(models.group, { through: "word_group", foreignKey: "words_id", targetKey: "id" });
    }
  }
  word.init(
    {
      users_id: DataTypes.INTEGER,
      word: DataTypes.STRING,
      summary: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      map: DataTypes.STRING,
      calendar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "word",
    }
  );
  return word;
};
