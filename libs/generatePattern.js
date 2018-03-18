/* eslint-disable import/no-extraneous-dependencies */
const { formatName, writeFileAsync } = require('./utilities');
const optimize = require('mini-svg-data-uri');

/**
 * Generate a pattern file based on name/image
 * @param {Object} pattern - pattern data to generate
 * @param {String} dist - location to write pattern to
 * @return {Promise} write file resolution
 */
const generatePattern = async function (pattern, dist) {
  try {
    const name = formatName(pattern.name);
    const notice = [
      '////',
      `// Pattern: ${pattern.name}`,
      '// License: Pattern from http://www.heropatterns.com',
      '////'
    ].join('\n');

    let svg = optimize(pattern.image);
    svg = svg.replace("fill='black'", "fill='{{ fill }}' fill-opacity='{{ opacity }}'");

    const output = `${notice}\n$${name}: "${svg}";`;

    return await writeFileAsync(`${dist}/${name}.scss`, output, 'utf8');
  } catch (err) {
    throw err;
  }
};

module.exports = generatePattern;
