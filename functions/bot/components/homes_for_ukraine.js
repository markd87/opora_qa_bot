const { Markup } = require("telegraf");

exports.homes_for_ukraine = (bot) => {
  bot.action("homes_for_ukraine", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Щоб приїхати до Великобританії за програмою "Homes for Ukraine" (спонсорства), вам потрібен спонсор</b>`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "У мене вже є спонсор. Що далі?",
            "already_have_sponsor"
          ),
        ],
        [Markup.button.callback("Я хочу стати спонсором", "become_sponsor")],
        [Markup.button.callback("Як знайти спонсора?", "how_find_sponsor")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("how_find_sponsor", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Як знайти спонсора?</b>
          \nЧитайте нашу статтю: https://ua.opora.uk/blog/yakim-chinom-ukrayincyam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk
    
          Приготуйтеся до довгих пошуків, оскільки у Великій Британії бракує справжніх спонсорів.
          
          Є шанс, що 1-2 справжні спонсори відгукнуться, якщо шукає жінка з 1-2 маленькими дітьми, або самотня жінка, або люди похилого віку, які шукають притулку, а тим більше, якщо вони з найнебезпечніших регіонів України.  У той час для самотнього чоловіка працездатного віку, який зараз перебуває в ЄС, шанси знайти спонсора близькі до нуля. 
          
          Також слід враховувати, що спонсори, які відгукуються зараз, навряд чи будуть з великих міст або півдня Англії. Більшість з них будуть з півночі Англії, Шотландії, Північної Ірландії та загалом з менших міст/містечок чи сіл. Саме там все ще є люди, які мають достатньо великі будинки, нікого не спонсорують, а тому мають можливість допомагати українцям. Тому "знайти спонсора в Лондоні" не є реалістичним очікуванням.
          
          Найефективніший шлях сьогодні - через знайомих/друзів/родичів, які вже живуть тут, у Великій Британії - наприклад, якщо у них є друзі, колеги, сусіди з житлом і вони можуть порекомендувати вас особисто. Або якщо вони переїжджають від спонсора до орендованого житла і можуть порекомендувати вас як гостя, який замінить їх.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
        [Markup.button.callback("Гаразд, це все.", "OK")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.hears("Як їм знайти для мене спонсора?", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Як знайти спонсора?</b>
          \nЧитайте нашу статтю: https://ua.opora.uk/blog/yakim-chinom-ukrayincyam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk
    
          Приготуйтеся до довгих пошуків, оскільки у Великій Британії бракує справжніх спонсорів.
          
          Є шанс, що 1-2 справжні спонсори відгукнуться, якщо шукає жінка з 1-2 маленькими дітьми, або самотня жінка, або люди похилого віку, які шукають притулку, а тим більше, якщо вони з найнебезпечніших регіонів України.  У той час для самотнього чоловіка працездатного віку, який зараз перебуває в ЄС, шанси знайти спонсора близькі до нуля. 
          
          Також слід враховувати, що спонсори, які відгукуються зараз, навряд чи будуть з великих міст або півдня Англії. Більшість з них будуть з півночі Англії, Шотландії, Північної Ірландії та загалом з менших міст/містечок чи сіл. Саме там все ще є люди, які мають достатньо великі будинки, нікого не спонсорують, а тому мають можливість допомагати українцям. Тому "знайти спонсора в Лондоні" не є реалістичним очікуванням.
          
          Найефективніший шлях сьогодні - через знайомих/друзів/родичів, які вже живуть тут, у Великій Британії - наприклад, якщо у них є друзі, колеги, сусіди з житлом і вони можуть порекомендувати вас особисто. Або якщо вони переїжджають від спонсора до орендованого житла і можуть порекомендувати вас як гостя, який замінить їх.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "У мене є ще одне питання, пов'язане з візою.",
            "visas"
          ),
        ],
        [Markup.button.callback("Гаразд, це все.", "OK")],
      ])
    );
  });

  bot.action("already_have_sponsor", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи є ваш спонсор справжнім?</b>
          \nЩоб визначити, чи є ваш візовий спонсор у Великобританії справжнім, переконайтеся, що він відповідає всім наведеним нижче критеріям:
    
          1. Він є фізичною особою.
          2. Він надає житло для вашого перебування.
          3. Вони не вимагають грошей в обмін на візу.
          4. Вони не вимагають від вас працювати в обмін на візу.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Так, вони відповідають усім цим критеріям",
            "apply_home_for_ukraine_continue"
          ),
        ],
        [
          Markup.button.callback(
            "Ні, вони не відповідають деяким з цих критеріїв",
            "no_they_dont_meet_requirements"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("apply_home_for_ukraine_continue_yes", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Підготуйте візову анкету та подайте її на сайті gov.uk</b>
          \nhttps://www.gov.uk/guidance/apply-for-a-visa-under-the-ukraine-sponsorship-scheme`,
      Markup.inlineKeyboard([[Markup.button.callback("Ok", "which_documents")]])
    );
    ctx.answerCbQuery();
  });

  bot.action("no_they_dont_meet_requirements", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо спонсор просить гроші або роботу в обмін на візу, або каже, що не забезпечить житлом, це, швидше за все, шахрай.</b>
          \nЩоб не стати жертвою шахраїв, будьте обережні з особами, які обіцяють візу до Великої Британії без надання житла або вимагають гроші чи роботу в обмін на візу. Такі ситуації часто призводять до відмови у видачі візи або підроблених віз, які не дають права на в'їзд до Великої Британії.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Як знайти справжнього спонсора",
            "how_find_sponsor"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("apply_home_for_ukraine", async (ctx) => {
    await ctx.replyWithHTML(
      `Ukraine Sponsorship Scheme дозволяє громадянам України та членам їхніх сімей приїжджати до Великої Британії.
      Кожен повинен подати окрему заявку, навіть діти, які подорожують з членом сім'ї.
      Подача заявки безкоштовна.
      Ви зможете жити, працювати і навчатися у Великій Британії та мати доступ до державних коштів.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Продовжити",
            "apply_home_for_ukraine_continue"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("apply_home_for_ukraine_continue", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи відповідаєте ви всім вимогам?</b>
          \n
          1. Ви є громадянином України або близьким родичем громадянина України, який вже отримав спонсорську візу або подає заяву на отримання такої візи і відповідає її критеріям.
          2. Ви постійно проживаєте в Україні станом на 1 січня 2022 року.
          3. Ви перебуваєте за межами Великої Британії.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Так", "apply_home_for_ukraine_continue_yes")],
        [Markup.button.callback("Ні", "apply_home_for_ukraine_continue_no")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("apply_home_for_ukraine_continue_no", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви не маєте права подавати заявку на отримання візи Homes for Ukraine</b>
          \nЯкщо ви хочете приїхати до Великобританії працювати або навчатися, вам потрібно розглянути можливість отримання іншої візи.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
        [Markup.button.callback("Повернутися до початку", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("yes_sponsor", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Чи є ваш спонсор справжнім?</b>
          \nЩоб визначити, чи є ваш візовий спонсор у Великобританії справжнім, переконайтеся, що він відповідає всім наведеним нижче критеріям:
    
          1. Це фізична особа, а не компанія.
          2. Він надає житло принаймні на 6 місяців вашого перебування.
          3. Він не вимагає грошей в обмін на візу.
          4. Він не вимагає від вас працювати в обмін на візу.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Так, він відповідає усім цим критеріям",
            "yes_sponsor_meet_requirements"
          ),
        ],
        [
          Markup.button.callback(
            "Ні, вони не відповідають деяким з цих критеріїв",
            "no_sponsor_scam"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("no_sponsor", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Як знайти спонсора?</b>
            \nЧитайте нашу статтю: https://ua.opora.uk/blog/yakim-chinom-ukrayincyam-zaraz-mozhna-znajti-sponsora-shob-priyihati-do-uk`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Ок", "OK")],
        [Markup.button.callback("Повернутися до початку", "visas")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("no_sponsor_scam", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Швидше за все, це шахрай</b>
          \nЩоб не стати жертвою шахраїв, будьте обережні з особами, які обіцяють візу до Великої Британії без надання житла або вимагають гроші чи роботу в обмін на візу. Такі ситуації часто призводять до відмови у видачі візи або підроблених віз, які не дають права на в'їзд до Великої Британії.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Як знайти справжнього спонсора",
            "no_sponsor"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("yes_sponsor_meet_requirements", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Підготуйте візову анкету та подайте її на сайті gov.uk</b>
          \nВи можете знайти всю інформацію та подати заявку на сайті уряду https://www.gov.uk/guidance/apply-for-a-visa-under-the-ukraine-sponsorship-scheme
    
          Кожен повинен подати окрему заяву, навіть діти, які подорожують з членом сім'ї.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "Продовжити",
            "apply_home_for_ukraine_continue"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("which_documents", async (ctx) => {
    keyboard = Markup.keyboard([
      ["Дійсний український біометричний паспорт"], //"valid_biometric_passport"
      ["Дійсний український небіометричний паспорт"], //"valid_non_biometric_passport"
      ["Прострочений український паспорт"], //"expired_passport"
      ["Тільки внутрішній український паспорт"], //"internal_passport"
      ["Не український паспорт"], //"non_ukranian_passport"
      ["Свідоцтво про народження (для дитини до 18 років)"], //"birth_certificate"
    ]).oneTime();
    await ctx.replyWithHTML(`<b>Який документ у вас є?</b>`, keyboard);
  });

  bot.hears(
    [
      "Свідоцтво про народження (для дитини до 18 років",
      "Не український паспорт",
      "Тільки внутрішній український паспорт",
    ],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Якщо у вас немає дійсного українського закордонного паспорта або прострочений український закордонний паспорт зі штампом про продовження терміну дії</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Вам потрібно буде записатися на прийом до візового центру (VAC) і з'явитися на нього. Це також стосується дітей-заявників.

        Під час процесу подання онлайн-заявки вас попросять завантажити копії будь-яких документів, що посвідчують особу, які ви можете мати, а саме
        - українське національне посвідчення особи
        - дійсний паспорт, виданий іншою країною (не Україною)
        - комбінація офіційних документів - наприклад, водійське посвідчення з фотографією та свідоцтво про народження
        - довідку про надзвичайну ситуацію, видану українським органом влади з березня 2022 року

        Надання цих документів не є обов'язковим, але це може допомогти підтримати вашу заяву, якщо ви маєте таку можливість.

        Ви можете завантажити свої документи за допомогою додатку для завантаження документів комерційного партнера Міністерства внутрішніх справ. Це буде або TLS, або VFS, залежно від того, в яку країну ви подаєте заяву. Ви можете завантажити додаток з веб-сайту TLS або VFS під час подання заяви.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Продовжити", "start_application")],
        ])
      );
    }
  );

  bot.hears("Прострочений український паспорт", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви не можете використовувати додаток ID Check, якщо термін дії вашого паспорта закінчився, навіть якщо в ньому стоїть офіційна відмітка про продовження, видана українським урядом.</b>`,
      Markup.removeKeyboard()
    );

    await ctx.replyWithHTML(
      `Вам не потрібно відвідувати візовий центр для здачі біометричних даних. Замість цього, ви повинні здати біометричні дані протягом 6 місяців після прибуття до Великої Британії.

      Під час подачі заяви ви повинні завантажити копії обох документів:

      - сторінки з фотографією вашого простроченого паспорта
      - сторінки вашого простроченого паспорта з офіційною відміткою про продовження терміну дії

      Ви можете завантажити ці документи за допомогою додатку нашого комерційного партнера для завантаження документів після того, як ви заповнили свою заявку. Це буде або TLS, або VFS, залежно від того, в яку країну ви подаєте заяву. Ви можете завантажити додаток з веб-сайту TLS або VFS під час подання заяви.
  
      Якщо вам потрібна допомога у завантаженні копій документів, ви можете записатися на прийом до візового центру.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "start_application")],
      ])
    );
  });

  // valid_non_biometric_passport
  bot.hears("Дійсний український небіометричний паспорт", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви не можете скористатися додатком ID Check і маєте дійсний український закордонний паспорт</b>`,
      Markup.removeKeyboard()
    );

    await ctx.replyWithHTML(
      `Вам не потрібно відвідувати візовий центр для здачі біометричних даних. Замість цього ви повинні надати свої біометричні дані протягом шести місяців після прибуття до Великої Британії.
        
      Під час подання заяви обов'язково завантажте копію сторінки з фотографією вашого паспорта. Залежно від країни, в якій ви подаєте заяву, ви можете зробити це за допомогою додатку для завантаження документів, наданого комерційним партнером Міністерства внутрішніх справ - TLS або VFS. Завантажте додаток з веб-сайту TLS або VFS, коли ви починаєте подавати заяву.
            
      Якщо вам потрібна допомога у завантаженні документів, ви можете записатися на прийом до візового центру.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "start_application")],
      ])
    );
  });

  bot.hears("Дійсний український біометричний паспорт", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Ви можете підтвердити свою особу за допомогою додатку ID Check</b>`,
      Markup.removeKeyboard()
    );

    await ctx.replyWithHTML(
      `Ви можете скористатися додатком "UK Immigration: ID check", щоб підтвердити свою особу, якщо у вас є дійсний український біометричний закордонний паспорт. Вам не потрібно відвідувати візовий центр, щоб здати біометричні дані або подавати заяву на продовження перебування після прибуття до Великої Британії.

      Якщо ваш спонсор подає заяву від вашого імені, вам все одно потрібно буде використовувати додаток для підтвердження вашої особи. Після того, як ваш спонсор створить дані вашого облікового запису онлайн, він отримає інструкції, як почати користуватися додатком.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "which_phone")],
      ])
    );
  });

  bot.action("which_phone", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Який у вас телефон?</b>`,
      Markup.inlineKeyboard([
        [Markup.button.callback("iPhone", "iphone")],
        [Markup.button.callback("Android", "android")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("iphone", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Додаток "UK Immigration: ID Check" доступний для iPhone 7 і новіших моделей</b>
      \nВам знадобиться iPhone 7, 7 Plus або новіший з iOS 13.2 або новішої версії 

      Щоб дізнатися версію встановленого програмного забезпечення, перейдіть до "Налаштування" - "Загальні", а потім "Про програму"
      
      Для встановлення програми вам знадобиться щонайменше 120 МБ пам'яті, а також підключення до 3G, 4G або WiFi.
      
      Додатку потрібен доступ до камери. Якщо програма не запитує доступ, увімкніть його в налаштуваннях.
      
      Завантажте програму з App Store: https://apps.apple.com/us/app/uk-immigration-id-check/id1499891460`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "У мене є телефон, що відповідає вимогам",
            "valid_iphone"
          ),
        ],
        [
          Markup.button.callback(
            "Мій телефон не відповідає вимогам",
            "invalid_phone"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("valid_iphone", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Завантажте додаток і переходьте до нього, коли з'явиться відповідний запит під час подачі заяви на візу</b>
      \nПерш ніж користуватися додатком, ви повинні розпочати подачу заявки та створити свій обліковий запис у Візовій та імміграційній службі Великої Британії на сайті GOV.UK.

      Потім вам потрібно буде увійти в систему, щоб почати подачу заяви, вказавши номер свого паспорта, дату народження та одноразовий код безпеки, надісланий на вашу електронну пошту або телефон.
      
      Ви будете використовувати цей обліковий запис для заповнення заяви, перегляду та підтвердження вашого статусу.
      
      Подивіться це відео про те, як користуватися додатком: https://www.youtube.com/watch?v=ryMm0H4jzf8&t=0s`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "start_application")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("start_application", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Почніть подавати заяву та створіть свій обліковий запис  UK Visas and Immigration онлайн на GOV.UK</b>
      \nПерейдіть на урядовий веб-сайт https://www.gov.uk/guidance/apply-for-a-visa-under-the-ukraine-sponsorship-scheme, щоб створити обліковий запис UKVI і почати подавати заявку.

      Кожен повинен подати окрему заяву, навіть діти, які подорожують з членом сім'ї.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "prepare_information")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("prepare_information", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Підготуйте наступну інформацію про себе або про особу, на яку ви подаєте заявку</b>
      \n1. Документ, що посвідчує особу заявника, наприклад, паспорт або, для дітей до 18 років, свідоцтво про народження.
      2. Доказ проживання в Україні станом на 1 січня 2022 року. Це може бути
       - штамп у паспорті, що підтверджує перетин кордону України після 1 січня 2022 року.
      - Виписки з банківського рахунку за листопад або грудень 2021 року.
      - Платіжки за комунальні послуги за листопад або грудень 2021 року.
      - сертифікат про вакцинацію від COVID-19, якщо він отриманий у період з жовтня по грудень 2021 року.
      - будь-які інші офіційні документи з місця проживання заявника.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "prepare_sponsor_information")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("prepare_sponsor_information", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Підготуйте наступну інформацію про спонсора</b>
      \n1. Скан паспорта (перша сторінка у форматі PDF) або скан водійського посвідчення, дійсного не менше 6 місяців  
      2. Що найкраще описує вашого спонсора? Наприклад, громадянин Великої Британії, який оселився у Великій Британії зі статусом ILR, біженець з правом на захист у Великій Британії, статус pre-settled або Other (якщо він перебуває у Великій Британії за однією з українських віз)
      3. Ім'я та прізвище спонсора 
      4. Громадянство вашого спонсора
      5. Дата народження спонсора  
      6. Номер паспорта спонсора
      7. Країна видачі паспорта спонсора
      8. Дата видачі та термін дії паспорта спонсора
      9. Номер телефону спонсора
      10. Адреса електронної пошти спонсора
      11. Чи був ваш спонсор коли-небудь відомий під іншим ім'ям (тобто до шлюбу) 
      12. Адреса вашого спонсора знаходиться у Великобританії? Його поштовий індекс, назва і номер будинку, назва вулиці, країна у Великобританії
      13. Коли вони почали жити за цією адресою
      14. Стать спонсора в паспорті
      15. Сімейний стан
      16. Чи мав спонсор коли-небудь інше громадянство
      17. Чи буде заявник проживати за адресою спонсора
      18. Чи проживають за адресою, де буде проживати заявник, інші особи старше 18 років? Якщо так, надайте їхні дані, включаючи ім'я, дату народження, громадянство, номер паспорта всіх цих осіб.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "upload_evidence")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("upload_evidence", async (ctx) => {
    const keyboard = Markup.keyboard([
      [
        "Надав документи, що посвідчують особу заявника, використовуючи додатки TLS або VFS",
      ],
      ["Я використовував додаток ID Check, щоб підтвердити особу заявника"],
      ["Мені довелося записатися на прийом до візового центру (ВЦ)"],
    ]).oneTime();

    await ctx.replyWithHTML(
      `<b>Після заповнення заявки завантажте докази</b>
      \nПісля того, як ви дійдете до розділу "Provide evidence", натисніть "Evidence upload" і завантажте свої документи та документи спонсора:
      
      <b>Ваші наступні кроки залежатимуть від того, як ви надали документи, що посвідчують особу заявника:</b>.`,
      keyboard
    );

    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      "https://thriving-frangollo-33fd04.netlify.app/assets/evidence.jpeg"
    );

    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      "https://thriving-frangollo-33fd04.netlify.app/assets/then_continue.jpeg",
      "...потім натисніть 'Continue'"
    );

    await ctx.telegram.sendPhoto(
      ctx.chat.id,
      "https://thriving-frangollo-33fd04.netlify.app/assets/confirm_upload.jpeg",
      "...потім натисніть 'Confirm and upload'"
    );
  });

  // id_check_app or tls_vfs
  bot.hears(
    [
      "Я використовував додаток ID Check, щоб підтвердити особу заявника",
      "Надав документи, що посвідчують особу заявника, використовуючи додатки TLS або VFS",
    ],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Тепер вам потрібно дочекатися рішення про видачу візи</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Перевірте електронну пошту, яку ви використовували для подання заяви, на наявність листа <b>Application Update</b>:
          * Якщо там написано: "<b>Your application under the Ukraine Scheme has been successful</b>", це означає, що віза була <b>схвалена</b>, і ви можете вперше подорожувати Великою Британією з цим листом і вашим паспортом (тобто, це ваш лист про дозвіл на в'їзд). У ньому також вказано точний термін дії вашої візи - 3 роки.
          * Якщо є слова "<b>rejected</b>" або "<b>refused</b>", це означає, що віза не була схвалена.`,
        Markup.inlineKeyboard([
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
        "https://thriving-frangollo-33fd04.netlify.app/assets/id_check_app.jpeg"
      );
    }
  );

  // book_appointment
  bot.hears(
    "Мені довелося записатися на прийом до візового центру (ВЦ)",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Зверніться до візового центру (VAC), щоб здати біометричні дані</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Для того, щоб Home Office розпочав обробку заяви на отримання візи до Великобританії, заявник повинен спочатку відвідати Візовий центр (VAC) і здати свої біометричні дані.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Продовжити", "book_appointment_continue")],
        ])
      );
    }
  );

  bot.action("book_appointment_continue", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Тепер вам потрібно дочекатися рішення про видачу візи</b>
    \nЗаявники, які надали свої біометричні дані через Візовий центр (VAC), отримають візову віньєтку, якщо їхня заявка буде успішною.

    Вони матимуть 90 днів для в'їзду до Великої Британії за цією віньєткою.`,
      Markup.inlineKeyboard([
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
      "https://thriving-frangollo-33fd04.netlify.app/assets/book_appointment_continue.jpeg"
    );
  });

  bot.action("android", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Додаток "UK Immigration: ID Check" доступний для Android 6.0 і вище</b>
      \nВам знадобиться Android 6.0 або новішої версії - це можна знайти у ваших налаштуваннях.

      Для встановлення програми на вашому телефоні має бути щонайменше 135 МБ пам'яті, і він має бути підключений до 3G, 4G або WiFi.
      
      Ваш телефон повинен підтримувати NFC, щоб додаток міг відсканувати ваш документ - ви можете знайти це в налаштуваннях - якщо ви можете використовувати свій телефон для безконтактної оплати, це означає, що він має NFC, і ви можете використовувати додаток.
      
      Додатку потрібен доступ до камери. Якщо додаток не запитує доступ, увімкніть його у своїх налаштуваннях.
      
      Завантажте додаток з Google Play Store: https://play.google.com/store/apps/details?id=uk.gov.HomeOffice.ho2&hl=en_GB&gl=US`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "У мене є телефон, що відповідає вимогам",
            "valid_iphone"
          ),
        ],
        [
          Markup.button.callback(
            "Мій телефон не відповідає вимогам",
            "invalid_phone"
          ),
        ],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("invalid_phone", async (ctx) => {
    const keyboard = Markup.keyboard([
      ["Я маю дійсний український закордонний паспорт"],
      ["У мене немає дійсного українського закордонного паспорта"],
      ["У мене є паспорт, виданий не Україною, а іншою країною"],
      [
        "У мене прострочений український закордонний паспорт з офіційним штампом продовження",
      ],
    ])
      .resize()
      .oneTime();

    await ctx.replyWithHTML(
      `<b>Ви не зможете користуватися додатком ID Check</b>
      \nВаші подальші кроки залежать від документа, який підтверджує вашу особу:`,
      keyboard
    );
  });

  // passport_not_ukraine/no_valid_passport
  bot.hears(
    [
      "У мене немає дійсного українського закордонного паспорта",
      "У мене є паспорт, виданий не Україною, а іншою країною",
    ],
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Якщо у вас немає дійсного українського закордонного паспорта або прострочений український закордонний паспорт зі штампом про продовження терміну дії</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Вам потрібно буде записатися на прийом до візового центру (VAC) і з'явитися на нього. Це також стосується дітей-заявників.

    Під час процесу подання онлайн-заявки вас попросять завантажити копії будь-яких документів, що посвідчують особу, які ви можете мати, а саме
    - українське національне посвідчення особи
    - дійсний паспорт, виданий іншою країною (не Україною)
    - комбінація офіційних документів - наприклад, водійське посвідчення з фотографією та свідоцтво про народження
    - довідку про надзвичайну ситуацію, видану українським органом влади з березня 2022 року
    
    Надання цих документів не є обов'язковим, але це може допомогти підтримати вашу заяву, якщо ви маєте таку можливість.
    
    Ви можете завантажити свої документи за допомогою додатку для завантаження документів комерційного партнера Міністерства внутрішніх справ. Це буде або TLS, або VFS, залежно від того, в яку країну ви подаєте заяву. Ви можете завантажити додаток з веб-сайту TLS або VFS під час подання заяви.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Продовжити", "start_application")],
        ])
      );
    }
  );

  // valid_ukraine_passport
  bot.hears("Я маю дійсний український закордонний паспорт", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Якщо ви не можете скористатися додатком ID Check і маєте дійсний український закордонний паспорт</b>`,
      Markup.removeKeyboard()
    );

    await ctx.replyWithHTML(
      `Вам не потрібно відвідувати візовий центр для здачі біометричних даних. Замість цього ви повинні надати свої біометричні дані протягом шести місяців після прибуття до Великої Британії.
    
        Під час подання заяви обов'язково завантажте копію сторінки з фотографією вашого паспорта. Залежно від країни, в якій ви подаєте заяву, ви можете зробити це за допомогою додатку для завантаження документів, наданого комерційним партнером Міністерства внутрішніх справ - TLS або VFS. Завантажте додаток з веб-сайту TLS або VFS, коли ви починаєте подавати заяву.
        
        Якщо вам потрібна допомога у завантаженні документів, ви можете записатися на прийом до візового центру.`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Продовжити", "start_application")],
      ])
    );
  });

  // expired_passport
  bot.hears(
    "У мене прострочений український закордонний паспорт з офіційним штампом продовження",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Ви не можете використовувати додаток ID Check, якщо термін дії вашого паспорта закінчився, навіть якщо в ньому стоїть офіційна відмітка про продовження, видана українським урядом.</b>`,
        Markup.removeKeyboard()
      );

      await ctx.replyWithHTML(
        `Вам не потрібно відвідувати візовий центр для здачі біометричних даних. Замість цього, ви повинні здати біометричні дані протягом 6 місяців після прибуття до Великої Британії.
    
        Під час подачі заяви ви повинні завантажити копії обох документів:
        
        - сторінки з фотографією вашого простроченого паспорта
        - сторінки вашого простроченого паспорта з офіційною відміткою про продовження терміну дії
        
        Ви можете завантажити ці документи за допомогою додатку нашого комерційного партнера для завантаження документів після того, як ви заповнили свою заявку. Це буде або TLS, або VFS, залежно від того, в яку країну ви подаєте заяву. Ви можете завантажити додаток з веб-сайту TLS або VFS під час подання заяви.
        
        Якщо вам потрібна допомога у завантаженні копій документів, ви можете записатися на прийом до візового центру.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Продовжити", "start_application")],
        ])
      );
    }
  );
};
