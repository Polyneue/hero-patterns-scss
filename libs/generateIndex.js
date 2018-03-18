const { formatName, writeFileAsync } = require('./utilities');

/**
 * Generate the index file that references all patterns
 * @param {Array} patternNames - collection of pattern names
 * @param {String} dist - location to write index to
 * @return {Promise} write file resolution
 */
const generateIndex = async function (patternNames, dist) {
  try {
    const output = patternNames
      .map(name => `@import './${formatName(name)}';`)
      .sort()
      .join('\n');

    return await writeFileAsync(`${dist}/index.scss`, output, 'utf8');
  } catch (err) {
    throw err;
  }
};

module.exports = generateIndex;
