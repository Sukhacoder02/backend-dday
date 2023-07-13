// const { DataTypes } = require('sequelize');
// const { Sequelize } = require('./index');

// const GetAllTables = Sequelize.define('GET_ALL_TABLES', {
//   table_name: {
//     type: DataTypes.STRING,
//   }
// }, {
//   tableName: 'GET_ALL_TABLES',
//   timestamps: false
// });

// module.exports = GetAllTables;
'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
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
  GET_ALL_TABLES.FindAll = () => {
    return GET_ALL_TABLES.findAll({
      attributes: {
        exclude: ['id']
      },
      where: {
        table_name: {
          [Sequelize.Op.notIn]: ['SequelizeMeta']
        }
      }
    });
  };
  return GET_ALL_TABLES;
};
