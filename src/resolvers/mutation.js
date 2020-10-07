const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

//register
async function register(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.models.Register.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

//login
async function login(parent, args, context, info) {
  const user = await context.models.Register.findAll();
  console.log(">>>>>>>>>>>>>>>", user);
  if (user === null) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

module.exports = {
  register,
  login,
};
