function registers(parent, args, context) {
  return context.models.register.findAll();
}

module.exports = {
  registers,
};
