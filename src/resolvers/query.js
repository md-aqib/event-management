async function feed(parent, args, context, info) {
  const register = await context.models.Register.findAll();

  return register;
}

module.exports = {
  feed,
};
