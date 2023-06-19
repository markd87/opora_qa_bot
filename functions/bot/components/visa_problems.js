const { Markup } = require("telegraf");

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

    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      "https://thriving-frangollo-33fd04.netlify.app/assets/what_decision_look.jpeg"
    );
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
      `<b>Що найкраще описує вашу ситуацію?</b>`,
      Markup.keyboard([
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
        [
          Markup.button.callback(
            "Потрібно виїхати з Великобританії до отримання BRP",
            "brp_need_to_leave"
          ),
        ],
      ])
    );
  });

  bot.hears(
    "Не отримав свій BRP вчасно після надання біометричних даних у Великобританії",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Перевірте звичайний час отримання вашого BRP після надання біометричних даних у Великій Британії</b>
        \nПісля надання біометричних даних у Великій Британії ви, як правило, можете розраховувати на отримання листа з рішенням протягом 10 днів. Після отримання цього листа ваш біометричний дозвіл на проживання (BRP) повинен бути доставлений до місцевого поштового відділення або безпосередньо на вашу адресу у Великобританії кур'єром протягом 10 робочих днів.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [Markup.button.callback("Воно затримується", "it_is_delayed")],
        ])
      );
    }
  );

  bot.action("it_is_delayed", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Затримка у прийнятті рішення про видачу BRP після надання біометричних даних у Великобританії</b>
        \nЯкщо ви здали біометричні дані у Великій Британії, але ваш BRP не надійшов у звичайний термін, ви можете написати на POUKR@homeoffice.gov.uk і попросити про допомогу, вказавши конкретні дані для кожного заявника:   
        - Повне ім'я
        - Дата народження
        - Громадянство 
        - Номер паспорта  
        - Реєстраційний номер (з листа про схвалення візи) 
        - Тип заяви (Homes for Ukraine, Ukraine Family Scheme або Ukraine Extension Scheme) 
        - Ваш контактний номер телефону у Великобританії 
        - Ваша адреса у Великобританії
        - Коли і як ви прибули до Великобританії, наприклад, номер рейсу авіакомпанії / дата, порт в'їзду і номер рейсу 
        - Фото посадкового талону, квитків або штампу в паспорті чи візової віньєтки / Сканована копія маршруту подорожі / квитків / віньєтки зі штампом
        
        Не подавайте повторну заявку на отримання біометрії BRP - вона буде відхилена, що може призвести до подальшої затримки доставки вашого BRP.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.hears(
    "Мій BRP не був на пошті, коли я прийшов забрати його",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Перевірте звичайний час отримання вашого BRP на пошті</b>
        \nПри отриманні BRP у поштовому відділенні терміни залежать від способу, яким ви подавали заяву на отримання візи до Великобританії. 

        1. Якщо ви подали заяву через додаток ID Check, відсканували свій біометричний паспорт і отримали електронний лист з дозволом на в'їзд (Application Update), ваш BRP можна буде отримати у вказаному поштовому відділенні через 28 днів після отримання дозволу на в'їзд. 
        
        2. Якщо ви здали біометричні дані у візовому центрі та отримали візову віньєтку, ваш BRP буде доставлено до поштового відділення через 10 днів після отримання рішення про видачу візи.
        
        Повідомлення про те, що BRP вже в поштовому відділенні, не буде. У всіх випадках BRP зберігатиметься на пошті протягом 60 днів, і якщо ви не заберете його вчасно, його буде відправлено назад до Home Office.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [
            Markup.button.callback(
              "Воно затримується",
              "it_is_delayed_postoffice"
            ),
          ],
          [
            Markup.button.callback(
              "Я не встиг забрати його вчасно",
              "failed_to_collect"
            ),
          ],
        ])
      );
    }
  );

  bot.action("it_is_delayed_postoffice", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви вже перебуваєте у Великобританії і не можете забрати свій BRP з поштового відділення у зазначений термін</b>
        \nЗверніться до Home Office через https://www.biometric-residence-permit.service.gov.uk/collection/where і повідомте їм причину, чому ви не змогли забрати свій BRP:
        - Ви не знаєте, в якому поштовому відділенні вам потрібно забрати BRP,  
        - Ви не змогли підтвердити свою особу для отримання BRP, 
        - Ваша посилка була відсутня у поштовому відділенні, 
        - Вам не виповнилося 18 років і Ви намагаєтеся забрати свою посилку без супроводу дорослої особи, яка несе за Вас відповідальність,  
        - Уповноважена особа намагалася забрати ваш BRP від вашого імені, але не змогла цього зробити,
        - Ви втратили свій паспорт.
        
        Протягом 5 робочих днів ви маєте отримати електронного листа від Home Office із повідомленням про те, де знаходиться ваш BRP і як його забрати.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.hears("Я не зміг вчасно забрати свій BRP з пошти", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви не змогли забрати свій BRP на пошті протягом 60 днів</b>
        \nМи все ще радимо вам звернутися на пошту, може його ще не відправили назад.  

        На жаль, Home Office не надає чітких письмових інструкцій щодо того, що робити, коли ваш BRP повертається з пошти. 
        
        Якщо це сталося з вами, спробуйте заповнити форму https://www.biometric-residence-permit.service.gov.uk/collection/where, вибравши опцію "<b>I don't know which Post Office I need to collect my BRP from</b>" і написати деталі в розділі коментарів:`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );

    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      "https://thriving-frangollo-33fd04.netlify.app/assets/failed_to_collect.png"
    );
  });

  bot.hears(
    "Поштове відділення, де я маю забрати свій BRP зачинено назавжди",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Якщо ваше поштове відділення закрите назавжд</b>
        \nЯкщо це сталося з вами, спробуйте заповнити форму https://www.biometric-residence-permit.service.gov.uk/collection/where вибравши опцію "<b>I don't know which Post Office I need to collect my BRP from</b>" і написавши в розділі коментарів "<b>my post office is permanently closed</b>":`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [
            Markup.button.callback(
              "У мене ще одна проблема з моїм BRP",
              "problem_visa_brp"
            ),
          ],
        ])
      );

      await ctx.telegram.sendPhoto(
        ctx.chat.id,
        "https://thriving-frangollo-33fd04.netlify.app/assets/brp_post_office_closed.png"
      );
    }
  );

  bot.hears(
    "Поштове відділення, де я маю забрати свій BRP, знаходиться занадто далеко",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Якщо ваше поштове відділення знаходиться занадто далеко</b>
        \nУ деяких випадках візова анкета не дозволяє українцям вказати адресу поштового відділення, де вони хочуть отримати BRP, і замість цього їм автоматично призначається поштове відділення (наприклад, десь у Лондоні, в той час як вони живуть зі спонсором у Ноттінгемі). Ці люди можуть змінити адресу доставки BRP тут: https://visa-address-update.service.gov.uk/`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [
            Markup.button.callback(
              "У мене ще одна проблема з моїм BRP",
              "problem_visa_brp"
            ),
          ],
        ])
      );
    }
  );

  bot.hears("Пошта відмовилася видати мені BRP", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо пошта відмовила вам у видачі BRP</b>
        \nПерш за все, зверніть увагу, що доросла людина може забрати BRP з поштового відділення лише особисто.  

        > Система видачі, доставки та отримання BRP побудована таким чином, що людина може отримати цю пластикову картку тільки особисто, і тільки після того, як вона фактично прибуде до Великої Британії. Тому немає сенсу отримувати візу "про всяк випадок", сподіваючись, що родичі або друзі отримають для вас BRP у Великобританії і відправлять її в Україну або іншу країну - зробити це не вдасться, і ви тільки витратите багато часу і сил. 
        
        Готуючись до походу на пошту, перевірте звичайні терміни отримання вашого BRP. Переконайтеся, що ви маєте при собі паспорт, дозвіл на в'їзд або візу-віньєтку - їх перевірять працівники поштового відділення.  
        
        Діти до 18 років можуть отримувати посилки тільки в супроводі відповідального дорослого, тому, якщо у вас є діти, візьміть їх з собою у відділення, коли будете отримувати свою посилку і посилку для них. 
        
        Якщо вам потрібно забрати відправлення без присутності дитини, вам потрібно призначити себе "відповідальною особою" за допомогою цієї форми https://www.biometric-residence-permit.service.gov.uk/someone-else/arrange, отримати лист-доручення від Home Office і забрати відправлення з ним.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );
  });

  bot.hears("Помилка у моєму BRP", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви помітили помилку після отримання вашого BRP</b>
        \nНаприклад, ваше ім'я, прізвище або дата народження написані неправильно) - ви повинні повідомити про це Home Office протягом 10 днів, заповнивши форму під кнопкою "Повідомити про проблему" тут: https://www.gov.uk/biometric-residence-permits/report-problem

        Якщо ви не зробите цього вчасно, вам доведеться подати заяву на заміну BRP за тією ж процедурою, що й у випадку втрати BRP.
        
        <b>Що не є помилкою:</b> 
        - Якщо дата закінчення терміну дії BRP - 31.12.2024, але ваша віза закінчується пізніше; з 2025 року імміграційний статус у Великій Британії буде підтверджуватися на 100% в електронному вигляді, і тому всі картки BRP закінчуються 31 грудня 2024 року або до цієї дати. UKVI оновить свою інформацію на сайті GOV.UK, щоб повідомити вам, що вам потрібно зробити на початку 2024 року. Вам не потрібно нічого робити зараз, і це не вплине на ваш імміграційний статус. Закінчення терміну дії вашої картки BRP до закінчення терміну дії вашого дозволу на перебування не змінює вашого права на роботу, доступ до послуг або пільг, або подорожі. 
        - Іноді місце народження в BRP написано по-різному: у деяких людей - UKR (Україна), в той час як інші можуть мати повну назву міста чи села, де вони народилися. Ми не знаємо, чому так відбувається, але такі розбіжності не є помилкою, і вам не варто про них турбуватися.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );
  });

  bot.hears("Втратив свій BRP", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Де ви загубили свій BRP?</b>`,
      Markup.inlineKeyboard([
        [Markup.button.callback("За межами Великої Британії", "lost_outside")],
        [Markup.button.callback("Усередині Великої Британії", "lost_inside")],
      ])
    );
  });

  bot.action("lost_outside", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви загубили свій BRP за межами Великобританії</b>
      \nТи мусиш:

      1. Повідомити про втрату BRP тут https://www.biometric-residence-permit.service.gov.uk/lost-stolen/where обравши опцію "Outside UK" 
      2. Подати заявку на отримання 'replacement BRP visa' на сайті https://visas-immigration.service.gov.uk/country-selection, яка дає право на одноразовий в'їзд до Великої Британії. Щоб отримати цю візу, вам потрібно заплатити 154 фунтів і здати біометричні дані у візовому центрі. 
      3. Після прибуття до Великої Британії подайте заявку на заміну BRP тут https://visas-immigration.service.gov.uk/product/biometric-residence-permit-replacement-service, заплатіть 38 фунтів стерлінгів і знову здайте біометричні дані (це коштує 132 фунти за візит). 
      
      Згідно з останніми даними Home Office, видача нової картки BRP замість втраченої займає приблизно 8 тижнів з моменту проходження біометрії у Великій Британії. Прискорити цей процес неможливо.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );

    ctx.answerCbQuery();
  });

  bot.action("lost_inside", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви втратили свій BRP і перебуваєте у Великобританії</b>
      \nТи мусиш:

      1. Повідомити про втрату вашого BRP тут https://www.biometric-residence-permit.service.gov.uk/lost-stolen/where і вибрати опцію "UK".  
      2. Потім вам потрібно подати заявку на заміну BRP тут https://visas-immigration.service.gov.uk/product/biometric-residence-permit-replacement-service, заплатити 38 фунтів стерлінгів і пройти біометричний контроль (який коштує 132 фунти за прийом):
      - Будьте уважні, в цій формі є питання "Чи визнані ви біженцем у Великій Британії, або вам надано гуманітарний захист з боку Великої Британії?", правильна відповідь для людей з "українськими" візами - "Ні", оскільки вони юридично не мають статусу "біженця" у Великій Британії. 
      - Якщо ви відповісте "Так", ви сплатите неправильну суму державного збору (130 фунтів), і ваша заява буде відхилена. 
      
      Згідно з останніми даними Home Office, видача нової картки BRP замість втраченої займає приблизно 8 тижнів з моменту проходження біометрії у Великій Британії. Прискорити цей процес неможливо.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );

    ctx.answerCbQuery();
  });

  bot.hears(
    "Потрібно виїхати з Великобританії до отримання BRP",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Чи можу я виїхати за межі Великобританії без BRP?</b>
      \nВраховуючи затримки з отриманням BRP, це питання хвилює багатьох. Ось цитата з Home Office з цього приводу: "Ви не повинні бронювати поїздки за межі Великої Британії, поки не отримаєте свій BRP. Це може означати, що ви не отримаєте свій BRP. Якщо ви не матимете при собі BRP під час подорожі, ви не зможете довести свій імміграційний статус у Великій Британії, і у вас можуть виникнути затримки на кордоні Великої Британії, коли ви повернетеся, поки триватиме подальша перевірка". - Тобто ми наполегливо рекомендуємо вам не виїжджати з Великої Британії, поки ви не отримаєте BRP для вашої "української" візи. 

      На практиці ви зможете виїхати з Великої Британії без BRP, оскільки це внутрішній документ, необхідний для перетину кордону Великої Британії для в'їзду. Жодна інша країна, окрім Великої Британії, не вимагає BRP для в'їзду і не визнає його як проїзний документ. 
      
      Однак у вас можуть виникнути проблеми, якщо ви захочете повернутися до Великої Британії пізніше без BRP. Розглянемо сценарій, коли ви виїхали з Великої Британії, а потім повернулися до Великої Британії з листом про дозвіл на в'їзд (з яким ви вже в'їжджали раніше):
      - Авіакомпанія може відмовити вам у посадці на рейс до Великої Британії, особливо якщо лист про дозвіл був отриманий давно, і ще більш ймовірно, якщо вони побачать у вашому паспорті штамп про те, що ви вже перетинали кордон Великої Британії раніше.  
      - Якщо авіакомпанія все ж пропустить вас, то у вас можуть виникнути питання на самому кордоні. Як мінімум, це може призвести до тривалої затримки при перетині кордону, а теоретично прикордонник має право відмовити вам у в'їзді.
      
      Ми знаємо, що багатьом людям з дійсною українською візою за Програмою вдалося повторно в'їхати до Великої Британії за допомогою BRP, але є також приклади людей, яким це не вдалося, в основному через відмови авіакомпаній у посадці на літак.
      Ніхто не може гарантувати, що ви зможете знову в'їхати до Великобританії. Оцініть свої ризики в разі відмови, такі як втрата авіаквитка та інші витрати (проїзд до аеропорту, готелю тощо). Розгляньте можливість подати заяву на 'replacement BRP visa', якщо вам потрібно повернутися до Великої Британії без BRP і ви не хочете ризикувати.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [
            Markup.button.callback(
              "У мене ще одна проблема з моїм BRP",
              "problem_visa_brp"
            ),
          ],
        ])
      );
    }
  );

  bot.action("brp_need_to_leave", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи можу я виїхати за межі Великобританії без BRP?</b>
      \nВраховуючи затримки з отриманням BRP, це питання хвилює багатьох. Ось цитата з Home Office з цього приводу: "Ви не повинні бронювати поїздки за межі Великої Британії, поки не отримаєте свій BRP. Це може означати, що ви не отримаєте свій BRP. Якщо ви не матимете при собі BRP під час подорожі, ви не зможете довести свій імміграційний статус у Великій Британії, і у вас можуть виникнути затримки на кордоні Великої Британії, коли ви повернетеся, поки триватиме подальша перевірка". - Тобто ми наполегливо рекомендуємо вам не виїжджати з Великої Британії, поки ви не отримаєте BRP для вашої "української" візи. 

      На практиці ви зможете виїхати з Великої Британії без BRP, оскільки це внутрішній документ, необхідний для перетину кордону Великої Британії для в'їзду. Жодна інша країна, окрім Великої Британії, не вимагає BRP для в'їзду і не визнає його як проїзний документ. 
      
      Однак у вас можуть виникнути проблеми, якщо ви захочете повернутися до Великої Британії пізніше без BRP. Розглянемо сценарій, коли ви виїхали з Великої Британії, а потім повернулися до Великої Британії з листом про дозвіл на в'їзд (з яким ви вже в'їжджали раніше):
      - Авіакомпанія може відмовити вам у посадці на рейс до Великої Британії, особливо якщо лист про дозвіл був отриманий давно, і ще більш ймовірно, якщо вони побачать у вашому паспорті штамп про те, що ви вже перетинали кордон Великої Британії раніше.  
      - Якщо авіакомпанія все ж пропустить вас, то у вас можуть виникнути питання на самому кордоні. Як мінімум, це може призвести до тривалої затримки при перетині кордону, а теоретично прикордонник має право відмовити вам у в'їзді.
      
      Ми знаємо, що багатьом людям з дійсною українською візою за Програмою вдалося повторно в'їхати до Великої Британії за допомогою BRP, але є також приклади людей, яким це не вдалося, в основному через відмови авіакомпаній у посадці на літак.
      Ніхто не може гарантувати, що ви зможете знову в'їхати до Великобританії. Оцініть свої ризики в разі відмови, такі як втрата авіаквитка та інші витрати (проїзд до аеропорту, готелю тощо). Розгляньте можливість подати заяву на 'replacement BRP visa', якщо вам потрібно повернутися до Великої Британії без BRP і ви не хочете ризикувати.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене ще одна проблема з моїм BRP",
            "problem_visa_brp"
          ),
        ],
      ])
    );

    ctx.answerCbQuery();
  });
};
