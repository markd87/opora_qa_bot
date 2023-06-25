const { Markup, Telegraf } = require("telegraf");

exports.visas = (bot) => {
  bot.action("visas", async (ctx) => {
    // clear keyboard
    // try {
    //   await ctx.editMessageReplyMarkup({
    //     reply_markup: { remove_keyboard: true },
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    await ctx.replyWithHTML(
      "<b>Візи до Великобританії</b>",
      Markup.removeKeyboard()
    );

    await ctx.replyWithHTML(
      `<b>Виберіть тему:</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Як обрати правильну візу до Великобританії",
            "right_visa"
          ),
        ],
        [
          Markup.button.callback(
            "Схема Homes for Ukraine (спонсорська допомога)",
            "homes_for_ukraine"
          ),
        ],
        [Markup.button.callback("Ukraine Family Scheme", "family_scheme")],

        [
          Markup.button.callback(
            "Ukraine Extension Scheme",
            "extension_scheme"
          ),
        ],
        [Markup.button.callback("Проблема з візою або BRP", "problem_visa")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("extension_scheme", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи відповідаєте ви всім вимогам по Ukraine Extension Scheme?</b>
    \n
    - ви є українцем або близьким членом сім'ї українця
    - ви мали дозвіл на перебування у Великій Британії з 18 березня 2022 року по 16 травня 2023 року або між цими датами - дозвіл не обов'язково повинен охоплювати весь період
    - ви раніше мали дозвіл на перебування у Великій Британії, термін дії якого закінчився 1 січня 2022 року або пізніше`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Так", "extension_scheme_yes")],
        [Markup.button.callback("Нi", "extension_scheme_no")],
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

  bot.action("extension_scheme_no", async (ctx) => {
    const keyboard = Markup.keyboard([
      [
        "Моя поточна віза до Великобританії починається після 16 травня 2023 року",
      ],
      ["Я перебуваю у Великобританії нелегально"],
      ['Я тут за однією з "українських" віз'],
    ])
      .resize()
      .oneTime();

    await ctx.replyWithHTML(
      `<b>Що найкраще описує вашу ситуацію?</b>`,
      keyboard
    );
  });

  //extension_scheme_no_visa_start
  bot.hears(
    "Моя поточна віза до Великобританії починається після 16 травня 2023 року",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Якщо ви отримали візу після 16 травня 2023 року</b>
      \nВи зможете подати заявку на Ukraine Extension Scheme, як тільки нові правила набудуть чинності в серпні.

      Вам слід зачекати, поки з'явиться більше інформації, перш ніж подавати заявку.
      
      Вам слід подумати, чи хочете ви зберегти свою поточну візу або перейти на Ukraine Extension Scheme. Ця віза наразі не веде до постійного проживання - це означає, що ви не зможете зарахувати час, проведений у Великій Британії за цією візою, як частину заяви на отримання безстрокового дозволу на перебування у Великій Британії в майбутньому.
      https://www.gov.uk/guidance/apply-to-stay-in-the-uk-under-the-ukraine-extension-scheme`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Ок", "OK")],
          [
            Markup.button.callback(
              "У мене є ще одне питання, пов'язане з візою.",
              "visas"
            ),
          ],
        ])
      );
    }
  );

  //stay_forever
  bot.hears('Я тут за однією з "українських" віз', async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Шлях до постійного проживання у Великобританії (ILR)?</b>
      \nНаразі офіційна позиція британського уряду полягає в тому, що візи Homes for Ukraine, Ukraine Family Scheme та Ukraine Extension Scheme не можуть бути продовжені і не зараховуються до періоду, необхідного для отримання посвідки на постійне проживання (ILR).  

      Шлях до постійного проживання https://www.gov.uk/indefinite-leave-to-remain лежить через:
      1. Перехід на візу, яка надає ILR (безстроковий дозвіл на проживання) через 3 або 5 років, це довгострокові робочі, сімейні або стартап візи  
      2. Постійне проживання тут легально протягом 10 років без перерв на будь-якому типі візи https://www.gov.uk/apply-indefinite-leave-to-remain-private-life

      Розглянемо найпопулярніший варіант - якщо у вас є затребувана професія і ви переходите на візу Skilled Worker (вимоги: https: https://bit.ly/3USJsu1)
       1. З моменту схвалення робочої візи починається відлік 5 років ILR
       2. Наприклад, якщо ваша робоча віза видана на 3 роки, вам доведеться продовжити її один раз (для ILR потрібно 5 років)
       3. Коли 5 років минули, ви з роботодавцем збираєте мега-пакет документів, платите ~2400 фунтів стерлінгів з людини за подачу заяви, здаєте іспит Life in the UK (приклад https://lifeintheuktestweb.co.uk/test-1/)
       4. Чекаєте на рішення ILR.

      Зверніть увагу, що візи, які ведуть до ILR, зазвичай забороняють доступ до будь-яких пільг і мають обмеження на час відсутності у Великобританії.`,
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
  });

  //immigration_lawyers
  bot.hears("Я перебуваю у Великобританії нелегально", async (ctx) => {
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
  });

  bot.action("immigration_lawyers", async (ctx) => {
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

  bot.action("lawyer", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Opora не надає направлень до імміграційних юристів</b>
      \nВи можете шукати варіанти через вашу особисту мережу, а офіційні рекомендації можна переглянути тут: https://www.gov.uk/find-an-immigration-adviser.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене є ще одне питання", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("visa_and_immigration", async (ctx) => {
    await ctx.replyWithHTML(
      `Зв'яжіться з UK Visa and Immigration тут https://www.gov.uk/contact-ukvi-inside-outside-uk`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене є ще одне питання", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("settled_uk_charity", async (ctx) => {
    await ctx.replyWithHTML(
      `Зв'яжіться з Settled UK (благодійна організація) тут: https://settled.org.uk/ukraine-ukr/`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене є ще одне питання", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("advice_project", async (ctx) => {
    await ctx.replyWithHTML(
      `Зв'яжіться з Ukraine Advice Project тут: https://www.advice-ukraine.co.uk/home/en/`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене є ще одне питання", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("extension_scheme_no_visa_start", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви отримали візу після 16 травня 2023 року</b>
      \nВи зможете подати заявку на Ukraine Extension Scheme, як тільки нові правила набудуть чинності в серпні.

      Вам слід зачекати, поки з'явиться більше інформації, перш ніж подавати заявку.
      
      Вам слід подумати, чи хочете ви зберегти свою поточну візу або перейти на Ukraine Extension Scheme. Ця віза наразі не веде до постійного проживання - це означає, що ви не зможете зарахувати час, проведений у Великій Британії за цією візою, як частину заяви на отримання безстрокового дозволу на перебування у Великій Британії в майбутньому.
      https://www.gov.uk/guidance/apply-to-stay-in-the-uk-under-the-ukraine-extension-scheme`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
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

  bot.action("extension_scheme_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Підготуйте візову анкету та подайте її на сайті gov.uk</b>
    \nПерейдіть на урядовий веб-сайт, щоб подати заявку на Ukraine Extension Scheme https://www.gov.uk/guidance/apply-to-stay-in-the-uk-under-the-ukraine-extension-scheme`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
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

  bot.action("stay_forever", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Шлях до постійного проживання у Великобританії (ILR)?</b>
      \nНаразі офіційна позиція британського уряду полягає в тому, що візи Homes for Ukraine, Ukraine Family Scheme та Ukraine Extension Scheme не можуть бути продовжені і не зараховуються до періоду, необхідного для отримання посвідки на постійне проживання (ILR).

      Шлях до постійного проживання https://www.gov.uk/indefinite-leave-to-remain лежить через:
      1. Перехід на візу, яка надає ILR (безстроковий дозвіл на проживання) через 3 або 5 років, це довгострокові робочі, сімейні або стартап візи  
      2. Постійне проживання тут легально протягом 10 років без перерв на будь-якому типі візи https://www.gov.uk/apply-indefinite-leave-to-remain-private-life

      Розглянемо найпопулярніший варіант - якщо у вас є затребувана професія і ви переходите на візу Skilled Worker (вимоги: https: https://bit.ly/3USJsu1)
       1. З моменту схвалення робочої візи починається відлік 5 років ILR
       2. Наприклад, якщо ваша робоча віза видана на 3 роки, вам доведеться продовжити її один раз (для ILR потрібно 5 років)
       3. Коли 5 років минули, ви з роботодавцем збираєте мега-пакет документів, платите ~2400 фунтів стерлінгів з людини за подачу заяви, здаєте іспит Life in the UK (приклад https://lifeintheuktestweb.co.uk/test-1/)
       4. Чекаєте на рішення ILR.

      Зверніть увагу, що візи, які ведуть до ILR, зазвичай забороняють доступ до будь-яких пільг і мають обмеження на час відсутності у Великобританії.`,
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

  bot.action("travel_outside", async (ctx) => {
    const keyboard = Markup.keyboard([
      [
        "У мене (або члена моєї сім'ї) є біометричний паспорт, але він продовжений",
      ],
      ["З біометричним паспортом у мене все гаразд, але я ще не маю BRP"],
      ["У мене (або члена моєї родини) є паспорт, але він не біометричний"],
      ["У мене (або члена моєї сім'ї) немає паспорта"],
    ])
      .resize()
      .oneTime();

    await ctx.replyWithHTML(
      `<b>Якщо ви українець і перебуваєте у Великобританії за однією з українських віз і вам потрібно виїхати за кордон, які проблеми у вас можуть виникнути?</b>
      \nДля подорожі вам потрібен український біометричний закордонний паспорт. Картка BRP  не замінює паспорт і не буде прийнята в якості проїзного документа.`,
      keyboard
    );
  });

  bot.hears(
    "З біометричним паспортом у мене все гаразд, але я ще не маю BRP",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Ви можете подорожувати країнами, які приймають небіометричні українські паспорти</b>
      \nПодорожувати за небіометричним українським паспортом можна через Молдову та Румунію. 

      Перед поїздкою перевірте умови подорожі на <a href="https://tripadvisor.mfa.gov.ua">сайті Міністерства закордонних справ України</a> та проконсультуйтеся з обраною вами авіакомпанією. 

      Бронюйте прямий рейс до Румунії або Молдови, уникаючи будь-яких зупинок в межах Шенгенської зони.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [Markup.button.callback("У мене єще одне питання.", "visas")],
        ])
      );
    }
  );

  bot.hears(
    "У мене (або члена моєї родини) є паспорт, але він не біометричний",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Ви можете подорожувати країнами, які приймають небіометричні українські паспорти</b>
      \nПодорожувати за небіометричним українським паспортом можна через Молдову та Румунію. 

      Перед поїздкою перевірте умови подорожі на <a href="https://tripadvisor.mfa.gov.ua">сайті Міністерства закордонних справ України</a> та проконсультуйтеся з обраною вами авіакомпанією. 

      Бронюйте прямий рейс до Румунії або Молдови, уникаючи будь-яких зупинок в межах Шенгенської зони.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [Markup.button.callback("У мене єще одне питання.", "visas")],
        ])
      );
    }
  );

  bot.hears(
    "У мене (або члена моєї сім'ї) є біометричний паспорт, але він продовжений",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Для подорожей приймаються біометричні паспорти з продовженим терміном дії</b>
      \nПодорожу за біометричним українським паспортом з офіційною відміткою про продовження терміну дії.

      Перед поїздкою перевірте умови подорожі на <a href="https://tripadvisor.mfa.gov.ua">сайті Міністерства закордонних справ України</a> та проконсультуйтеся з обраною вами авіакомпанією.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [Markup.button.callback("У мене єще одне питання.", "visas")],
        ])
      );
    }
  );

  bot.hears("У мене (або члена моєї сім'ї) немає паспорта", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Залежно від терміновості вашої подорожі ви можете подати заяву на отримання нового паспорта або скористатися альтернативними варіантами</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Надзвичайна ситуація",
            "no_passport_emergency"
          ),
        ],
        [
          Markup.button.callback(
            "Я поспішаю, мені потрібно поїхати в найближчі місяць-два",
            "no_passport_hurry"
          ),
        ],
        [
          Markup.button.callback(
            "Я не поспішаю. Моя подорож запланована через кілька місяців.",
            "no_passport_not_hurry"
          ),
        ],
      ])
    );
  });

  bot.action("no_passport_not_hurry", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Мені потрібно поїхати в Україну з Великобританії, у мене немає паспорта і я не поспішаю</b>
      \nЗверніться за новим паспортом до консульства України в Лондоні або Единбурзі. Подати заяву в обох консульствах можна лише за попереднім записом. Можливі окремі винятки. Записатися на прийом можна тут: https://online.mfa.gov.ua/application. Слідкуйте за оновленнями від Лондонського консульства тут: https://t.me/UAConsulUK

      Слоти для подачі документів регулярно звільняються, але, як правило, в майбутньому (2-3 місяці). На виготовлення та доставку паспорта може знадобитися кілька місяців, після чого вам також потрібно буде забрати його з консульства.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене єще одне питання.", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("no_passport_hurry", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Мені потрібно поїхати в Україну з Великобританії, у мене немає закордонного паспорта, але мені потрібно поїхати найближчим часом</b>
      \nПодати заяву на отримання посвідки на повернення до України (білого паспорта). Це дозволить подорожувати в Україну, однак лише через невелику кількість країн.  

      Подача заяви вимагає бронювання місця в консульстві, див. тут: https://online.mfa.gov.ua/application and more information here: https://uk.mfa.gov.ua/konsulysyki-pitannya/pasportni-diyi/posvidchennya-na-povernennya-v-ukrayinu
      
      Такий дозвіл може бути виданий того ж дня.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене єще одне питання.", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("no_passport_emergency", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>У вас немає закордонного паспорта і вам потрібно терміново поїхати в Україну</b>
      \nУ вас можуть бути термінові причини для подорожі. У такому випадку "білий паспорт" (дозвіл на в'їзд в Україну, https://uk.mfa.gov.ua/konsulysyki-pitannya/pasportni-diyi/posvidchennya-na-povernennya-v-ukrayinu) є більш доречним, ніж оформлення нового паспорта.

      Ми рекомендуємо звертатися безпосередньо до консульства, оскільки "білий паспорт" все одно вимагає попереднього запису на прийом, який може бути недоступним протягом декількох днів.

      Контактні дані консульства внизу сторінки: https://uk.mfa.gov.ua/konsulysyki-pitannya/pasportni-diyi/posvidchennya-na-povernennya-v-ukrayinu`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене єще одне питання.", "visas")],
      ])
    );
  });

  //
  bot.action("valid_non_biometric_passport", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви не можете скористатися додатком ID Check і маєте дійсний український закордонний паспорт</b>
      \nВам не потрібно відвідувати візовий центр для здачі біометричних даних. Замість цього ви повинні надати свої біометричні дані протягом шести місяців після прибуття до Великої Британії.
  
      Під час подання заяви обов'язково завантажте копію сторінки з фотографією вашого паспорта. Залежно від країни, в якій ви подаєте заяву, ви можете зробити це за допомогою додатку для завантаження документів, наданого комерційним партнером Міністерства внутрішніх справ - TLS або VFS. Завантажте додаток з веб-сайту TLS або VFS, коли ви починаєте подавати заяву.
      
      Якщо вам потрібна допомога у завантаженні документів, ви можете записатися на прийом до візового центру.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "valid_iphone_continue")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("valid_non_biometric_passport", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви можете підтвердити свою особу за допомогою додатку ID Check</b>
      \nВи можете скористатися додатком "UK Immigration: ID check", щоб підтвердити свою особу, якщо у вас є дійсний український біометричний закордонний паспорт. Вам не потрібно відвідувати візовий центр, щоб здати біометричні дані або подавати заяву на продовження перебування після прибуття до Великої Британії.

      Якщо ваш спонсор подає заяву від вашого імені, вам все одно потрібно буде використовувати додаток для підтвердження вашої особи. Після того, як ваш спонсор створить дані вашого облікового запису онлайн, він отримає інструкції, як почати користуватися додатком.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Продовжити",
            "valid_biometric_passport_continue"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  // become_sponsor
  bot.hears("Як вони можуть стати моїм спонсором?", async (ctx) => {
    const keyboard = Markup.keyboard([
      ["Чи можу я стати спонсором?"],
      ["Що відбувається після подання заявки"],
      ["Вашому гостю Homes for Ukraine було відмовлено у видачі візи"],
    ])
      .resize()
      .oneTime();

    await ctx.replyWithHTML(
      `<b>Про що ваше питання?</b>`,
      keyboard,
      Markup.removeKeyboard()
    );
  });

  bot.action("become_sponsor", async (ctx) => {
    const keyboard = Markup.keyboard([
      ["Чи можу я стати спонсором?"],
      ["Що відбувається після подання заявки"],
      ["Вашому гостю Homes for Ukraine було відмовлено у видачі візи"],
    ])
      .resize()
      .oneTime();

    await ctx.replyWithHTML(`<b>Про що ваше питання?</b>`, keyboard);
  });

  // guest_visa_refused
  bot.hears(
    "Вашому гостю Homes for Ukraine було відмовлено у видачі візи",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Вашому гостю Homes for Ukraine було відмовлено у видачі візи</b>
      \nЩоб зрозуміти причину відмови у видачі візи вашому гостю, уважно перегляньте розділ "Reasons for Refusal" в його електронному листі "Application Update". 

      Це дасть вам уявлення про конкретні проблеми, які призвели до відмови, і допоможе врахувати їх при наступних спробах подати заяву.`,
        Markup.inlineKeyboard([
          [
            Markup.button.callback(
              `Написано, що "sponsor doesn't meet the requirements"`,
              "sposnor_doesnt_meet_requirements"
            ),
          ],
          [
            Markup.button.callback(
              "Мої гості не отримали жодної відповіді на свої візові заяви",
              "problem_visa_delayed"
            ),
          ],
          [
            Markup.button.callback(
              "Інша причина відмови",
              "homes_for_ukraine_refused"
            ),
          ],
        ])
      );
    }
  );

  bot.action("guest_visa_refused", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Вашому гостю Homes for Ukraine було відмовлено у видачі візи</b>
      \nЩоб зрозуміти причину відмови у видачі візи вашому гостю, уважно перегляньте розділ "Reasons for Refusal" в його електронному листі "Application Update". 

      Це дасть вам уявлення про конкретні проблеми, які призвели до відмови, і допоможе врахувати їх при наступних спробах подати заяву.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            `Написано, що "sponsor doesn't meet the requirements"`,
            "sposnor_doesnt_meet_requirements"
          ),
        ],
        [
          Markup.button.callback(
            "Мої гості не отримали жодної відповіді на свої візові заяви",
            "problem_visa_delayed"
          ),
        ],
        [
          Markup.button.callback(
            "Інша причина відмови",
            "homes_for_ukraine_refused"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("sposnor_doesnt_meet_requirements", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви не були схвалені як спонсор</b>
      \nякщо ви бачите цю причину відмови в оновленні їхньої заявки, це означає, що <b>вас не було схвалено як спонсора</b>. 

      Найпопулярніші **причини, що призводять до такого рішення**:
      - ваш гість не зміг довести ваш імміграційний статус, наприклад, не завантажив копію британського паспорта, BRP або іншого підтвердження імміграційного статусу
      - рада дійшла висновку, що ваше житло не відповідає вимогам (переповнене або недоступне щонайменше 6 місяців).
      - Записи Міністерства внутрішніх справ свідчать про численні заяви на спонсорство, подані з вашою участю, і підозри на шахрайство.
      
      Перевірте <a href="https://www.gov.uk/guidance/eligibility-safeguarding-dbs-and-accommodation-checks-homes-for-ukraine#eligibility-and-checks">урядовий веб-сайт</a> для отримання більш детальної інформації про право на спонсорство.
      
      Якщо ви вважаєте, що можете вирішити проблему, ваш гість може повторно подати заяву на візу, вказавши вас як свого спонсора. Якщо ж ні, йому доведеться шукати іншого спонсора.
      
      Якщо вам потрібна допомога, зверніться до Служби віз та імміграції Великої Британії: **+44 808 164 8810** (з понеділка по п'ятницю, з 9:00 до 17:30, дзвінки безкоштовні)`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Як вони знаходять іншого спонсора?",
            "how_find_sponsor"
          ),
        ],
        [
          Markup.button.callback(
            "Ми виправили проблему і хочемо подати заявку повторно",
            "apply_home_for_ukraine"
          ),
        ],
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою",
            "visas"
          ),
        ],
      ])
    );

    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      "https://thriving-frangollo-33fd04.netlify.app/assets/sponsor_dosnt_meet_req.jpeg.jpeg"
    );
  });

  // what_happens_after_application

  bot.hears("Що відбувається після подання заявки", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Що відбувається після подання заявки?</b>
      \nДля того, щоб ваша гостьова віза була схвалена, вам потрібно буде пройти наступні перевірки:

      <b>1.перевірка безпеки та судимості, також відома як DBS Check</b>

      Ви (головний спонсор) та всі повнолітні особи віком від 18 років, які проживатимуть в одному домогосподарстві з гостями, повинні пройти перевірку DBS Check. Якщо ви не згодні на це, ви не зможете стати спонсором.

      Ваша місцева рада вирішить, який тип перевірки DBS необхідний, і ініціює її проведення. Ці перевірки є безкоштовними.

      <b>2. перевірка вашого житла, щоб переконатися, що воно підходить для всіх ваших гостей</b>
      
      Місцева рада здійснить щонайменше один особистий візит, щоб перевірити, чи підходить ваше житло для всіх гостей. Якщо в результаті цих перевірок ви не відповідаєте вимогам придатності бути спонсором, розгляд візової заяви може бути призупинено, а гостю будуть запропоновані інші варіанти, якщо віза ще не була видана.`,
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
  });

  bot.action("what_happens_after_application", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Що відбувається після подання заявки?</b>
      \nДля того, щоб ваша гостьова віза була схвалена, вам потрібно буде пройти наступні перевірки:

      <b>1.перевірка безпеки та судимості, також відома як DBS Check</b>

      Ви (головний спонсор) та всі повнолітні особи віком від 18 років, які проживатимуть в одному домогосподарстві з гостями, повинні пройти перевірку DBS Check. Якщо ви не згодні на це, ви не зможете стати спонсором.

      Ваша місцева рада вирішить, який тип перевірки DBS необхідний, і ініціює її проведення. Ці перевірки є безкоштовними.

      <b>2. перевірка вашого житла, щоб переконатися, що воно підходить для всіх ваших гостей</b>

      Місцева рада здійснить щонайменше один особистий візит, щоб перевірити, чи підходить ваше житло для всіх гостей. Якщо в результаті цих перевірок ви не відповідаєте вимогам придатності бути спонсором, розгляд візової заяви може бути призупинено, а гостю будуть запропоновані інші варіанти, якщо віза ще не була видана.`,
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

  // can_become_sponsor
  bot.hears("Чи можу я стати спонсором?", async (ctx) => {
    const keyboard = Markup.keyboard([
      ["Я живу зі спонсором"],
      ["Орендую приватне житло / Орендую комунальне житло"],
      ["У мене власне житло"],
      ["Нічого з перерахованого вище"],
    ])
      .resize()
      .oneTime();

    await ctx.replyWithHTML(`<b>Чи можу я стати спонсором?</b>`, keyboard);
  });

  bot.action("can_become_sponsor", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи можу я стати спонсором?</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Орендую приватне житло / Орендую комунальне житло",
            "rent"
          ),
        ],
        [Markup.button.callback("У мене власне житло", "own_house")],
        [Markup.button.callback("Я живу зі спонсором", "live_with_sponsor")],
        [
          Markup.button.callback(
            "Нічого з перерахованого вище",
            "unfortunatley_cannot"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.hears(
    [
      "Орендую приватне житло / Орендую комунальне житло",
      "У мене власне житло",
    ],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Ви легально проживаєте у Великобританії?</b>
      \nЩоб стати спонсором, ви повинні довести, що ви
      - легально проживаєте у Великій Британії, і
      - ваш дозвіл на перебування у Великобританії дійсний протягом <b>6 місяців або довше</b>.

      Докази:
      - Британський паспорт,
      - BRP (біометричний дозвіл на проживання) або
      - інші документи, що підтверджують імміграційний статус.

      https://www.gov.uk/guidance/eligibility-safeguarding-dbs-and-accommodation-checks-homes-for-ukraine#eligibility-and-checks

      Ви <b>ЗОБОВ'ЯЗАНІ</b> надати копії цих документів разом із заявою.

      ПРИМІТКА: Якщо ви є громадянином Великобританії, але не проживаєте у Великобританії - ви не можете бути спонсором.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Так", "rent_own_yes")],
          [Markup.button.callback("Нi", "rent_own_no")],
        ])
      );
    }
  );

  bot.action(["rent", "own_house"], async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви легально проживаєте у Великобританії?</b>
      \nЩоб стати спонсором, ви повинні довести, що ви
      - легально проживаєте у Великій Британії, і 
      - ваш дозвіл на перебування у Великобританії дійсний протягом <b>6 місяців або довше</b>. 
      
      Докази: 
      - Британський паспорт, 
      - BRP (біометричний дозвіл на проживання) або 
      - інші документи, що підтверджують імміграційний статус.
      
      https://www.gov.uk/guidance/eligibility-safeguarding-dbs-and-accommodation-checks-homes-for-ukraine#eligibility-and-checks
      
      Ви <b>ЗОБОВ'ЯЗАНІ</b> надати копії цих документів разом із заявою.
      
      ПРИМІТКА: Якщо ви є громадянином Великобританії, але не проживаєте у Великобританії - ви не можете бути спонсором.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Так", "rent_own_yes")],
        [Markup.button.callback("Нi", "rent_own_no")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("rent_own_no", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>На жаль, ви не можете бути спонсором</b>
      \nВи можете спробувати знайти для них відповідного спонсора - будь ласка, [прочитайте нашу статтю](https://ua.opora.uk/blog/yakim-chinom-ukrayincyam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk) для більш детальної інформації`,
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

  bot.action("rent_own_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи є у вас житло для вашого гостя?</b>
      \nЩоб стати спонсором, ви повинні довести, що ви:
      - Маєте достатньо просторе та безпечне житло, щоб прийняти всіх гостей, яких ви спонсоруєте, [не створюючи при цьому перенаселення](https://bit.ly/3Cf0BGN). 
      - Гарантувати, що це житло буде доступне протягом 6 місяців або довше.
      
      Вам потрібно буде надати наступні докази: 
      - договір про оренду житла та 
      - лист від орендодавця про згоду на розміщення додаткових осіб у помешканні (якщо ви орендуєте житло у місцевої ради/житлової асоціації, орендодавцем є ваша рада/житлова асоціація)
      
      Дізнайтеся більше про <a href="https://bit.ly/3P43UIw">вимоги до житла</a>`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Так", "accomadation_guest_yes")],
        [Markup.button.callback("Нi", "accomadation_guest_no")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("accomadation_guest_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Для кого ви збираєтеся бути спонсором?</b>`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Дорослі", "accomadation_guest_yes_adult")],
        [
          Markup.button.callback(
            "Дитина до 18 років",
            "accomadation_guest_yes_child"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("accomadation_guest_yes_adult", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи відповідає ця особа всім вимогам?</b>
      \n1. Є громадянином України або близьким родичем громадянина України, який вже отримав спонсорську візу або подає заяву на отримання такої візи та відповідає її критеріям. https://www.gov.uk/guidance/apply-for-a-visa-under-the-ukraine-sponsorship-scheme.uk#section-1
      2.  Постійно проживав в Україні станом на 1 січня 2022 року.
      3. Наразі перебуває за межами Великої Британії.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Так",
            "accomadation_guest_yes_adult_meets_yes"
          ),
        ],
        [Markup.button.callback("Нi", "accomadation_guest_yes_adult_meets_no")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("accomadation_guest_yes_adult_meets_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви можете стати їхнім спонсором</b>
      \nЇм потрібно подати заявку на Homes for Ukraine.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "apply_home_for_ukraine")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("accomadation_guest_yes_adult_meets_no", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Вони не мають права на отримання візи Homes for Ukraine </b>
      \nЇм потрібно подати заявку на Homes for Ukraine.`,
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

  bot.action("accomadation_guest_yes_child", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Які у вас стосунки з дитиною, яку ви збираєтеся спонсорувати?</b>
      \nПерейдіть за посиланням https://www.gov.uk/guidance/apply-for-a-visa-under-the-ukraine-sponsorship-scheme.uk#applicants-aged-under-18`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Я батько",
            "accomadation_guest_yes_child_parent"
          ),
        ],
        [
          Markup.button.callback(
            "Я законний опікун",
            "accomadation_guest_yes_child_legal"
          ),
        ],
        [
          Markup.button.callback(
            "Нічого з перерахованого вище",
            "accomadation_guest_yes_child_none"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action(
    [
      "accomadation_guest_yes_child_parent",
      "accomadation_guest_yes_child_legal",
    ],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Подайте заявку Homes for Ukraine на ім'я дитини</b>
      \nДіти до 18 років можуть подати заяву на вступ разом з батьками або законними опікунами що вже перебувають у Великій Британії. 

      Якщо дитина подає заяву на в'їзд з батьками або законними опікунами, батьки або законні опікуни також повинні
      - приїхати, щоб зустріти дитину до від'їзду, а потім разом приїхати до Великої Британії
      - забрати дитину з аеропорту, порту, залізничного вокзалу або іншого пункту в'їзду до Сполученого Королівства
      
      Уряд рекомендує, щоб діти не подорожували через Кале, Кокелль або Дюнкерк без батьків або законних опікунів.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Продовжити", "apply_home_for_ukraine")],
        ])
      );
      ctx.answerCbQuery();
    }
  );

  bot.action("accomadation_guest_yes_child_none", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи відповідає дитина всім цим вимогам?</b>
      \nЩоб мати право на участь, дитина повинна мати:

      - підтвердження згоди батьків або законних опікунів, нотаріально завірене або засвідчене службою опіки та піклування міської або обласної ради в Україні; або, якщо дитина перебуває в іншій країні, нотаріально завірене в нотаріальній конторі цієї країни або в посольстві чи консульстві України в цій країні.
      
      - підтвердження згоди батьків або законних опікунів на надання спонсорської допомоги
      
      - зобов'язання спонсорувати дитину протягом 3 років або до досягнення дитиною 18 років (за умови, що спонсорство триває не менше 6 місяців)
      
      - затвердження договору про спонсорство місцевою радою, де буде проживати дитина.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Так",
            "accomadation_guest_yes_child_none_yes"
          ),
        ],
        [Markup.button.callback("Нi", "unfortunatley_cannot")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.hears(
    ["Я живу зі спонсором", "Нічого з перерахованого вище"],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>На жаль, ви не можете бути спонсором</b>
      \nВи можете спробувати знайти для них відповідного спонсора - будь ласка, <a href="https://ua.opora.uk/blog/yakim-chinom-ukrayincyam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk">прочитайте нашу статтю</a> для більш детальної інформації`,
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
    }
  );

  bot.action(
    ["live_with_sponsor", "unfortunatley_cannot", "accomadation_guest_no"],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>На жаль, ви не можете бути спонсором</b>
      \nВи можете спробувати знайти для них відповідного спонсора - будь ласка, <a href="https://ua.opora.uk/blog/yakim-chinom-ukrayincyam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk">прочитайте нашу статтю</a> для більш детальної інформації`,
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
    }
  );

  bot.action("accomadation_guest_yes_child_none_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи можете ви довести, що були особисто знайомі з батьками або законним представником дитини до 24 лютого 2022 року?</b>
      \nЩоб бути затвердженим спонсором для дитини без супроводу, ви повинні довести, що
      - ви особисто знали батьків або законних опікунів дитини (НЕ тих, з ким ви знайомі лише онлайн, через соціальні мережі)
      - ви були знайомі з ними до 24 лютого 2022 року.

      Рада шукатиме докази того, що між вами та батьками або законним опікуном існують відповідні, попередні стосунки. Ці докази можуть бути у формі листів або електронних повідомлень, фотографій або активності в соціальних мережах до 24 лютого 2022 року.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Так",
            "accomadation_guest_yes_child_none_yes_prove_yes"
          ),
        ],
        [Markup.button.callback("Нi", "unfotunatley_cannot")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("accomadation_guest_yes_child_none_yes_prove_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви можете бути схвалені як їхній спонсор, але після додаткових перевірок</b>
      \Будь ласка, уважно прочитайте [цю інструкцію](https://www.gov.uk/guidance/homes-for-ukraine-guidance-for-sponsors-children-and-minors-applying-without-parents-or-legal-guardians#overview-and-purpose-of-this-guidance) та проконсультуйтеся на гарячій лінії Homes for Ukraine +44 808 164 8810, якщо у вас виникнуть запитання.`,
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
