const _ = require('lodash');
const template = require('../template.js');

const payload = {
  notification: {
    type: 'new_deal',
    title: 'Costco: 50% off of everything',
    meta: { goodUntil: '10/28/2017' }
  }
};

describe('slack template module', () => {
  it('returns a template', () => {
    const temp = template.fill(payload.notification);
    expect(_.first(temp.attachments).text).toEqual(payload.notification.title);
  });
});
