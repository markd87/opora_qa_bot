const { Telegraf, session, Scenes, Markup } = require("telegraf");

const startAction = require("./actions/start");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// joining questions wizard
// const superWizard = new Scenes.WizardScene("super-wizard", async (ctx) => {
//   await ctx.reply(`Choose the topic of your question?`);
//   ctx.scene.session.user = {};
//   return ctx.wizard.next();
// });
// const stage = new Scenes.Stage([superWizard]);

bot.use(session());
// bot.use(stage.middleware());

bot.start((ctx) => {
  return startAction(ctx);
});

// register commands
bot.command("help", require("./actions/help"));

bot.action("topic1", async (ctx) => {
  await ctx.reply(
    "Будь ласка, виберіть питання зі списку нижче (Please select a question from the list below):"
  );

  await ctx.reply(
    `
    Q1: Які є вимоги до віз для українців, які бажають працювати у Великій Британії?
    \nQ2: Як можу продовжити своє перебування у Великій Британії як український іммігрант?
    \nQ3: Які мої права та обов'язки як українського іммігранта у Великій Британії?
    \nQ4: Як я можу привезти своїх родичів, щоб вони приєдналися до мене у Великій Британії?
    `,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Q1", "q1"),
        Markup.button.callback("Q2", "q2"),
        Markup.button.callback("Q3", "q3"),
        Markup.button.callback("Q4", "q4"),
      ],
    ])
  );
});

bot.action("q1", (ctx) => {
  ctx.reply(`Відповідь на Q1: прикладова відповідь 1.`);
});

bot.action("q2", (ctx) => {
  ctx.reply(`Відповідь на Q2: прикладова відповідь 2.`);
});

bot.action("q3", (ctx) => {
  ctx.reply(`Відповідь на Q3: прикладова відповідь 3.`);
});

bot.action("q4", (ctx) => {
  ctx.reply(`Відповідь на Q4 прикладова відповідь 4.`);
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
