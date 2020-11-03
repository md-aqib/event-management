const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

function getUser(context) {
  const token = context.req.headers.authorization

  if (token) {
    const { userId, email } = jwt.verify(token, APP_SECRET);
    return { userId, email };
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  getUser,
};
