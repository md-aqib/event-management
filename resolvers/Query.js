const { APP_SECRET, getUserId } = require("../seeders/utils");

//datefilter query
const Op = require("../models").Sequelize.Op;
async function events(parent, args, context, info) {
  const Auth = getUserId(context);
    const events = await context.models.Event.findAll({
      where: {
        date: {
          [Op.between]: [args.startDate, args.endDate],
        },
      },
      order: [
        ['date', 'DESC'],
    ],
    });
    if(events.length === 0){
      throw Error("No event found")
    }
    return events;
}

//my event
async function getMyEvent(parent, args, context, info) {
  const Auth = getUserId(context);
  const data = await context.models.Event.findAll({
    where: {
      createdBy: Auth.email,
    },
    order: [
      ['date', 'DESC'],
  ]
  });
  if(data.length === 0){
    throw Error("No data found")
  }
  return data;
}

//search event
async function getSearchedEvent(parent, args, context, info) {
  const Auth = getUserId(context);
    const data = await context.models.Event.findAll({
      where: {
        eventName: { [Op.like]: "%" + args.searchQuery + "%" },
      },
      order: [
        ['date', 'DESC'],
    ]
    });
    if(data.length === 0){
      throw Error("No search data found")
    }
    return data;
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

//users
async function users(parent, args, context, info) {
  // const Auth = getUserId(context);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',context.models.Register)
  const data = await context.models.Register.findAll();
  return data;
}

module.exports = {
  events,
  getMyEvent,
  getSearchedEvent,
  checkInvitation,
  users
};
