const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * Endpoint where a webhook from a 3rd-party system can post to.
 * Used to notify app of new helpdesk tickets in this case
 */
app.post('/incoming', (req, res) => {
  res.status(200).send('hello dan');
  // Ticket.fromExternal(req.body)
  //   .then((ticket) => ticket.postToChannel())
  //   .then(() => {
  //     res.sendStatus(200);
  //   })
  //   .catch((error) => {
  //     res.status(400).send('The ticket was not created');
  //   });
});

/*
 * Endpoint to receive interactive message events from Slack.
 * Checks verification token and then makes necessary updates to
 * 3rd-party system based on the action taken in Slack.
 */
app.post('/interactive-message', (req, res) => {
  // const {
  //     token,
  //     actions,
  //     callback_id,
  //     response_url,
  //     user
  // } = JSON.parse(req.body.payload);
  //
  // const { verification_token } = functions.config().slack.bachmanity.conversations;
  //
  // if (token === verification_token) {
  //   // Immediately respond to signal success, further updates will be done using `response_url`
  //   res.send('');
  //
  //   Ticket.find(callback_id).then((ticket) => {
  //     debug('interactive message ticket found');
  //     const action = actions[0];
  //     const fieldName = action.name;
  //     // Handle either message menu action or message button (Claim)
  //     const fieldValue = action.selected_options ? action.selected_options[0].value : user.id;
  //
  //     return ticket.updateField(fieldName, fieldValue).then(() => {
  //       debug('updating notification in channel');
  //       return ticket.postToChannel(response_url);
  //     });
  //   })
  //   .catch(console.error);
  // } else {
  //   res.sendStatus(404);
  // }
});

app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port 3000');
});

// exports.notifications = functions.https.onRequest((req, res) => {
//       if (!req.path) req.url = `/${req.url}`
//       return app(req, res)
// });
