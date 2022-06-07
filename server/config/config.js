require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME, //root
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME, //uristorage
    host: process.env.DATABASE_HOST, //database-uristorage.cxhj1onlu8zh.ap-northeast-2.rds.amazonaws.com
    port: process.env.DATABASE_PORT, //13306
    dialect: "mysql",
  },
};
