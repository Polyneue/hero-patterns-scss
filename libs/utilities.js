const fs = require('fs');
const { promisify } = require('util');

// Utilities for Async
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

/**
 * Format Pattern Name
 * @param {String} patternName - name of the pattern
 * @return {String} name in the following format four-point-star
 */
const formatName = function (patternName) {
  return patternName
    .replace(/\s/gi, '-')
    .replace(/&/gi, 'and')
    .toLowerCase();
};

module.exports = {
  writeFileAsync,
  mkdirAsync,
  formatName
};
