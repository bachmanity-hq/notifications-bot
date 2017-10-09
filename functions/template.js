const _ = require('lodash');

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const snakeToTitle = (str) => {
  const newStr = str.replace(/_/, ' ');
  return _.startCase(_.toLower(newStr));
};

/**
 * Takes a JSON object representing a noti and turns it into well
 * formatted Slack message
 * @param {object} noti - JSON representation of the noti - The title of the book.
 */
const fill = (noti) => {
  const attachment = {
    title: snakeToTitle(noti.type),
    text: noti.title,
    color: '#00D09D',
  };

  attachment.fields = [];

  Object.keys(noti.meta).forEach((key) => {
    attachment.fields.push({
      title: capitalizeFirstLetter(key),
      value: noti.meta[key]
    });
  });

  return { attachments: [attachment] };
};

module.exports = { fill };
