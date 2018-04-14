const path = require('path');
const { mkdirAsync } = require('./libs/utilities');
const generateIndex = require('./libs/generateIndex');
const generateDictionary = require('./libs/generateDictionary');
const generatePattern = require('./libs/generatePattern');
const patterns = require('./patterns.json');

// Set up build location
const dist = path.join(__dirname, 'dist');
const patternsDir = path.join(dist, 'patterns');
const partialsDir = path.join(dist, 'partials');

(async function () {
  try {
    const generatePatternPromises = [];
    const patternNames = [];
    const patternLength = patterns.length;

    // Create Patterns/Partials Directories
    await mkdirAsync(patternsDir);
    await mkdirAsync(partialsDir);

    // Iterate over the patterns list
    for (let i = 0; i < patternLength; i++) {
      const pattern = patterns[i];

      // Push Pattern name to be added to index generator
      patternNames.push(pattern.name);
      generatePatternPromises.push(generatePattern(pattern, patternsDir));
    }

    // Write Pattern Files
    await Promise.all(generatePatternPromises);

    // Write Index File
    await generateIndex(patternNames, partialsDir);
    await generateDictionary(patternNames, partialsDir);
  } catch (err) {
    throw err;
  }
}());
