const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

function getUserId(context) {
  const token = context.req.headers.authorization
  console.log('>>>>>>>>>>>????>>',token)
  // const Authorization = context.request.get("authorization");
  if (token) {
    // const token = Authorization.replace("Bearer ", "");
    const { userId, email } = jwt.verify(token, APP_SECRET);
    return { userId, email };
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
