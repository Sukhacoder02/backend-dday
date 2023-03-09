'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CollectionEntries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CollectionEntries.init(
    {
      fields: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
      email: DataTypes.STRING,
      contentTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CollectionEntries',
    }
  );
  return CollectionEntries;
};
