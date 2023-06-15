const { Markup } = require("telegraf");
const { Extra } = require("telegraf");

exports.visa_problems = (bot) => {
  bot.action("problem_visa", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Яка у вас проблема?</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Рішення про видачу візи затримується",
            "problem_visa_delayed"
          ),
        ],
        [
          Markup.button.callback(
            "Відмовлено у видачі візи",
            "problem_visa_refused"
          ),
        ],
        [Markup.button.callback("Проблема з моїм BRP", "problem_visa_brp")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("problem_visa_delayed", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Скільки часу минуло з моменту подання заявки на візу Homes for Ukraine?</b>
    
      Терміни оформлення "українських" віз дуже різняться - від 1 дня до 6 місяців і довше. 
      Станом на травень 2023 року 23% заявників чекають на візу понад 4 місяці.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Менше 2 місяців",
            "problem_visa_delayed_less"
          ),
        ],
        [
          Markup.button.callback(
            "Більше 2 місяців",
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

  bot.action("problem_visa_delayed_less", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Треба зачекати.</b>
  
      Якщо ви чекаєте на візу Ukraine Scheme менше двох місяців, наразі не потрібно вживати жодних заходів. Просто наберіться терпіння і чекайте подальших оновлень по вашій заявці.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Як перевірити статус візової заяви",
            "check_visa_status"
          ),
        ],
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "go_to_start"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("check_visa_status", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Статус заяви на отримання візи Ukraine Scheme</b>
      \nМіністерство внутрішніх справ не надає оновлень щодо статусу візової заяви, поки вона перебуває в процесі розгляду. Щоб бути в курсі подій, виконайте наступні кроки:

      1. Переконайтеся, що ваша візова анкета подана на розгляд. Багато людей не заповнюють свої заяви і чекають на рішення протягом невизначеного часу, в той час як їхні заяви навіть не розглядаються Home Office.
      2. Регулярно перевіряйте електронну пошту, яку ви використовували для подачі заяви на візу, на предмет будь-яких оновлень щодо рішення по візовій заявці.
      3. Якщо ви подавали заяву через мобільний додаток ID Check і відсканували свій паспорт, ви також можете скористатися послугою <a href="https://www.gov.uk/view-prove-immigration-status">"View and prove your immigration status"</a>, щоб дізнатися, чи була видана ваша віза.`,
      Extra.markup((markup) => {
        return markup.inlineKeyboard([
          [
            markup.callbackButton(
              "Як перевірити, чи була подана візова анкета",
              "check_submitted"
            ),
          ],
          [
            markup.callbackButton(
              "Як виглядає візове рішення.",
              "what_decision_look"
            ),
          ],
          [
            markup.callbackButton(
              "Імміграційний статус: 'The details entered don't match our records'.",
              "status_says"
            ),
          ],
        ]);
      })
    );
    ctx.answerCbQuery();
  });

  bot.action("problem_visa_rejected", async (ctx) => {
    await ctx.replyWithHTML(`<b>Visa rejected (PLACEHOLDER)</b>`);
    ctx.answerCbQuery();
  });
};
