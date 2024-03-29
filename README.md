Notifications Bot
=================
> Agnostic API for sending notifications to our _notifications_ slack channel

## Getting Started
1. `npm install && cd functions && npm install`
2. Ensure you've logged in via `firebase login`.

## API
Notifications are sent to the <API_URL>/incoming with an `application/json` body that looks like:
```javascript
{
  "notification": {
    "type": "<Type>", // snake cased version of notification type, e.g. `new_deal` or `new_client`
    "title": "<Title>",
    "meta": {
      "businessName": "50% off of everything" // Anything can go into this object and be iterated over in the notification body
    }
  }
}
```

## Other
Getting and Setting Config Variables:
`firebase functions:config:get`
`firebase functions:config:set some_key.some_nested_key=value`

What I did through the Slack API Configuration:
_refrerenced from https://github.com/slackapi/template-actionable-notifications_
1. api.slack.com/apps
2. Create new app called "Coup Notifications"
3. Navigate to the OAuth & Permissions page and add the following scopes:
  * users:read
  * chat:write:bot
4. Activate Incoming Webhooks from the Incoming Webhooks page
5. Click 'Add New Webhook to Team', install the app and select a channel
6. Set the firebase:config variables for the slack app

## Deployment
From the root of the project run `npm run deploy`.
* This will lint and run the tests so that we can ensure we don't break the deploy
