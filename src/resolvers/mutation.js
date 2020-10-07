const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function register(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  console.log(context.models);
  const user = await context.models.Register.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

module.exports = {
  register,
};
