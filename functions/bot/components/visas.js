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
      ctx.answerCbQuery();
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
        Markup.keyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [Markup.button.callback("У мене єще одне питання.", "visas")],
        ])
      );
      ctx.answerCbQuery();
    }
  );

  bot.hears(
    "У мене (або члена моєї сім'ї) є біометричний паспорт, але він продовжений",
    async (ctx) => {
      await ctx.replyWithHTML(
        `<b>Для подорожей приймаються біометричні паспорти з продовженим терміном дії</b>
      \nПодорожу за біометричним українським паспортом з офіційною відміткою про продовження терміну дії.

      Перед поїздкою перевірте умови подорожі на <a href="https://tripadvisor.mfa.gov.ua">сайті Міністерства закордонних справ України</a> та проконсультуйтеся з обраною вами авіакомпанією.`,
        Markup.keyboard([
          [Markup.button.callback("Гаразд, це все.", "OK")],
          [Markup.button.callback("У мене єще одне питання.", "visas")],
        ])
      );
      ctx.answerCbQuery();
    }
  );

  bot.hears("У мене (або члена моєї сім'ї) немає паспорта", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Залежно від терміновості вашої подорожі ви можете подати заяву на отримання нового паспорта або скористатися альтернативними варіантами</b>`,
      Markup.keyboard([
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
    ctx.answerCbQuery();
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

  bot.action("right_visa_yes", async (ctx) => {
    await ctx.replyWithHTML(
      "<b>What is the purpose of your visit to the UK?</b>",
      Markup.inlineKeyboard([
        [Markup.button.callback("Fleeing the war in Ukraine", "right_visa_o1")],
        [
          Markup.button.callback(
            "Short visit to see family or friends",
            "tourist_visa"
          ),
        ],
        [Markup.button.callback("Work in the UK", "work_visa")],
        [Markup.button.callback("Other purpose", "right_visa_o5")],
        [Markup.button.callback("I am already in the UK", "extension_scheme")],
      ])
    );
    ctx.answerCbQuery();
  });

  bot.action("right_visa_o5", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Check gov.uk for available visa types</b>
          \nhttps://www.gov.uk/check-uk-visa`
    );
    ctx.answerCbQuery();
  });

  bot.action(["family_scheme_yes", "right_visa_o1"], async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Do you have a family member in the UK?</b>

      Your UK-based family member must be one of the following:
      1. your immediate family member
      Your or your UK-based family member's:
      - spouse or civil partner
      - unmarried partner (you must have been living together in a relationship for at least 2 years)
      - child who is under 18
      - parent (if you are under 18)
      - fiancé(e) or proposed civil partner
      
      2. your extended family member 
      Your UK-based family member's:
      - parent (if you are over 18)
      - child who is over 18
      - grandparent
      - grandchild or your partner's grandchild
      - brother or sister
      - aunt or uncle
      - niece or nephew
      - cousin
      - mother-in-law or father-in-law
      - grandparent-in-law
      - brother-in-law or sister-in-law
      - spouse or civil partner, unmarried partner, child, parent, or fiancé(e) or proposed civil partner of your extended family member`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Yes", "right_visa_o1_yes")],
        [Markup.button.callback("No ", "right_visa_o1_no")],
      ])
    );

    ctx.answerCbQuery();
  });

  bot.action("right_visa_o1_yes", async (ctx) => {
    await ctx.replyWithHTML(
      "<b>What is their immigration status in the UK?</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "They are British citizens",
            "right_visa_o1_yes_status1"
          ),
        ],
        [
          Markup.button.callback(
            "They have settled or pre-settled status",
            "right_visa_o1_yes_status2"
          ),
        ],
        [
          Markup.button.callback(
            "They are here on a sponsorship (Homes for Ukraine) visa",
            "right_visa_o1_yes_status3"
          ),
        ],
        [
          Markup.button.callback(
            "They are here on Ukraine Family Scheme visa",
            "right_visa_o1_yes_status4"
          ),
        ],
        [
          Markup.button.callback(
            "They are in the UK illegally",
            "right_visa_o1_yes_status5"
          ),
        ],
      ])
    );

    ctx.answerCbQuery();
  });

  bot.action("right_visa_o1_yes_status1", async (ctx) => {
    await ctx.replyWithHTML(
      "Your family member can invite you on Ukraine Family Scheme visa.",
      Markup.inlineKeyboard([
        [Markup.button.callback("Continue", "family_scheme")],
      ])
    );
  });

  bot.action("right_visa_o1_yes_status2", async (ctx) => {
    await ctx.replyWithHTML(
      "Your family member can invite you on Ukraine Family Scheme visa."
    );
  });

  bot.action("right_visa_o1_yes_status3", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Your family member can not invite you on Ukraine Family Scheme visa</b>.
      Your family member can either find a suitable sponsor for you or choose to become your sponsor themselves. This will enable you to apply for the Homes for Ukraine (sponsorship) visa.`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "How do they find a sponsor for me?",
            "sponsor_how"
          ),
        ],
        [
          Markup.button.callback(
            "How can they become my sponsor?",
            "right_visa_o1_yes_status3_o2"
          ),
        ],
      ])
    );
  });

  bot.action("right_visa_o1_yes_status4", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Your family member can not invite you on Ukraine Family Scheme visa</b>.

      Your family member can either find a suitable sponsor for you or choose to become your sponsor themselves. This will enable you to apply for the Homes for Ukraine (sponsorship) visa.
      `,
      [
        Markup.inlineKeyboard([
          [
            Markup.button.callback(
              "How do they find a sponsor for me?",
              "sponsor_how"
            ),
          ],
          [
            Markup.button.callback(
              "How can they become my sponsor?",
              "right_visa_o1_yes_status3_o2"
            ),
          ],
        ]),
      ]
    );
  });

  bot.action("right_visa_o1_yes_status3_o2", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Become a sponsor for a relative or friend (PLACEHOLDER)</b>`
    );
  });

  bot.action("right_visa_o1_yes_status5", async (ctx) => {
    await ctx.replyWithHTML(
      `<b>Your family member can not invite you if they are in the UK illegally.</b>\nYou need to find a sponsor to come to the UK.`,
      Markup.inlineKeyboard([[Markup.button.callback("Continue", "sponsor")]])
    );
  });
};
