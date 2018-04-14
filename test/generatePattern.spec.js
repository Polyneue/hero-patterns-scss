const fs = require('fs');
const each = require('mocha-each');
const { promisify } = require('util');
const { expect } = require('chai');
const { distPatterns, data } = require('./utilities');
const generatePattern = require('../libs/generatePattern');

// Async utilities
const readFileAsync = promisify(fs.readFile);

describe('# generatePattern()', function () {
  // Create the Pattern files for testing
  before(async function () {
    const patternPromises = [];

    for (let i = 0; i < data.patterns.length; i++) {
      const pattern = data.patterns[i];
      patternPromises.push(generatePattern(pattern, distPatterns));
    }

    await Promise.all(patternPromises);
  });

  describe('Pattern files should be generated', function () {
    // Iterate over pattern names to make sure their file exists
    each(data.patternNamesFormatted()).it('%j scss exists', async function (name) {
      const result = await fs.existsSync(`${distPatterns}/${name}.scss`);
      expect(result).to.be.true;
    });
  });

  describe('Pattern files should have the content', function () {
    each(data.patternNamesFormatted()).it('%j scss is formatted correctly', async function (name) {
      const contents = await readFileAsync(`${distPatterns}/${name}.scss`);
      const re = new RegExp(`^\\$+${name}+:+\\s+".*"+;`, 'gm');
      expect(contents).to.match(re);
    });
  });
});
