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
  const user = await context.models.Register.findOne({
    where: { email: args.email },
  });
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

//change password
async function changepassword(parent, args, context, info) {
  const userId = getUserId(context);
  if (args.newPassword && args.oldPassword) {
    throw new Error("Please enter all details");
  }
  const user = await context.models.Register.update(
    { password: args.newPassword },
    { where: { password: args.oldPassword } }
  );
  if (user === null) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  return {
    user,
  };
}

//add event
function event(parent, args, context, info) {
  const userId = getUserId(context);

  const newLink = context.models.Event.create({
    data: {
      eventName: args.eventName,
      eventDetails: args.eventDetails,
      createdBy: args.createdBy,
      date: args.date,
      invite: { connect: { id: userId } },
    },
  });

  return newLink;
}

module.exports = {
  register,
  login,
  changepassword,
  event,
};
