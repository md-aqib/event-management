const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

// function post(parent, args, context, info) {
//   const userId = getUserId(context);

//   const newLink = context.models.link.create({
//     data: {
//       url: args.url,
//       description: args.description,
//       postedBy: { connect: { id: userId } },
//     },
//   });

//   return newLink;
// }

async function register(parent, args, context, info) {
  // 1

  const password = await bcrypt.hash(args.password, 10);

  // 2
  const user = await context.models.Register.create({
    data: { ...args, password },
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user,
  };
}

// async function login(parent, args, context, info) {

//   const user = await context.models.user.findOne({
//     where: { email: args.email },
//   });
//   if (!user) {
//     throw new Error("No such user found");
//   }

//   const valid = await bcrypt.compare(args.password, user.password);
//   if (!valid) {
//     throw new Error("Invalid password");
//   }

//   const token = jwt.sign({ userId: user.id }, APP_SECRET);

//   // 3
//   return {
//     token,
//     user,
//   };
// }

module.exports = {
  register,
  //   login,
  //   post,
};
