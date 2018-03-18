const path = require('path');
const { mkdirAsync } = require('./libs/utilities');
const generateIndex = require('./libs/generateIndex');
const generatePattern = require('./libs/generatePattern');
const patterns = require('./patterns.json');

// Set up build location
const dist = path.join(__dirname, 'dist', 'patterns');

(async function () {
  try {
    const generatePatternPromises = [];
    const patternNames = [];
    const patternLength = patterns.length;

    // Create Patterns directory
    await mkdirAsync(dist);

    // Iterate over the
    for (let i = 0; i < patternLength; i++) {
      const pattern = patterns[i];

      // Push Pattern name to be added to index generator
      patternNames.push(pattern.name);
      generatePatternPromises.push(generatePattern(pattern, dist));
    }

    // Write Pattern Files
    await Promise.all(generatePatternPromises);

    // Write Index File
    await generateIndex(patternNames, dist);
  } catch (err) {
    throw err;
  }
}());
