const { App } = require('@slack/bolt')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const bot = new App({
    token: process.env.BOT_TOKEN,
    signingSecret: process.env.SIGNING_SECRET
});

(async () => {
    // Start your app
    await bot.start(3000);
  
    console.log('⚡️ Bolt app is running!');
  })();