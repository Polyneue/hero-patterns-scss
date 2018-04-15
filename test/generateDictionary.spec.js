const fs = require('fs');
const each = require('mocha-each');
const { promisify } = require('util');
const { expect } = require('chai');
const { distPartials, data } = require('./utilities');
const generateDictionary = require('../libs/generateDictionary');

// Async utilities
const readFileAsync = promisify(fs.readFile);

describe('# generateDictionary()', function () {
  // Create the index.scss file for tests
  before(async function () {
    await generateDictionary(data.patternNames(), distPartials);
  });

  describe('patterns-map.scss should be generated', function () {
    // Verify successful build of index.scss
    it('patterns-map.scss exists', async function () {
      const result = await fs.existsSync(`${distPartials}/patterns-map.scss`);
      expect(result).to.be.true;
    });
  });

  describe('patterns-map.scss has all of the expected patterns', function () {
    // Set up test file contents
    let testFile;
    before(async function () {
      testFile = await readFileAsync(`${distPartials}/patterns-map.scss`, { encoding: 'utf8' });
    });

    // Iterate over pattern names to make sure they exist
    each(data.patternNamesFormatted()).it('has %j pattern', function (name) {
      // ^\t+\'[a-z\s]*\':\s\$[a-z-]*,$
      const re = new RegExp(`'[a-z\\s]*':\\s\\$${name}*,$`, 'gm');
      expect(testFile).to.match(re);
    });
  });
});
