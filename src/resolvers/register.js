function registers(parent, args, context) {
  return context.models.Register.findAll();
}

module.exports = {
  registers,
};
