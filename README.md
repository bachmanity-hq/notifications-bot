Notifications Bot
=================
> Agnostic API for sending notifications to our _notifications_ slack channel

## Getting Started
1. `cd functions && npm install`
2. Ensure you've logged in via `gcloud auth application-default login`. More info [here](https://developers.google.com/identity/protocols/application-default-credentials).

## API
Notifications are sent to the <API_URL>/incoming with an `application/json` body that looks like:
```JSON
{
  "message": {
    "title": "<Title>",
    "message": "<Message>"
  }
}
```

## Other
Getting and Setting Config Variables:
`firebase functions:config:get`
`firebase functions:config:set some_key.some_nested_key=value`

