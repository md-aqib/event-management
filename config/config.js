require('dotenv').config()

module.exports = {
  "development": {
    "use_env_variable": process.env.DB_URL
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
