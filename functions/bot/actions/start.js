const { Markup } = require("telegraf");
const { getUser } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    await ctx.replyWithHTML(
      `<b>What questions do you have about UK visas?</b>
      \n<i>Choose a topic</i>:`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Choose the right visa", "right_visa")],
        [
          Markup.button.callback(
            "Homes for Ukraine (sponsorship scheme)",
            "homes_for_ukraine"
          ),
        ],
        [
          Markup.button.callback(
            "Ukraine Family Scheme \n(family members of Ukranians)",
            "family_scheme"
          ),
        ],
        [
          Markup.button.callback(
            "Ukraine Extension Scheme",
            "extension_scheme"
          ),
        ],
        [Markup.button.callback("Visa decision delayed", "decision_delayed")],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }
};
