const models = require("../models");
console.log(Object.keys(models));
models.Todo.sync();
