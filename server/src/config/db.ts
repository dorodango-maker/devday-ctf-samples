export default {
  /**
   * databaseの設定
   */
  db: {
    host: process.env.DB_HOST || "db",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_DATABASE || "mydb",
    multipleStatements: true,
  },
};
