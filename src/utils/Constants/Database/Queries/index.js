module.exports = {
  GET_ALL_COLUMNS: (tableName) => {
    return `SELECT column_name,data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${tableName}';`;
  },
  GET_COUNT: (tableName) => {
    return `SELECT COUNT(*) FROM "${tableName}";`;
  },
  GET_ALL_RECORDS: (tableName) => {
    return `SELECT * FROM "${tableName}";`;
  },
  INSERT_INTO: (tableName, fieldDetails) => {
    const columns = '"' + Object.keys(fieldDetails).toString().split(',').join('","') + '"';
    const values = "'" + Object.values(fieldDetails).toString().split(',').join("','") + "'";
    return `INSERT INTO "${tableName}" (${columns}) VALUES (${values});`;
  },
  DELETE_RECORD: (tableName, id) => {
    return `DELETE FROM "${tableName}" WHERE id = ${id};`;
  },
  UPDATE_RECORD: (tableName, id, fieldDetails) => {
    const columns = '"' + Object.keys(fieldDetails).toString().split(',').join('","') + '"';
    const values = "'" + Object.values(fieldDetails).toString().split(',').join("','") + "'";
    return `UPDATE "${tableName}" SET (${columns}) = (${values}) WHERE id = ${id};`;
  }
}