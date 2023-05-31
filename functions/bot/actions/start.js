const { Markup } = require("telegraf");
const { getUser } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    await ctx.replyWithHTML(
      `
      <b>What questions do you have about UK visas?</b>
      <br/>
      Common questions:
      `,

      Markup.inlineKeyboard([
        [Markup.button.callback("Choose the right visa", "topic1")],
        [
          Markup.button.callback(
            "Homes for Ukraine (sponsorship scheme)",
            "topic2"
          ),
        ],
        [
          Markup.button.callback(
            "Ukraine Family Scheme \n(family members of Ukranians)",
            "topic3"
          ),
        ],
        [Markup.button.callback("Ukraine Extension Scheme", "topic4")],
        [Markup.button.callback("Visa decision delayed", "topic5")],
      ])
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }
};
