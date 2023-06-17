const { Markup } = require("telegraf");

exports.visas = (bot) => {
  bot.action("visas", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Виберіть тему:</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Виберіть правильну візу до Великобританії",
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
        [
          Markup.button.callback(
            "Як залишитися у Великобританії назавжди",
            "stay_forever"
          ),
        ],
        [
          Markup.button.callback(
            "Подорожі за межі Великобританії",
            "travel_outside"
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
    \n- ви є українцем або близьким членом сім'ї українця
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
    await ctx.replyWithHTML(
      `<b>Що найкраще описує вашу ситуацію?</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Моя поточна віза до Великобританії починається після 16 травня 2023 року",
            "extension_scheme_no_visa_start"
          ),
        ],
        [
          Markup.button.callback(
            "Я перебуваю у Великобританії нелегально",
            "immigration_lawyers"
          ),
        ],
        [
          Markup.button.callback(
            'Я тут за однією з "українських" віз',
            "stay_forever"
          ),
        ],
        [
          Markup.button.callback(
            'Я тут за однією з "українських" віз',
            "extension_scheme_no_visa"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
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
    await ctx.replyWithHTML(
      `<b>Якщо ви українець і перебуваєте у Великобританії за однією з українських віз і вам потрібно виїхати за кордон, які проблеми у вас можуть виникнути?</b>
      \nДля подорожі вам потрібен український біометричний закордонний паспорт. Картка BRP  не замінює паспорт і не буде прийнята в якості проїзного документа.`,
      Markup.keyboard([
        [
          Markup.button.callback(
            "У мене (або члена моєї сім'ї) є біометричний паспорт, але він продовжений",
            "i_have_biometric"
          ),
        ],
        [
          Markup.button.callback(
            "З біометричним паспортом у мене все гаразд, але я ще не маю BRP",
            "brp_need_to_leave"
          ),
        ],
        [
          Markup.button.callback(
            "У мене (або члена моєї родини) є паспорт, але він не біометричний",
            "not_biometric"
          ),
        ],
        [
          Markup.button.callback(
            "У мене (або члена моєї сім'ї) немає паспорта",
            "no_passport"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
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
      Markup.keyboard([
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
      Markup.keyboard([
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
      Markup.keyboard([
        [Markup.button.callback("Гаразд, це все.", "OK")],
        [Markup.button.callback("У мене єще одне питання.", "visas")],
      ])
    );
    ctx.answerCbQuery();
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

  // become_spo
  // bot.hears("Як вони можуть стати моїм спонсором?",
  // )

  // bot.action("become_sponsor", async (ctx) => {
  //   await ctx.replyWithHTML(
  //     `<b>Про що ваше питання?</b>`,
  //     Markup.inlineKeyboard([
  //       [
  //         Markup.button.callback(
  //           "Продовжити",
  //           "valid_biometric_passport_continue"
  //         ),
  //       ],
  //     ])
  //   );
  //   ctx.answerCbQuery();
  // });
};
