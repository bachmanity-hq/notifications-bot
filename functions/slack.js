'use strict';
const axios = require('axios');
const template = require('./template');
const qs = require('querystring');
const debug = require('debug')('notifications:slack');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('/Users/jakehasler/.config/coup-44616-firebase-adminsdk-u4rn2-d64f978e86.json');
// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coup-44616.firebaseio.com"
});

class Slack {
  constructor(props) {
    debug('constructor');
    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }
  }

  send() {
    console.log(this.config);
    const {
      client_id,
      client_secret,
      verification_token,
      webhook_url,
      oauth_access_token
    } = _.get(this.config, 'bachmanity.coup_notifications');
  }

  static sendNotification({ title, message }) {
    console.log(title, message);
    const config = functions.config().slack;
    const slack = new Slack({ config });
    slack.send();
  }

}

module.exports.Slack = Slack;
