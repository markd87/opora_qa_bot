const { Markup } = require("telegraf");
const { getUser, main_topics } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    await ctx.replyWithHTML(
      `<b>Про що ваше питання?</b>`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Візи до Великобританії", "visas")],
        [Markup.button.callback("Житло", "housing")],
        [Markup.button.callback("Працевлаштування", "employment")],

        [Markup.button.callback("Соцвиплати (бенефіти)", "benefits")],
        [
          Markup.button.callback(
            "Підтримка психічного здоров'я",
            "mental_health"
          ),
        ],
        [Markup.button.callback("Загальні питання після прибуття", "general")],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }
};
