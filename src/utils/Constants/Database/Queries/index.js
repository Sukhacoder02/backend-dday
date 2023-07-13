module.exports = {
  GET_ALL_COLUMNS: (tableName) => {
    return `SELECT column_name,data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${tableName}';`;
  }
};