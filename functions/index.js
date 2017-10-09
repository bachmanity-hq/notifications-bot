const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const { Slack } = require('./slack');

const app = express();

/**
 * Parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Endpoint where a webhook from a 3rd-party system can post to.
 * Used to notify app of new helpdesk tickets in this case
 */
app.post('/incoming', (req, res) => {
  const { notification } = req.body;
  Slack.sendNotification(notification)
    .then((response) => {
      res.status(200).json({ msg: `Successfully notified the ${notification.type} for: ${notification.title}`, detail: response.data });
    })
    .catch((error) => {
      res.status(400).json({ msg: 'ERROR: The notification was not created', detail: error.data });
    });
});


// app.listen( process.env.PORT || 3000, function(){
//   console.log('Listening on port 3000');
// });

exports.notifications = functions.https.onRequest((req, res) => {
  if (!req.path) req.url = `/${req.url}`;
  return app(req, res);
});
