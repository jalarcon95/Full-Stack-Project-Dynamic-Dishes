const dayjs = require('dayjs');

// Function to generate a timestamp in the desired format
function generateTimestamp() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = { generateTimestamp };