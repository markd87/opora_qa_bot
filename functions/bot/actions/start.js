const { Markup } = require("telegraf");
const { getUser } = require("../components/helper");

var COUNT = 0;
var USERS = new Set();

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  COUNT = COUNT + 1;
  USERS.add(id);
  console.log("Total uses: ", COUNT);
  console.log("Unique users: ", USERS.size);

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

  const chatId = ctx.chat.id;
  const pin_message = "Для перезапуску бота, введіть /start";

  const sentMessage = await ctx.reply(pin_message);

  const chatInfo = await ctx.telegram.getChat(chatId);

  if (chatInfo.pinned_message) {
    // unpin
    await ctx.telegram.unpinChatMessage(chatId);
  }

  await ctx.telegram.pinChatMessage(chatId, sentMessage.message_id);
};
