const { Markup } = require("telegraf");
const { getUser } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    await ctx.reply(
      "Please select a topic from the list below:",
      Markup.inlineKeyboard([
        [Markup.button.callback("Topic 1", "topic1")],
        [Markup.button.callback("Topic 2", "topic2")],
        [Markup.button.callback("Topic 3", "topic3")],
        [Markup.button.callback("Topic 4", "topic5")],
        [Markup.button.callback("Topic 5", "topic5")],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }
};
