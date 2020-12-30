const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const route = express()
const { App } = require('@slack/bolt');



const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});


app.event('app_home_opened', ({ event, say }) => {  
  // Look up the user from DB
  // console.log(event);
  say(`Hello world, and welcome <@${event.user}>!`);

});


// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log("TEST");

  await ack()
  
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
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
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();


