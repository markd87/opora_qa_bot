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

bot.action("q1", async (ctx) => {
  const kb = Markup.inlineKeyboard([
    [Markup.button.callback("Yes", "q1_1")],
    [Markup.button.callback("No - I don't have family in the UK", "q1_2")],
  ]);

  await ctx.reply(`Do you have family members in the UK?`, kb);

  ctx.answerCbQuery();
});

bot.action("q1_1", async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback("✅ Yes", "q1_1")],
      [Markup.button.callback("No - I don't have family in the UK", "q1_2")],
    ],
  });

  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `*How to find a sponsor?*
    \nRead our article:
    \n[https://ua.opora.uk/blog/yakim-chinom-ukrayinczam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk](https://ua.opora.uk/blog/yakim-chinom-ukrayinczam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk)
  `,
    {
      parse_mode: "Markdown",
    }
  );

  ctx.answerCbQuery();
});

bot.action("q1_2", async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback("Yes", "q1_1")],
      [Markup.button.callback("✅ No - I don't have family in the UK", "q1_2")],
    ],
  });

  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `*How to find a sponsor?*
    \nRead our article:
    \n[https://ua.opora.uk/blog/yakim-chinom-ukrayinczam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk](https://ua.opora.uk/blog/yakim-chinom-ukrayinczam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk)
  `,
    {
      parse_mode: "Markdown",
    }
  );
  ctx.answerCbQuery();
});

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
