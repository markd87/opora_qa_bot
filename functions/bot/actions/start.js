const { Markup, Extra } = require("telegraf");
const { getUser } = require("../components/helper");

module.exports = async (ctx) => {
  const { id, isBot, name, username } = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    await ctx.replyWithHTML(
      `
      <h3>What questions do you have about UK visas?</h3>
      <br/>
      Common questions:
      `,
      Extra.HTML().markup((m) =>
        m.inlineKeyboard([
          [m.button.callback("Choose the right visa", "topic1")],
          [
            m.button.callback(
              "Homes for Ukraine (sponsorship scheme)",
              "topic2"
            ),
          ],
          [
            m.button.callback(
              "Ukraine Family Scheme \n(family members of Ukranians)",
              "topic3"
            ),
          ],
          [m.button.callback("Ukraine Extension Scheme", "topic4")],
          [m.button.callback("Visa decision delayed", "topic5")],
        ])
      )
    );
  } catch (e) {
    console.log(e);
    return ctx.reply(`Error occurred`);
  }
};
