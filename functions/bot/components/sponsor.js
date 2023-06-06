const { Markup } = require("telegraf");

exports.sponsor = (bot) => {
  bot.action(
    ["homes_for_ukraine_yes", "right_visa_o1_no", "sponsor"],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>You need a sponsor</b>
To participate in the Homes for Ukraine sponsorship scheme, you will need a sponsor.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("How do I find a sponsor?", "sponsor_how")],
          [
            Markup.button.callback(
              "I already have a sponsor",
              "sponsor_already"
            ),
          ],
        ])
      );
      ctx.answerCbQuery();
    }
  );

  bot.action("sponsor_how", async (ctx) => {
    await ctx.replyWithHTML(
      "Read our article: https://ua.opora.uk/blog/yakim-chinom-ukrayincyam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk"
    );
  });

  bot.action("sponsor_already", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Is your sponsor genuine?</b>
To determine if your UK visa sponsor is genuine, ensure that they meet all of the following criteria:
1. They are an individual person.
2. They provide accommodation for your stay.
3. They do not request money in exchange for the visa.
4. They do not require you to work in exchange for the visa.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Yes, they meet all of these criteria?",
            "sponsor_already_yes"
          ),
        ],
        [
          Markup.button.callback(
            "No, they don't meet some of these criteria",
            "sponsor_already_no"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("sponsor_already_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Prepare your visa application and apply on gov.uk</b>
https://www.gov.uk/guidance/apply-for-a-visa-under-the-ukraine-sponsorship-scheme`
    );
    ctx.answerCbQuery();
  });

  bot.action("sponsor_already_no", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>They are likely a scammer</b>
To avoid falling victim to scams, be cautious of individuals who promise a UK visa without providing accommodation or who request money or work in exchange for a visa. These situations often result in visa rejections or counterfeit visas that won't grant you entry into the UK.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("How to find a sponsor?", "sponsor_how")],
      ])
    );
  });
};
