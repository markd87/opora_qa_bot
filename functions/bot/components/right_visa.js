const { Markup } = require("telegraf");

exports.right_visa = (bot) => {
  bot.action("right_visa", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Яка мета вашого візиту до Великобританії?</b>`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Втеча від війни в Україні", "fleeing_war")],
        [Markup.button.callback("Робота у Великобританії", "work_uk")],
        [Markup.button.callback("Короткий візит до сім'ї або друзів", "visit")],
        [
          Markup.button.callback(
            "Я вже у Великобританії і хочу залишитися",
            "want_to_stay" //done
          ),
        ],
        [Markup.button.callback("Інше призначення", "other_purpose")], //done
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("work_uk", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Робочі візи</b>
      \nПерейдіть на урядовий сайт, щоб перевірити варіанти отримання робочої візи https://www.gov.uk/browse/visas-immigration/work-visas`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("fleeing_war", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Яка українська візова схема вас цікавить?</b>
      \nВеликобританія запровадила 3 різні програми для українців, щоб підтримати тих, хто бажає приїхати до Сполученого Королівства або залишитися у ньому:
      - Ukraine Family Scheme - якщо у вас є родич, який має право постійного проживання у Великій Британії 
      - Homes for Ukraine - якщо ви хочете приїхати до спонсора на 6 місяців або довше
      - Ukraine Extension Scheme - якщо ви вже перебуваєте у Великій Британії і хочете продовжити своє перебування`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ukraine Family Scheme", "family_scheme")],
        [Markup.button.callback("Homes for Ukraine", "homes_for_ukraine")],
        [
          Markup.button.callback(
            "Ukraine Extension Scheme",
            "extension_scheme"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("family_scheme", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>У вас є родичі у Великобританії?</b>
      \nЧлен вашої сім'ї, що проживає у Великобританії, повинен бути однією з таких осіб:

      <b>1. Найближчий родич</b>
      Найближчими родичами є особи, які мають таку ступінь спорідненості з вами або з вашим родичем у Великій Британії:
      - чоловік, дружина або цивільний партнер
      - неодружений партнер (ви повинні спільно проживати та перебувати у відносинах як мінімум 2 роки)
      - дитина віком до 18 років
      - батько або мати (якщо вам ще немає 18 років)
      - наречений, наречена або майбутній цивільний партнер
      
      <b>2. Прямий родич</b>
      Прямими родичами є особи, які мають таку ступінь спорідненості з вашим родичем у Великій Британії:
      - батько або мати (якщо вам більше за 18 років)
      - дитина віком більше за 18 років
      - дідусь або бабуся
      - онук/онука або онук/онука вашого партнера
      - брат або сестра
      - тітка або дядько
      - племінник або племінниця
      - двоюрідний брат або двоюрідна сестра
      - теща або тесть, свекор або свекруха
      - дідусь або бабуся з боку дружини або чоловіка
      - брат або сестра з боку дружини або чоловіка
      
      <b>3. Чоловік, дружина або цивільний партнер, неодружений партнер, дитина, мати, батько або наречений, наречена чи цивільний партнер вашого прямого родича</b>
      
      Якщо ваш родич у Великій Британії доводиться вам (або будь-якому прямому родичу) дружиною, чоловіком, цивільним партнером, нареченою, нареченим або майбутнім цивільним партнером, ці стосунки мали розпочатися до 1 січня 2022 року.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Так", "family_scheme_yes")],
        [Markup.button.callback("Нi", "homes_for_ukraine")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("family_scheme_yes", async (ctx) => {
    const keyboard = Markup.keyboard([
      ["У них Ukraine Extension Scheme Visa"],
      ["Вони перебувають тут по візі Ukraine Family Scheme"],
      [
        "Вони перебувають у Великобританії легально, але за іншою візою (напр., студентською, робочою або подружжя)",
      ],
      ["Вони перебувають у Великобританії нелегально"],
      ["Вони перебувають тут за спонсорською візою (Homes for Ukraine)"],
      ["Вони мають settled або pre-settled статус"],
      ["Вони є громадянами Великої Британії"],
    ])
      .resize()
      .oneTime();

    await ctx.replyWithHTML(
      `<b>Який їхній імміграційний статус у Великій Британії?</b>
      \nПерейдіть на урядовий сайт, щоб перевірити варіанти отримання робочої візи https://www.gov.uk/browse/visas-immigration/work-visas`,
      keyboard
    );
  });

  //   they british or pre_settled
  bot.hears(
    [
      "Вони є громадянами Великої Британії",
      "Вони мають settled або pre-settled статус",
    ],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Член Вашої родини може запросити Вас по візі Ukraine Family Scheme</b>`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Продовжити", "apply_ukraine_family_scheme")],
        ])
      );
    }
  );

  //   they_sponsorhip or they_extension or they_family_scheme
  bot.hears(
    [
      "Вони перебувають тут за спонсорською візою (Homes for Ukraine)",
      "У них Ukraine Extension Scheme Visa",
      "Вони перебувають тут по візі Ukraine Family Scheme",
    ],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Член вашої родини НЕ МОЖЕ запросити вас по візі Ukraine Family Scheme.</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Ваш член сім'ї може або знайти відповідного спонсора для вас, або сам стати вашим спонсором. 
        Це дозволить вам подати заяву на отримання Homes for Ukraine (спонсорської) візи.`,
        Markup.inlineKeyboard([
          [
            Markup.button.callback(
              "Як вони можуть стати моїм спонсором?",
              "become_sponsor"
            ),
          ],
          [
            Markup.button.callback(
              "Як їм знайти для мене спонсора?",
              "how_find_sponsor"
            ),
          ],
        ])
      );
    }
  );

  //   they_illegal
  bot.hears("Вони перебувають у Великобританії нелегально", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ваш член сім'ї не може запросити вас, якщо він перебуває у Великобританії нелегально</b>`,
      Markup.removeKeyboard()
    );

    await ctx.replyWithHTML(
      `Вам потрібно знайти спонсора, щоб приїхати до Великобританії.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "homes_for_ukraine")],
      ])
    );
  });

  //   they_different_visa
  bot.hears(
    "Вони перебувають у Великобританії легально, але за іншою візою (напр., студентською, робочою або подружжя)",
    async (ctx) => {
      const keyboard = Markup.keyboard([
        ["Як їм знайти для мене спонсора?"],
        ["Як вони можуть стати моїм спонсором?"],
        [
          "Чи існують інші шляхи до возз'єднання сім'ї, якщо вони не можуть мене спонсорувати або знайти мені спонсора?",
        ],
      ])
        .resize()
        .oneTime();

      await ctx.replyWithHTML(
        `<b>Член вашої родини НЕ МОЖЕ запросити вас по візі Ukraine Family Scheme</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Члени Вашої родини НЕ МОЖУТЬ запросити Вас по Українській сімейній програмі, якщо вони не мають типу/статусу візи, перелічених тут: https://www.gov.uk/guidance/apply-for-a-ukraine-family-scheme-visa.uk#section-1

        Член Вашої родини може або знайти для Вас відповідного спонсора, або сам стати Вашим спонсором. 
        
        Це дозволить Вам подати заяву на отримання візи Homes for Ukraine (спонсорської).`,
        keyboard
      );
    }
  );

  bot.hears(
    "Чи існують інші шляхи до возз'єднання сім'ї, якщо вони не можуть мене спонсорувати або знайти мені спонсора?",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Перевірте, чи має ваш член сім'ї візу, яка дозволяє возз'єднання</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Якщо ви хочете возз'єднатися зі своєю сім'єю у Великобританії, але ні українська сімейна віза, ні українська спонсорська віза не є можливими, подумайте, чи має ваш член сім'ї тип візи, який дозволяє возз'єднання.

        Залежно від візового статусу вашого члена сім'ї у Великій Британії та ваших стосунків з ним, існує обмежений набір маршрутів для возз'єднання`,
        Markup.inlineKeyboard([
          [
            Markup.button.callback(
              "(Не українська) імейна віза",
              "non_ukranian_family_visa"
            ),
          ],
          [
            Markup.button.callback(
              "Віза утриманця (якщо член вашої родини має робочу візу)",
              "dependent_visa"
            ),
          ],
          [
            Markup.button.callback(
              "Ніщо з цього мені не підходить - мені потрібно більше інформації",
              "none_works"
            ),
          ],
        ])
      );
    }
  );

  bot.action("none_works", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо вам потрібна додаткова інформація про можливості в'їзду або проживання у Великій Британії, ось кілька джерел, які варто розглянути</b>
      \nВи (або член вашої родини у Великобританії) можете розглянути наступні варіанти:`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ukraine Advice Project", "advice_project")],
        [
          Markup.button.callback(
            "Settled UK (благодійна організація)",
            "settled_uk_charity"
          ),
        ],
        [
          Markup.button.callback(
            "UK Visa and Immigration",
            "visa_and_immigration"
          ),
        ],
        [Markup.button.callback("Юрист з питань імміграції", "lawyer")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("non_ukranian_family_visa", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>(Не українська) імейна віза</b>
      \nБільше інформації тут: https://www.gov.uk/uk-family-visa`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене є ще одне питання.", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("dependent_visa", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Віза для осіб, які перебувають на утриманні</b>
      \nЯкщо член вашої родини має робочу візу, ви можете подати заяву як його утриманці. Перевірте, чи дозволяє тип візи утриманців: https://www.gov.uk/browse/visas-immigration/work-visas`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене є ще одне питання.", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("visit", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Туристична (стандартна гостьова) віза</b>
      \nДля ділових поїздок або відвідування друзів чи родичів існує стандартна гостьова віза. Для її отримання потрібно виділити час і бюджет:
      - подати заяву можна лише у візовому центрі, оскільки потрібно здати біометричні дані (наприклад, у Києві чи Польщі)
      - рішення про видачу візи зараз приймається в середньому протягом 4 тижнів, але це може зайняти більше часу
      - Посилання для подачі заявки та всі умови описані тут: https://www.gov.uk/standard-visitor/apply-standard-visitor-visa
      - детальні вимоги до супровідних документів: https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents/guide-to-supporting-documents-visiting-the-uk
      - віза є багаторазовою і видається на 6 місяців, державне мито за видачу становить 100 фунтів (є довгострокові варіанти, вони дорожчі)
      
      <b>Мета візи та обмеження</b> Стандартна гостьова віза дозволяє відвідати Великобританію на короткий період часу в якості туриста, для відвідування родичів, для ділових зустрічей і короткострокових навчальних курсів. 
      - За цією візою суворо заборонено працювати, немає доступу до пільг, немає права на допомогу бездомним і дуже обмежений доступ до охорони здоров'я.
      - Тому, якщо візовий офіцер запідозрить, що ви маєте намір залишитися тут, працювати і т.д., це призведе до відмови у візі. А якщо ви надасте неправдиву інформацію про себе, вам заборонять в'їзд до Великобританії на 10 років.
      
      <b>Фінансові вимоги</b>>. Для отримання стандартної гостьової візи заявник подає виписку про рух коштів на рахунку за 6 місяців. Що важливо:
      - щомісячний дохід заявника повинен становити щонайменше половину передбачуваної загальної вартості поїздки до Великої Британії, 
      - мати заощадження, які щонайменше вдвічі перевищують загальну суму витрат на поїздку до Великої Британії. 
      - виписки з банківських рахунків показують регулярні надходження заробітної плати/доходу (а не лише одну велику суму грошей, покладену на рахунок перед подачею заяви на візу).
      Ці вимоги не описані чітко у візових правилах, але базуються на спостереженнях, зроблених під час розгляду листів про відмову у видачі візи.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("work", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Робочі візи</b>
      \nПерейдіть на урядовий сайт, щоб перевірити варіанти отримання робочої візи https://www.gov.uk/browse/visas-immigration/work-visas`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("want_to_stay", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи відповідаєте ви всім цим вимогам?</b>
      \n- ви є українцем або близьким членом сім'ї українця
      - ви мали дозвіл на перебування у Великій Британії з 18 березня 2022 року по 16 травня 2023 року або в період між цими датами - дозвіл не обов'язково повинен охоплювати весь період
      - ви раніше мали дозвіл на перебування у Великій Британії, термін дії якого закінчився 1 січня 2022 року або пізніше`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Так", "yes_meet_requirements")],
        [Markup.button.callback("Нi", "no_meet_requirements")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("yes_meet_requirements", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Підготуйте візову анкету та подайте її на сайті gov.uk</b>
      \nПерейдіть на урядовий веб-сайт, щоб подати заявку на Ukraine Extension Scheme https://www.gov.uk/guidance/apply-to-stay-in-the-uk-under-the-ukraine-extension-scheme.uk`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("other_purpose", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Перевірте доступні типи віз на сайті gov.uk</b>
      \nhttps://www.gov.uk/check-uk-visa`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "visas"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });
};
