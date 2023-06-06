const { Markup } = require("telegraf");

exports.right_visa = (bot) => {
  bot.action("right_visa", async (ctx) => {
    await ctx.replyWithHTML(
      "<b>Would you like to figure out which visa do you need to come to the UK?</b>",
      Markup.inlineKeyboard([
        [Markup.button.callback("Yes", "right_visa_yes")],
        [Markup.button.callback("No", "right_visa_no")],
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
      `<b>Check gov.uk for available visa types?</b>
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
