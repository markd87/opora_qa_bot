const { Markup } = require("telegraf");

exports.right_visa = (bot) => {
  bot.action("right_visa", async (ctx) => {
    await ctx.replyWithHTML(
      "<b>What is the purpose of your visit to the UK?</b>",
      Markup.inlineKeyboard([
        [Markup.button.callback("Fleeing the war in Ukraine", "right_visa_o1")],
        [
          Markup.button.callback(
            "Short visit to see family or friends",
            "right_visa_o2"
          ),
        ],
        [Markup.button.callback("Work in the UK", "right_visa_o3")],
        [Markup.button.callback("Work in the UK", "right_visa_o4")],
        [Markup.button.callback("Other purpose", "right_visa_o5")],
        [Markup.button.callback("I am already in the UK", "right_visa_o6")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("right_visa_o5", async (ctx) => {
    await ctx.replyWithHTML(
      `**Check gov.uk for available visa types?**
          \n [https://www.gov.uk/check-uk-visa](url)`
    );
    ctx.answerCbQuery();
  });

  bot.action("right_visa_o1", async (ctx) => {
    await ctx.replyWithHTML(
      "<b>Do you have a family member in the UK?</b>",
      Markup.inlineKeyboard([
        [Markup.button.callback("Yes", "right_visa_o1_yes")],
        [Markup.button.callback("No ", "right_visa_o1_no")],
      ])
    );

    ctx.answerCbQuery();
  });
};
