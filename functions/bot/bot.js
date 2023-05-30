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

// bot.action("next", (ctx) => {
//   return ctx.scene.enter("super-wizard");
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
