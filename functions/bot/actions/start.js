const { Markup } = require("telegraf");
const { getUser } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    await ctx.reply(
      `👋 Ласкаво просимо до Opora QA Bot 🤖.
     \n🔍 Будь ласка, оберіть тему зі списку нижче 🎯:`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Міграція", "topic1")],
        [Markup.button.callback("Робота", "topic2")],
        [Markup.button.callback("Інтеграція", "topic3")],
        [Markup.button.callback("Освіта", "topic5")],
        [Markup.button.callback("Охорона здоров'я", "topic5")],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }
};
