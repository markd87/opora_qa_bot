const { Telegraf, session, Scenes, Markup } = require("telegraf");

const startAction = require("./actions/start");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.use(session());
// bot.use(stage.middleware());

bot.start((ctx) => {
  return startAction(ctx);
});

bot.action("topics", async (ctx) => {
  await ctx.reply(
    `Будь ласка, оберіть тему зі списку нижче:`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Міграція", "topic1")],
      [Markup.button.callback("Робота", "topic2")],
      [Markup.button.callback("Інтеграція", "topic3")],
      [Markup.button.callback("Освіта", "topic5")],
      [Markup.button.callback("Охорона здоров'я", "topic5")],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("topic1", async (ctx) => {
  await ctx.reply(
    "Будь ласка, виберіть питання зі списку нижче (Please select a question from the list below):"
  );

  await ctx.reply(
    `
    П1: Які є вимоги до віз для українців, які бажають працювати у Великій Британії?
    \nП2: Як можу продовжити своє перебування у Великій Британії як український іммігрант?
    \nП3: Які мої права та обов'язки як українського іммігранта у Великій Британії?
    \nП4: Як я можу привезти своїх родичів, щоб вони приєдналися до мене у Великій Британії?
    `,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("П1", "q1"),
        Markup.button.callback("П2", "q2"),
        Markup.button.callback("П3", "q3"),
        Markup.button.callback("П4", "q4"),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("q1", async (ctx) => {
  await ctx.reply(
    `Відповідь на П1: прикладова відповідь 1.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Показати всі теми", "topics")],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("q2", async (ctx) => {
  await ctx.reply(
    `Відповідь на П2: прикладова відповідь 2.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Показати всі теми", "topics")],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("q3", async (ctx) => {
  await ctx.reply(
    `Відповідь на П3: прикладова відповідь 3.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Показати всі теми", "topics")],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("q4", async (ctx) => {
  await ctx.reply(
    `Відповідь на П4 прикладова відповідь 4.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Показати всі теми", "topics")],
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
