const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../seeders/nodemailer");
const { APP_SECRET } = require("../seeders/utils");
var sequelize = require('sequelize');

//register
async function register(parent, args, context, info) {
  const data = await context.models.Register.findOne({
    where: { email: args.email },
  });
  if (data) {
    throw new Error("Email is already in use.");
  }
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.models.Register.create({
    name: args.name,
    email: args.email,
    password: password,
    phone: args.phone
  });
  const token = jwt.sign({ userId: user.id, email: user.email }, APP_SECRET);
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
    const userData = await context.models.Register.findOne({
      where: { email: Auth.email },
    });
    
    const validData = await bcrypt.compare(args.oldPassword, userData.password);
    if (!validData) {
      throw new Error("Incorrect oldPassword");
    }
    const password = await bcrypt.hash(args.newPassword, 10);
    const user = await context.models.Register.update(
      { password: password },
      { where: { email: Auth.email } }
    );
    return {
      message: "Password updated",
    };
}

//logout
async function logout(parent, args, context, info) {
    await context.models.Register.update(
      { token: null },
      { where: { email: Auth.email } }
    );
    return {
      message: "Logout successful!",
    };
}

//reset password and update password
const generatePass = () => {
  let newPassword = "Abcd@" + Math.floor(Math.random() * 10000);
  return newPassword;
};
async function resetpassword(parent, args, context, info) {
  const userData = await context.models.Register.findOne({
    where: { email: args.email },
  });
  if (!userData) {
    throw new Error("No such user found");
  }
  let generatedPass = await generatePass();
  await mailer.sendMails(
    args.email,
    `Your New Password is: ${generatedPass}, You can change your password after login.`
  );
  const password = await bcrypt.hash(generatedPass, 10);
  const user = await context.models.Register.update(
    { password: password },
    { where: { email: args.email } }
  );
  return {
    message: "Password updated and sent to your emailId",
  };
}

//add event
async function addevent(parent, args, context, info) {
    const eventData = await context.models.Event.findOne({
      where: { eventName: args.eventName },
    });
    if (eventData) {
      throw new Error("Event Already created");
    }
    const newEvent = context.models.Event.create({
        eventName: args.eventName,
        eventDetails: args.eventDetails,
        createdBy: Auth.email,
        date: args.date,
        invited: []
    });
    return newEvent;
}

//add invite
async function invite(parent, args, context, info) {
  const user = await context.models.Register.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }
  const inviteData = await context.models.Event.findOne({
    where: { eventName: args.eventName }
  });

  if(inviteData.invited !== null){
  let invite = inviteData.invited.includes(args.email)
    if(invite){
      throw Error("Already invited")
    }
  }

  await context.models.Event.update(
      {
        invited: sequelize.fn(
          "array_append",
          sequelize.col("invited"),
          args.email
        ),
      },
      { where: { eventName: args.eventName } }
    );
    return {
      message: "Invited successful!",
    };
}

module.exports = {
  register,
  login,
  logout,
  changepassword,
  resetpassword,
  addevent,
  invite,
};
