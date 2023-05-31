const { Telegraf, session, Scenes, Markup, Extra } = require("telegraf");

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

bot.action("topic1", async (ctx) => {
  await ctx.replyWithHTML(
    `<h3>What is the purpose of your visit to the UK?</h3>`,
    Extra.HTML().markup((m) =>
      m.inlineKeyboard([
        [
          [m.button.callback("Run from the war in ukraine", "q1")],
          [m.button.callback("Visiting friends or family", "q2")],
          [m.button.callback("Work in the UK", "q3")],
          [m.button.callback("Other reason", "q4")],
          [m.button.callback("I'm already in the UK", "q5")],
        ],
      ])
    )
  );
  ctx.answerCbQuery();
});

bot.action("q1", async (ctx) => {
  await ctx.reply(
    `🌟 Відповідь на П1: прикладова відповідь 1.`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Всі теми", "topics"),
        Markup.button.callback("Всі питання по темі", "topic1"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("q2", async (ctx) => {
  await ctx.reply(
    `🌟 Відповідь на П2: прикладова відповідь 2.`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Всі теми", "topics"),
        Markup.button.callback("Всі питання по темі", "topic1"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("q3", async (ctx) => {
  await ctx.reply(
    `🌟 Відповідь на П3: прикладова відповідь 3.`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Всі теми", "topics"),
        Markup.button.callback("Всі питання по темі", "topic1"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("q4", async (ctx) => {
  await ctx.reply(
    `🌟 Відповідь на П4 прикладова відповідь 4.`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Всі теми", "topics"),
        Markup.button.callback("Всі питання по темі", "topic1"),
      ],
    ])
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
