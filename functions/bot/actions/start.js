const { Markup } = require("telegraf");
const { getUser, main_topics } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    // await ctx.replyWithHTML(
    //   `<b>Про що ваше питання?</b>`,
    //   Markup.inlineKeyboard([
    //     [Markup.button.callback("Візи до Великобританії", "visas")],
    //     [Markup.button.callback("Житло", "housing")],
    //     [Markup.button.callback("Працевлаштування", "employment")],

    //     [Markup.button.callback("Соцвиплати (бенефіти)", "benefits")],
    //     [
    //       Markup.button.callback(
    //         "Підтримка психічного здоров'я",
    //         "mental_health"
    //       ),
    //     ],
    //     [Markup.button.callback("Загальні питання після прибуття", "general")],
    //   ])
    // );
    await ctx.replyWithHTML(
      `<b>Виберіть тему:</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Як обрати правильну візу до Великобританії",
            "right_visa"
          ),
        ],
        [Markup.button.callback("Популярні питання про візи", "faq")],
        [
          Markup.button.callback(
            "Схема Homes for Ukraine (спонсорська допомога)",
            "homes_for_ukraine"
          ),
        ],
        [Markup.button.callback("Ukraine Family Scheme", "family_scheme")],

        [
          Markup.button.callback(
            "Ukraine Extension Scheme",
            "extension_scheme"
          ),
        ],
        [Markup.button.callback("Проблема з візою або BRP", "problem_visa")],
        [
          Markup.button.callback(
            "Дитина, народжена у Великобританії",
            "child_born_uk"
          ),
        ],
        [
          Markup.button.callback(
            "Подорожі за межі Великобританії",
            "travel_outside"
          ),
        ],

        [
          Markup.button.callback(
            "Як залишитися у Великобританії назавжди",
            "stay_forever"
          ),
        ],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }

  await ctx.telegram.sendMessage(
    ctx.chat.id,
    "Для перезапуску бота, натисніть /start"
  );

  await ctx.telegram.pinChatMessage(ctx.chat.id, ctx.message.message_id);
};
