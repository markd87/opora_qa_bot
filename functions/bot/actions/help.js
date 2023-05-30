const { Markup } = require("telegraf");

module.exports = async (ctx) => {
  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    await ctx.reply(
      "Please select a topic from the list below:",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("Topic 1", "topic1"),
          Markup.button.callback("Topic 2", "topic2"),
          Markup.button.callback("Topic 3", "topic3"),
        ],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }
};
