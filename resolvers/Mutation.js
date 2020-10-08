const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../seeders/nodemailer");
const { APP_SECRET, getUserId } = require("../seeders/utils");

//register
async function register(parent, args, context, info) {
  const data = await context.models.Register.findOne({
    where: { email: args.email },
  });
  console.log(">>>>>>>>>>>>>>>", data);
  if (data) {
    throw new Error("Email is already in use.");
  }
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.models.Register.create({
    data: { ...args, password },
  });
  console.log(">>>>>>>>>>>>>>>", user, context.models.Register);
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

  const token = jwt.sign({ userId: user.id, email: user.email }, APP_SECRET);
  await context.models.Register.update(
    { token: token },
    { where: { email: user.email } }
  );
  return {
    token,
    user,
  };
}

//change password
async function changepassword(parent, args, context, info) {
  const Auth = getUserId(context);
  if (Auth) {
    if (args.newPassword && args.oldPassword) {
      throw new Error("Please enter all details");
    }
    const userData = await context.models.Register.findOne({
      where: { email: Auth.email },
    });
    const validData = await bcrypt.compare(args.oldPassword, userData.password);
    if (!validData) {
      throw new Error("Incorrect oldPassword");
    }
    const user = await context.models.Register.update(
      { password: args.newPassword },
      { where: { email: Auth.email } }
    );
    return {
      user,
    };
  }
}

//
async function logout(parent, args, context, info) {
  const Auth = getUserId(context);
  if (Auth) {
    await context.models.Register.update(
      { token: null },
      { where: { email: user.email } }
    );
    return {
      message: "Logout successful!",
    };
  }
}

//reset password and update password
const generatePass = () => {
  let newPassword = "Abcd@" + Math.floor(Math.random() * 10000);
  return newPassword;
};
async function resetpassword(parent, args, context, info) {
  const userId = getUserId(context);
  if (args.email) {
    throw new Error("Please enter all details");
  }
  const userData = await context.models.Register.findOne({
    where: { email: args.email },
  });
  if (userData === null) {
    throw new Error("No such user found");
  }
  let generatedPass = await generatePass();
  await mailer.sendMails(
    req.body.email,
    `Your New Password is: ${generatedPass}, You can change your password after login.`
  );
  const user = await context.models.Register.update(
    { password: generatedPass },
    { where: { id: userId } }
  );
  return {
    message: "Password updated and sent to your emailId",
  };
}

//add event
function event(parent, args, context, info) {
  const userId = getUserId(context);

  const newEvent = context.models.Event.create({
    data: {
      eventName: args.eventName,
      eventDetails: args.eventDetails,
      createdBy: args.createdBy,
      date: args.date,
      invited: { connect: { id: userId } },
    },
  });

  return newEvent;
}

module.exports = {
  register,
  login,
  logout,
  changepassword,
  resetpassword,
  event,
};
