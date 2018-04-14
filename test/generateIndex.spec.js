const fs = require('fs');
const each = require('mocha-each');
const { promisify } = require('util');
const { expect } = require('chai');
const { distPartials, data } = require('./utilities');
const generateIndex = require('../libs/generateIndex');

// Async utilities
const readFileAsync = promisify(fs.readFile);

describe('# generateIndex()', function () {
  // Create the index.scss file for tests
  before(async function () {
    await generateIndex(data.patternNames(), distPartials);
  });

  describe('patterns.scss should be generated', function () {
    // Verify successful build of index.scss
    it('patterns.scss exists', async function () {
      const result = await fs.existsSync(distPartials);
      expect(result).to.be.true;
    });
  });

  describe('patterns.scss has all of the expected patterns', function () {
    // Set up test file contents
    let testFile;
    before(async function () {
      testFile = await readFileAsync(`${distPartials}/patterns.scss`, { encoding: 'utf8' });
    });

    // Iterate over pattern names to make sure they exist
    each(data.patternNamesFormatted()).it('has %j pattern', function (name) {
      const re = new RegExp(`^@import+\\s+'..\\/patterns\\/${name}*'+;$`, 'gm');
      expect(testFile).to.match(re);
    });
  });
});
