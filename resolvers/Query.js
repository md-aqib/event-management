const { APP_SECRET, getUserId } = require("../seeders/utils");

//datefilter query
const Op = require("../models").Sequelize.Op;
async function events(parent, args, context, info) {
  if (args.startDate && args.endDate) {
    const events = await context.models.Event.findAll({
      attributes: [],
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      logging: console.log,
      raw: true,
      order: [
        ['date', 'DESC'],
    ],
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
    order: [
      ['date', 'DESC'],
  ]
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
      order: [
        ['date', 'DESC'],
    ]
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
    order: [
      ['date', 'DESC'],
  ]
  });
  return data;
}

module.exports = {
  events,
  getMyEvent,
  getSearchedEvent,
  checkInvitation,
};
