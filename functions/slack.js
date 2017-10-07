'use strict';
const axios = require('axios');
const template = require('./template');
const qs = require('querystring');
const _ = require('lodash');
const functions = require('firebase-functions');

class Slack {
  constructor(props) {
    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }
  }

  send() {
    const {
      client_id,
      client_secret,
      verification_token,
      webhook_url,
      oauth_access_token
    } = _.get(this.config, 'bachmanity.coup_notifications');

    const body = {
      title: this.title,
      text: this.message,
      token: oauth_access_token,
      channel: '#notifications'
    };

    return axios.post(webhook_url, body);
  }

  static sendNotification({ title, message }) {
    const config = functions.config().slack;
    const slack = new Slack({ config, title, message });
    return slack.send();
  }

}

module.exports.Slack = Slack;
