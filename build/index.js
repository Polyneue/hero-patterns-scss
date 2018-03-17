/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const optimize = require('mini-svg-data-uri');
const data = require('./patterns.js');

const dist = path.join(__dirname, '..', 'dist', 'patterns');

// Utilities for Async
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

/**
 * Format Pattern Name
 * @param {String} patternName - name of the pattern
 * @return {String} name in the following format 4-point-star
 */
const formatPatternName = function (patternName) {
  return patternName
    .replace(/\s/gi, '-')
    .replace(/&/gi, 'and')
    .toLowerCase();
};

/**
 * Generate a pattern file based on name/image
 * @param {Object} pattern - pattern data to generate
 */
const generatePattern = async function (pattern) {
  try {
    const name = formatPatternName(pattern.name);

    let notice = '////\n';
    notice += `// Pattern: ${pattern.name}\n`;
    notice += '// License: Pattern from http://www.heropatterns.com\n';
    notice += '////';

    let svg = optimize(pattern.image);
    svg = svg.replace("fill='black'", "fill='{{ fill }}' fill-opacity='{{ opacity }}'");

    const output = `${notice}\n$${name}: "${svg}";`;

    return await writeFileAsync(`${dist}/${name}.scss`, output, 'utf8');
  } catch (err) {
    throw err;
  }
};

/**
 * Generate the index file that references all patterns
 * @param {Array} patternNames - collection of pattern names
 */
const generatePatternIndex = async function (patternNames) {
  try {
    const output = patternNames
      .map(name => `@import './${formatPatternName(name)}';`)
      .sort()
      .join('\n');

    return await writeFileAsync(`${dist}/index.scss`, output, 'utf8');
  } catch (err) {
    throw err;
  }
};

(async function () {
  try {
    const generatePatternPromises = [];
    const patternNames = [];
    const patternLength = data.patterns.length;

    // Create Patterns directory
    await mkdirAsync(dist);

    // Iterate over the
    for (let i = 0; i < patternLength; i++) {
      const pattern = data.patterns[i];

      // Push Pattern name to be added to index generator
      patternNames.push(pattern.name);
      generatePatternPromises.push(generatePattern(pattern));
    }

    // Write Pattern Files
    await Promise.all(generatePatternPromises);

    // Write Index File
    await generatePatternIndex(patternNames);
  } catch (err) {
    throw err;
  }
}());
