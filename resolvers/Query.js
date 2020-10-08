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

module.exports = {
  events,
};
