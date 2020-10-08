async function allEvents(parent, args, context, info) {
  const events = await context.models.Event.findAll();
  return events;
}

module.exports = {
  allEvents,
};
