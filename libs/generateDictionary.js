const { formatName, writeFileAsync } = require('./utilities');

/**
 * Generate the dictionary file that references all patterns by name
 * @param {Array} patternNames - collection of pattern names
 * @param {String} dist - location to write index to
 * @return {Promise} write file resolution
 */
const generateDictionary = async function (patternNames, dist) {
  try {
    const notice = [
      '////',
      '// Pattern Reference Map',
      '////',
      ''
    ].join('\n');

    let output = `${notice}\n$pattern-map: (\n`;

    output += patternNames
      .map(name => `\t'${name.toLowerCase()}': $${formatName(name)},`)
      .sort()
      .join('\n');

    output += '\n);';

    return await writeFileAsync(`${dist}/patterns-map.scss`, output, 'utf8');
  } catch (err) {
    throw err;
  }
};

module.exports = generateDictionary;
