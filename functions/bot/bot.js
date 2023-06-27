const { Telegraf, session, Scenes, Markup, Extra } = require("telegraf");
const { visas } = require("./components/visas");
const { visa_problems } = require("./components/visa_problems");
const { homes_for_ukraine } = require("./components/homes_for_ukraine");
const { right_visa } = require("./components/right_visa");
const { family_scheme } = require("./components/family_scheme");
const { faq } = require("./components/faq");

const startAction = require("./actions/start");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// bot.use(session());

bot.start((ctx) => {
  return startAction(ctx);
});

const ok_markup = Markup.inlineKeyboard([[Markup.button.callback("Ок", "OK")]]);

// initialize actions paths
visas(bot);
right_visa(bot);
visa_problems(bot);
homes_for_ukraine(bot);
family_scheme(bot);
faq(bot);

bot.action("housing", async (ctx) => {
  await ctx.replyWithHTML(
    `Якщо у вас є житлове питання
    \nПерейдіть до чату Opora Житло: https://t.me/opora_housing`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("employment", async (ctx) => {
  await ctx.replyWithHTML(
    `Якщо у вас є питання щодо працевлаштування
    \nПерейдіть на канал Opora з питань роботи: https://t.me/opora_employment`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("benefits", async (ctx) => {
  await ctx.replyWithHTML(
    `Якщо ваше питання про соцвиплати (бенефіти)
    \nДивіться цей вебінар: https://ua.opora.uk/benefits/ua.opora.uk/benefits`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("mental_health", async (ctx) => {
  await ctx.replyWithHTML(
    `Підтримка психічного здоров'я
    \nПерейдіть у чат Opora з питань психічного здоров'я https://t.me/opora_mentalhealth`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("general", async (ctx) => {
  await ctx.replyWithHTML(
    `Загальні питання після прибуття
    \nПерейдіть в чат Opora Після прибуття [ttps://t.me/oporaukarrivals`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("OK", async (ctx) => {
  await ctx.replyWithHTML(
    `✅ Дякуємо, що скористалися нашим асистентом!`,
    Markup.removeKeyboard()
  );
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
