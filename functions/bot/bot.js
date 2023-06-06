const { Telegraf, session, Scenes, Markup, Extra } = require("telegraf");
const { right_visa } = require("./components/right_visa");
const { sponsor } = require("./components/sponsor");
const startAction = require("./actions/start");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.use(session());
// bot.use(stage.middleware());

bot.start((ctx) => {
  return startAction(ctx);
});

bot.action("topics", async (ctx) => {
  await ctx.reply(
    `Common questions:`,
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
  ctx.answerCbQuery();
});

right_visa(bot);
sponsor(bot);

// homes for ukraine
bot.action("homes_for_ukraine", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Would you like to apply for Homes for Ukraine visa??</b>`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Yes", "homes_for_ukraine_yes"),
        Markup.button.callback("No", "homes_for_ukraine_no"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("extension_scheme_yes", async (ctx) => {
  await ctx.replyWithHTML(`<b>Ukraine Extension Scheme (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

// Family scheme
bot.action("family_scheme", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Would you like to apply for Ukraine Family Scheme visa?</b>`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Yes", "family_scheme_yes"),
        Markup.button.callback("No", "family_scheme_no"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

// Extension scheme
bot.action("extension_scheme", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Would you like to apply for Ukraine Extension Scheme visa?</b>`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Yes", "extension_scheme_yes"),
        Markup.button.callback("No", "extension_scheme_no"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("extension_scheme_yes", async (ctx) => {
  await ctx.replyWithHTML(`<b>Ukraine Extension Scheme (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

//  Tourist Visa
bot.action("tourist_visa", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Would you like to apply for short visit visa, e.g. to see your family or friends in the UK?</b>`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Yes", "tourist_visa_yes"),
        Markup.button.callback("No", "tourist_visa_no"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("tourist_visa_yes", async (ctx) => {
  await ctx.replyWithHTML(`<b>Tourist visa  (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

// work visa
bot.action("work_visa", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Would you like to come to the UK or stay in the UK for work?</b>`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Yes", "work_visa_yes"),
        Markup.button.callback("No", "work_visa_no"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("work_visa_yes", async (ctx) => {
  await ctx.replyWithHTML(`<b>Work visa (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

// stay forever

bot.action("stay_forever", async (ctx) => {
  await ctx.replyWithHTML(`<b>ILR paths (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

//
bot.action("problem_visa", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>What kind of problem?</b>`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Visa decision delayed", "problem_visa_delayed")],
      [Markup.button.callback("Visa rejected", "problem_visa_rejected")],
      [
        Markup.button.callback(
          "Didn't get my BRP in time",
          "problem_visa_didnt"
        ),
      ],
      [Markup.button.callback("Lost my BRP", "problem_visa_lost")],
      [Markup.button.callback("Mistake on my BRP", "problem_visa_mistake")],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("problem_visa_delayed", async (ctx) => {
  await ctx.replyWithHTML(`<b>Visa delay (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

bot.action("problem_visa_rejected", async (ctx) => {
  await ctx.replyWithHTML(`<b>Visa rejected (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

bot.action("problem_visa_didnt", async (ctx) => {
  await ctx.replyWithHTML(`<b>BRP problems (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

bot.action("problem_visa_lost", async (ctx) => {
  await ctx.replyWithHTML(`<b>BRP problems (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});
bot.action("problem_visa_mistake", async (ctx) => {
  await ctx.replyWithHTML(`<b>BRP problems (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

// bot.action("q1_1", async (ctx) => {
//   await ctx.editMessageReplyMarkup({
//     inline_keyboard: [
//       [Markup.button.callback("✅ Yes", "q1_1")],
//       [Markup.button.callback("No - I don't have family in the UK", "q1_2")],
//     ],
//   });

//   await ctx.telegram.sendMessage(
//     ctx.chat.id,
//     `*How to find a sponsor?*
//     \nRead our article:
//     \n[https://ua.opora.uk/blog/yakim-chinom-ukrayinczam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk](https://ua.opora.uk/blog/yakim-chinom-ukrayinczam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk)
//   `,
//     {
//       parse_mode: "Markdown",
//     }
//   );

//   ctx.answerCbQuery();
// });

exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
