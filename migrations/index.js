const models = require("../models");
console.log(Object.keys(models));
models.Event.sync();
models.Register.sync();
models.eventsuser.sync()

//node .\migrations\index.js
