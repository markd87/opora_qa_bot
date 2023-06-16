const { Markup } = require("telegraf");
const { Extra } = require("telegraf");
// const fs = require("fs");

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
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Як перевірити, чи була подана візова анкета",
            "check_submitted"
          ),
        ],
        [
          Markup.button.callback(
            "Як виглядає візове рішення.",
            "what_decision_look"
          ),
        ],
        [
          Markup.button.callback(
            "Імміграційний статус:'The details entered don't match our records'.",
            "status_says"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("check_submitted", async (ctx) => {
    await ctx.replyWithHTML(
      `Скористайтеся цим посібником, щоб перевірити свою візову заяву`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Продовжити посібник.",
            "check_submitted_guide"
          ),
        ],
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("check_submitted_guide", async (ctx) => {
    await ctx.replyWithHTML(
      `Перевірте електронну пошту, на яку ви подавали заявку на візу. Ви отримали лист "UK Visa - application submitted"?
      \nПротягом усього процесу подачі заявок ви отримаєте три ключові електронні листи.

      <b>Електронний лист №1: "UK Visa - application submitted"</b>:
      * Цей лист надсилається після того, як ви заповнили візову анкету.
      * На цьому етапі ви більше не можете вносити зміни до заяви.
      * Однак, заявка ще не оброблена, оскільки вам все ще потрібно завантажити підтверджуючі документи.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Далі", "check_submitted_guide_1")],
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("check_submitted_guide_1", async (ctx) => {
    await ctx.replyWithHTML(
      `Ви отримали електронного листа "Evidence sent/ Ukraine Scheme"?
      \n<b>Електронний лист №2 - Evidence sent/ Ukraine Scheme</b>:
      * Приходить після завантаження доказів (паспорт гостя або інший документ, що посвідчує особу, паспорт спонсора або BRP, підтвердження перебування гостя в Україні станом на 01.01.2022 і т.д.)
      * Тільки з цього моменту Ваша візова анкета буде розглядатися
      * У вас можуть попросити додаткові докази.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Далі", "check_submitted_guide_2")],
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("check_submitted_guide_2", async (ctx) => {
    await ctx.replyWithHTML(
      `Ви отримали лист "Application Update"?
      \n<b>Лист №3 - Application Update</b>:
      * Якщо в ньому написано: "<b>Your application under the Ukraine Scheme has been successful</b>", це означає, що віза була <b>схвалена</b>, і ви можете вперше подорожувати Великою Британією з цим листом і вашим паспортом (тобто, це ваш лист про дозвіл на в'їзд). У ньому також вказано точний термін дії вашої візи - 3 роки.
      * Якщо є слова "<b>rejected</b>" або "<b>refused</b>", це означає, що віза не була схвалена.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("what_decision_look", async (ctx) => {
    await ctx.replyWithHTML(
      `Перевірте електронну пошту, з якої ви подавали заявку на візу. Чи отримали ви електронний лист "Application Update"?
      \n* Якщо в ньому написано: "<b>Your application under the Ukraine Scheme has been successful</b>", це означає, що віза була <b>схвалена</b>, і ви можете вперше подорожувати Великою Британією з цим листом і вашим паспортом (тобто, це ваш лист про дозвіл на в'їзд). У ньому також вказано точний термін дії вашої візи - 3 роки.
      * Якщо є слова "<b>rejected</b>" або "<b>refused</b>", це означає, що віза не була схвалена.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Я не отримав цього листа.",
            "problem_visa_delayed"
          ),
        ],
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    const imageUrl =
      "https://thriving-frangollo-33fd04.netlify.app/assets/what_decision_look.jpeg";
    await ctx.telegram.sendPhoto(ctx.chat.id, imageUrl);

    ctx.answerCbQuery();
  });

  bot.action("status_says", async (ctx) => {
    await ctx.replyWithHTML(
      `Home Office не може показати ваш імміграційний статус.
      \nЦе означає, що ти:
      - зробили помилку в анкеті
      - ще не маєте візи
      - подали заявку без використання додатку ID Check.
      
      Якщо ви чекаєте на візу "Ukraine Scheme" менше двох місяців, то наразі немає необхідності вживати жодних заходів. Просто наберіться терпіння і чекайте подальших оновлень по вашій заявці.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );

    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      "https://thriving-frangollo-33fd04.netlify.app/assets/status_says.jpeg"
    );

    ctx.answerCbQuery();
  });

  bot.action("problem_visa_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Що найкраще описує вашу ситуацію?</b>`,
      Markup.inlineKeyboard([
        [
          [
            Markup.button.callback(
              "Я заявник, і мені відмовили у видачі візи",
              "applicant_refused"
            ),
          ],
          Markup.button.callback(
            "Я є спонсором, і моєму гостю відмовили у видачі візи",
            "sponsor_guest_refused"
          ),
        ],
        [
          Markup.button.callback(
            "Я запросив члена сім'ї, а йому відмовили у візі",
            "family_refused"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("applicant_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>На яку візу ви подавали?</b>`,
      Markup.inlineKeyboard([
        [
          [
            Markup.button.callback(
              "Homes for Ukraine",
              "homes_for_ukraine_refused"
            ),
          ],
          Markup.button.callback("Ukraine Family Scheme", "family_refused"),
        ],
        [
          Markup.button.callback(
            "Ukraine Extension Scheme",
            "extension_scheme_refused"
          ),
        ],
        [
          Markup.button.callback(
            "Стандартна гостьова віза",
            "visitor_visa_refused"
          ),
        ],
        [Markup.button.callback("Інше", "other_visa_refused")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("homes_for_ukraine_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `Популярні причини відмови у видачі візи Homes for Ukraine 
      \nЩоб зрозуміти причину відмови у видачі візи, уважно перегляньте розділ "Reasons for Refusal" в електронному листі "Application Update". 

      Найпоширенішими причинами є
      1. <b>Спонсор не відповідає вимогам</b>, наприклад, у нього немає імміграційного статусу, який дозволяє йому перебувати у Великобританії протягом 6 місяців або більше. Це стосується ситуацій, коли вони мають відповідний імміграційний статус, але ви не надали його підтвердження (їхній британський паспорт або BRP), коли завантажували докази для вашої заявки.
      2. <b>Заявник не відповідає вимогам</b>. Щоб подати заявку по Homes for Ukraine, ви повинні бути громадянином України або найближчим членом сім'ї громадянина України, який отримав візу в рамках програми Homes for Ukraine, або подає заявку на участь у програмі і має право на участь у ній. Ви також повинні довести, що ви проживали в Україні на 1 січня 2022 року або безпосередньо перед цією датою (включаючи тих, хто вже виїхав з України) і перебуваєте за межами Великої Британії. Якщо ви не змогли надати докази цього, ваша заявка, швидше за все, буде відхилена.
      3. Можуть бути й інші причини відмови, тому, будь ласка, уважно перевірте лист з рішенням.
      
      Умови участі у програмі можна знайти на урядовому сайті https://www.gov.uk/guidance/apply-for-a-visa-under-the-ukraine-sponsorship-scheme#eligibility
      
      Якщо вам потрібна допомога, звертайтеся до Служби віз та імміграції Великої Британії: +44 808 164 8810 (з понеділка по п'ятницю, з 9:00 до 17:30, дзвінки безкоштовні)`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("extension_scheme_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Популярні причини відмови у видачі візи Ukraine Extension Scheme</b>
      \nЩоб зрозуміти причину відмови у видачі візи, уважно перегляньте розділ "Reasons for Refusal" в електронному листі "Application Update".

      Найпопулярнішою причиною є те, що ви перебуваєте у Великобританії нелегально - ваша поточна віза закінчилася до 1 січня 2022 року.

      Можуть бути й інші причини відмови, тому, будь ласка, уважно перевірте лист з рішенням.

      Умови участі у програмі можна знайти на урядовому сайті https://www.gov.uk/guidance/apply-to-stay-in-the-uk-under-the-ukraine-extension-scheme

      Якщо вам потрібна допомога, звертайтеся до Служби віз та імміграції Великої Британії: +44 808 164 8810 (з понеділка по п'ятницю, з 9:00 до 17:30, дзвінки безкоштовні)`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("visitor_visa_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Популярні причини відмови у видачі стандартної гостьової візи</b>
      \nЩоб краще зрозуміти причини відмови у видачі візи, уважно ознайомтеся з розділом "Reasons for Refusal" в електронному листі з рішенням. Нижче деякі поширені причини відмови у видачі стандартної гостьової візи:

    1. <b>Мета візи та обмеження</b>: Стандартна гостьова віза дозволяє вам відвідати Велику Британію на короткий період як туристу, для відвідування родичів, ділових зустрічей та короткострокових навчальних курсів. Однак робота суворо заборонена, немає доступу до пільг, немає права на допомогу бездомним і дуже обмежений доступ до охорони здоров'я. Якщо у візового офіцера виникнуть підозри, що ви маєте намір залишитися у Великій Британії, працювати або займатися іншою забороненою діяльністю, це може призвести до відмови у видачі візи. Надання неправдивої інформації про себе може призвести до 10-річної заборони на в'їзд до Великої Британії.

    2. <b>Фінансові вимоги: Для отримання стандартної гостьової візи заявники повинні подати виписку про рух коштів на рахунку за останні 6 місяців. Важливими факторами є
    - Наявність щомісячного доходу, який становить щонайменше половину передбачуваної загальної вартості подорожі до Великої Британії.
    - Наявність заощаджень, щонайменше вдвічі перевищують загальну суму витрат на поїздку до Великої Британії.
    - Виписки з банківського рахунку, що відображають регулярні надходження заробітної плати/доходу (а не лише одну велику суму грошей, покладену на рахунок перед подачею заяви на візу).

    Ці вимоги не описані чітко у візових правилах, але базуються на спостереженнях, зроблених під час розгляду листів з відмовами у видачі візи.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("other_visa_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Перевірте свій лист з рішенням про відмову у видачі візи на предмет причин відмови</b>`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("family_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Популярні причини відмови у видачі візи Ukraine Family Scheme</b>
      \nЩоб зрозуміти причину відмови у видачі візи, уважно перегляньте розділ "Reasons for Refusal" в їхньому електронному листі "Application Update".

    Найпоширенішими причинами є
    1.<b>Член сім'ї не має права на отримання візи</b>, наприклад, не має відповідного імміграційного статусу: Британський громадянин, безстроковий дозвіл на проживання, статус settled або pre-settled.

    > Зверніть увагу, що якщо член вашої родини перебуває у Великій Британії за візою Ukraine Family Scheme, Homes for Ukraine або Ukraine Extension Scheme, він НЕ МОЖЕ запросити вас за програмою Ukraine Family Scheme. Вони повинні знайти для вас спонсора або стати вашим спонсором за програмою Homes for Ukraine

    2.<b>Ви не змогли довести родинні зв'язки</b> з членом Вашої родини, який запрошує Вас по Ukraine Family Scheme.

    3.<b>Заявник не відповідає вимогам</b>. Щоб подати заявку на Ukraine Family Scheme, ви повинні бути українцем або найближчим членом сім'ї громадянина України, який отримав дозвіл на перебування в Україні, або подає заявку на Ukraine Family Scheme і має на це право. Ви також повинні довести, що ви проживали в Україні на 1 січня 2022 року або безпосередньо перед цією датою (включаючи тих, хто вже виїхав з України) і перебуваєте за межами Великої Британії. Якщо ви не змогли надати докази цього, ваша заява, швидше за все, буде відхилена.

    4.<b>Можуть бути й інші причини відмови</b>, тому, будь ласка, уважно перевірте лист з рішенням.

    Умови участі у програмі можна знайти на урядовому сайті https://www.gov.uk/guidance/apply-for-a-ukraine-family-scheme-visa.

    Якщо вам потрібна допомога, звертайтеся до Служби віз та імміграції Великої Британії: +44 808 164 8810 (з понеділка по п'ятницю, з 9:00 до 17:30, дзвінки безкоштовні)`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("problem_visa_brp", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Що найкраще описує вашу ситуацію?</b>
      \nЩоб зрозуміти причину відмови у видачі візи, уважно перегляньте розділ "Reasons for Refusal" в їхньому електронному листі "Application Update".`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Не отримав свій BRP вчасно після надання біометричних даних у Великобританії",
            "didnt_get_brp_ontime"
          ),
        ],
        [
          Markup.button.callback(
            "Мій BRP не був на пошті, коли я прийшов забрати його",
            "brp_not_in_postoffice"
          ),
        ],
        [
          Markup.button.callback(
            "Поштове відділення, де я маю забрати свій BRP зачинено назавжди",
            "brp_post_office_closed"
          ),
        ],
        [
          Markup.button.callback(
            "Потрібно виїхати з Великобританії до отримання BRP",
            "brp_need_to_leave"
          ),
        ],
        [
          Markup.button.callback(
            "Я не зміг вчасно забрати свій BRP з пошти",
            "brp_failed_collect"
          ),
        ],
        [
          Markup.button.callback(
            "Поштове відділення, де я маю забрати свій BRP, знаходиться занадто далеко",
            "brp_postoffice_far"
          ),
        ],
        [
          Markup.button.callback(
            "Пошта відмовилася видати мені BRP",
            "brp_postoffice_refused"
          ),
        ],
        [Markup.button.callback("Помилка у моєму BRP", "brp_mistake")],
        [Markup.button.callback("Втратив свій BRP", "brp_lost")],
      ])
    );
    ctx.answerCbQuery();
  });
};
