function createdBy(parent, args, context) {
  return context.models.Event.findOne({ where: { id: parent.id } }).createdBy();
}
function invite(parent, args, context) {
  return context.models.Event.findOne({ where: { id: parent.id } }).invite();
}

module.exports = {
  createdBy,
  invite,
};
