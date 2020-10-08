function createdBy(parent, args, context) {
  return context.models.Event.findOne({ where: { id: parent.id } }).createdBy();
}
function invited(parent, args, context) {
  return context.models.Event.findOne({ where: { id: parent.id } }).invited();
}

module.exports = {
  createdBy,
  invited,
};
