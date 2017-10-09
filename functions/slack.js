const axios = require('axios');
const _ = require('lodash');
const functions = require('firebase-functions');
const template = require('./template');

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

    const noti = template.fill(this);
    const body = {
      token: oauth_access_token,
      channel: '#notifications'
    };

    return axios.post(webhook_url, _.merge(body, noti));
  }

  static sendNotification({ type, title, meta }) {
    const config = functions.config().slack;
    const slack = new Slack({ config, type, title, meta });
    return slack.send();
  }
}

module.exports.Slack = Slack;
