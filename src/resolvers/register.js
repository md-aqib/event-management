function register(parent, args, context) {
  return context.models.Register.findAll();
}

module.exports = {
  register,
};
