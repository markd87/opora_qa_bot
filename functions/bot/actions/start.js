const { getUser } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  ctx.reply(
    `Welcome to the Opora QA Bot,
    \nType \help to see the available topics`
  );
};
