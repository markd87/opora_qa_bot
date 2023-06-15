const { Telegraf, session, Scenes, Markup, Extra } = require("telegraf");
const { visas } = require("./components/visas");
const { sponsor } = require("./components/sponsor");
const startAction = require("./actions/start");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// bot.use(session());

bot.start((ctx) => {
  return startAction(ctx);
});

const ok_markup = Markup.inlineKeyboard([[Markup.button.callback("Ок", "OK")]]);

bot.action("housing", async (ctx) => {
  await ctx.replyWithHTML(
    `Якщо у вас є житлове питання
    \nПерейдіть до чату Opora Житло: [https://t.me/opora_housing](https://t.me/opora_housing)`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("employment", async (ctx) => {
  await ctx.replyWithHTML(
    `Якщо у вас є питання щодо працевлаштування
    \nПерейдіть на канал Opora з питань роботи: [https://t.me/opora_employment](https://t.me/opora_employment)`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("benefits", async (ctx) => {
  await ctx.replyWithHTML(
    `Якщо ваше питання про соцвиплати (бенефіти)
    \nДивіться цей вебінар: [https: ](https://ua.opora.uk/benefits)//ua.opora.uk/benefits`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("mental_health", async (ctx) => {
  await ctx.replyWithHTML(
    `Підтримка психічного здоров'я
    \nПерейдіть у чат Opora з питань психічного здоров'я [https://t.me/opora_mentalhealth](https://t.me/opora_mentalhealth)`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("general", async (ctx) => {
  await ctx.replyWithHTML(
    `Загальні питання після прибуття
    \nПерейдіть в чат Opora Після прибуття [https://t.me/oporaukarrivals](https://t.me/oporaukarrivals)`,
    ok_markup
  );
  ctx.answerCbQuery();
});

bot.action("OK", async (ctx) => {
  await ctx.replyWithHTML(`Дякуємо, що скористалися нашим асистентом!`);
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

visas(bot);
sponsor(bot);

// homes for ukraine
bot.action("homes_for_ukraine", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Would you like to apply for Homes for Ukraine visa?</b>`,
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
  await ctx.replyWithHTML(
    `<b>How long are you waiting for your visa?</b>
  
  The processing times for "Ukrainian" visas vary greatly, ranging from 1 day to 6 months or longer.
  
  As of February 2023, 25% of applicants wait for a visa for more than 4 months.
  
  If you are waiting for your visa less than 2 months you do not need to do any actions in this case.`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "less than 2 months",
          "problem_visa_delayed_less"
        ),
      ],
      [
        Markup.button.callback(
          "more than 2 months",
          "problem_visa_delayed_more"
        ),
      ],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("problem_visa_delayed_more", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>What can I do if I am waiting for my visa more than 2 months?</b>

    If the visa does not arrive within 2 months, you can submit an escalation: https://t.me/uspuk/178 This is not a guarantee of visa issuance but only a chance to expedite the process.

    If escalations do not yield results, ask your sponsor/relative to write to the MP (Member of Parliament). You can find their contacts here https://members.parliament.uk/members/commons.

    Submitting a new application for a "Ukrainian" visa cancels all your previous applications, and the processing time starts anew.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("OK", "OK")],
      [Markup.button.callback("Go to the start", "go_to_start")],
    ])
  );
  ctx.answerCbQuery();
});

bot.action("problem_visa_rejected", async (ctx) => {
  await ctx.replyWithHTML(`<b>Visa rejected (PLACEHOLDER)</b>`);
  ctx.answerCbQuery();
});

bot.action("want_to_be_sponsor", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>I want to be a sponsor</b>`,
    Markup.inlineKeyboard([
      [Markup.button.callback("I live with a sponsor", "want_to_be_live")],
      [Markup.button.callback("I rent privately", "want_to_be_rent")],
      [
        Markup.button.callback(
          "I am an owner of the accommodation",
          "want_to_be_owner"
        ),
      ],
      [Markup.button.callback("None of above", "want_to_be_none")],
    ])
  );
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
