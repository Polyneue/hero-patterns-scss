const fs = require('fs');
const each = require('mocha-each');
const { promisify } = require('util');
const { expect } = require('chai');
const { dist, data } = require('./utilities');
const generateIndex = require('../libs/generateIndex');

// Async utilities
const readFileAsync = promisify(fs.readFile);

describe('# generateIndex()', function () {
  // Create the index.scss file for tests
  before(async function () {
    await generateIndex(data.patternNames(), dist);
  });

  describe('index.scss should be generated', function () {
    // Verify successful build of index.scss
    it('index.scss exists:', async function () {
      const result = await fs.existsSync(dist);
      expect(result).to.be.true;
    });
  });

  describe('index.scss has all of the expected patterns', function () {
    // Set up test file contents
    let testFile;
    before(async function () {
      testFile = await readFileAsync(`${dist}/index.scss`, { encoding: 'utf8' });
    });

    // Iterate over pattern names to make sure they exist
    each(data.patternNamesFormatted()).it('has %j pattern', function (name) {
      const re = new RegExp(`^@import+\\s+'.\\/${name}*'+;$`, 'gm');
      expect(testFile).to.match(re);
    });
  });
});
