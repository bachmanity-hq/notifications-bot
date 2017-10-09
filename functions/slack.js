const axios = require('axios');
const template = require('./template');
const _ = require('lodash');
const functions = require('firebase-functions');

class Slack {
  constructor(props) {
    _.forOwn(props, (v, k) => {
      this[k] = v;
    });
  }

  send() {
    const {
      webhook_url,
      oauth_access_token
    } = _.get(this.config, 'bachmanity.coup_notifications');

    const body = {
      title: this.type,
      text: this.title,
      token: oauth_access_token,
      channel: '#notifications'
    };

    return axios.post(webhook_url, body);
  }

  static sendNotification({ type, title, meta }) {
    const config = functions.config().slack;
    const slack = new Slack({ config, type, title, meta });
    return slack.send();
  }
}

module.exports.Slack = Slack;
