const moment = require('moment');

function formatToJSON(response) {
  return JSON.parse(JSON.stringify(response));
}

function capitalizeText(text) {
  formatText = text
    .split('_')
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
    .join(' ');

  return formatText;
}

function getRandom(min, max) {
  const floatRandom = Math.random();
  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);
  const randomWithinRange = random + min;

  return randomWithinRange;
}

function formatDateString(dateString) {
  let date = moment(dateString).format('Do MMMM YYYY');
  let time = moment(dateString).format('HH:mm A');

  return `${date}, ${time}`;
}

function fetchAlias(text) {
  return text?.toLowerCase()?.split(' ')?.join('-');
}

function fetchKeywords(text) {
  if (!text) return [];

  return text?.split(',')?.map((item) => item?.trim());
}
function capitalize(input) {
  return input
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}


module.exports.formatToJSON = formatToJSON;
module.exports.capitalizeText = capitalizeText;
module.exports.formatDateString = formatDateString;
module.exports.fetchAlias = fetchAlias;
module.exports.fetchKeywords = fetchKeywords;
module.exports.getRandom = getRandom;
module.exports.capitalize = capitalize;
