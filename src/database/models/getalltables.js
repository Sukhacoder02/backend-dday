'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const Queries = require('../../utils/Constants/Database/Queries');
module.exports = (sequelize, DataTypes) => {
  class GET_ALL_TABLES extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GET_ALL_TABLES.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      table_name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'GET_ALL_TABLES',
      modelName: 'GetAllTables',
      timestamps: false,
      freezeTableName: true
    }
  );
  GET_ALL_TABLES.FindAll = async () => {
    const allTables = await GET_ALL_TABLES.findAll({
      attributes: {
        exclude: ['id']
      },
      where: {
        table_name: {
          [Sequelize.Op.notIn]: ['SequelizeMeta']
        }
      }
    });
    const promises = [];
    allTables.forEach((tableObject) => {
      const tableName = tableObject.table_name;
      promises.push(sequelize.query(Queries.GET_COUNT(tableName)));
    });
    const counts = await Promise.all(promises);
    const result = allTables.map((tableObject, index) => {
      return { table_name: tableObject.table_name, row_count: counts[index][0][0].count };
    });
    return result;

  };
  return GET_ALL_TABLES;
};
