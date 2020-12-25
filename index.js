const { App } = require('@slack/bolt')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const app = new App({
    token: process.env.BOT_TOKEN,
    signingSecret: process.env.SIGNING_SECRET
});

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient insantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient({
  token: process.env.SLACK_BOT_TOKEN,
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});


app.event('app_home_opened', ({ event, say }) => {  
  // Look up the user from DB
  // console.log(event);
  let user = store.getUser(event.user);
  
  if(!user) {
    user = {
      user: event.user,
      channel: event.channel
    };
    store.addUser(user);
    
    say(`Hello world, and welcome <@${event.user}>!`);
  } else {
    say('Hi again!');
  }
});

app.event('app_mention', ({ event, say }) => {  
  console.log("App mentioned");
  say("App Mentioned")
  say(event.text)
  
});

// Listen to a message containing the substring "hello"
// app.message requires your app to subscribe to the message.channels event
app.message("hello", async ({ payload, client, say}) => {
  console.log("HERE");
  try {
    say("Found hello substring");
  }
  catch (error) {
    console.error(error);
  }
});
// The echo command simply echoes on command
app.command('/help', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();
  
    await say("TEST");

    console.log("TEST")
  });

(async () => {
    // Start your app
    await app.start(3000);

    console.log('⚡️ Bolt app is running!');
  })();