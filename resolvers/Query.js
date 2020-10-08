const { APP_SECRET, getUserId } = require("../seeders/utils");

//datefilter query
const Op = require("../models").Sequelize.Op;
async function events(parent, args, context, info) {
  if (args.startDate && args.endDate) {
    const events = await context.models.Event.findAll({
      attributes: [],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      logging: console.log,
      raw: true,
      order: [["createdAt", "ASC"]],
      // limit: count,
    });
    return events;
  } else {
    throw Error("Please enter all details");
  }
}

//my event
async function getMyEvent(parent, args, context, info) {
  const Auth = getUserId(context);
  const data = await context.models.Event.findAll({
    where: {
      email: Auth.email,
    },
  });
  return data;
}
//search event
async function getSearchedEvent(parent, args, context, info) {
  const Auth = getUserId(context);
  if (Auth) {
    if (!args.searchQuery) {
      throw Error("Please enter keyword");
    }
    const data = await context.models.Event.findAll({
      where: {
        eventName: { [Op.like]: "%" + searchQuery + "%" },
      },
    });
    return data;
  }
}

//checkinvitation
async function checkInvitation(parent, args, context, info) {
  const Auth = getUserId(context);
  const data = await context.models.Event.findAll({
    where: {
      invited: { [Op.contains]: [Auth.email] },
    },
  });
  return data;
}

module.exports = {
  events,
  getMyEvent,
  getSearchedEvent,
  checkInvitation,
};
