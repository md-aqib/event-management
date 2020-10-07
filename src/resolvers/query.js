async function feed(parent, args, context, info) {
  const registers = await context.models.Register.findAll();
  return registers;
}

module.exports = {
  feed,
};
