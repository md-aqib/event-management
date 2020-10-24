require('dotenv').config()

module.exports = {
  "development": {
    // "use_env_variable": process.env.DB_URL,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": process.env.DIALECT

  },
  "test": {
    "username": "usr1",
    "password": "pwd1!@#$",
    "database": "todos-test",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres"
  }
}
