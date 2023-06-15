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
        [
          Markup.button.callback("Візи до Великобританії", "visas"),
          Markup.button.callback("Житло", "housing"),
        ],
        [
          Markup.button.callback("Працевлаштування", "employment"),
          Markup.button.callback("Соцвиплати (бенефіти)", "benefits"),
        ],
        [
          Markup.button.callback(
            "Підтримка психічного здоров'я",
            "mental_health"
          ),
          Markup.button.callback("Загальні питання після прибуття", "general"),
        ],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }

  // try {
  //   await ctx.replyWithHTML(
  //     `<b>What questions do you have about UK visas?</b>
  //     \n<i>Choose a topic</i>:`,
  //     Markup.inlineKeyboard([
  //       [Markup.button.callback("Choose the right visa", "right_visa")],
  //       [
  //         Markup.button.callback(
  //           "Homes for Ukraine (sponsorship scheme)",
  //           "homes_for_ukraine"
  //         ),
  //       ],
  //       [
  //         Markup.button.callback(
  //           "Ukraine Family Scheme (family members of Ukranians)",
  //           "family_scheme"
  //         ),
  //       ],

  //       [
  //         Markup.button.callback(
  //           "Ukraine Extension Scheme",
  //           "extension_scheme"
  //         ),
  //       ],
  //       [
  //         Markup.button.callback(
  //           "Tourist visa to see family or friends",
  //           "tourist_visa"
  //         ),
  //       ],
  //       [Markup.button.callback("Work visas", "work_visa")],
  //       [
  //         Markup.button.callback(
  //           "How to stay in the UK forever",
  //           "stay_forever"
  //         ),
  //       ],
  //       [Markup.button.callback("Problem with my visa or BRP", "problem_visa")],
  //     ])
  //   );
  // } catch (e) {
  //   console.log(e);
  //   return ctx.reply(`Error occurred`);
  // }
};
