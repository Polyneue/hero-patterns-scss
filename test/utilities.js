const path = require('path');
const patterns = require('../patterns.json');
const { formatName } = require('../libs/utilities');

// Dist directory for tests
const distDir = path.join(__dirname, 'tmp');
const dist = path.join(distDir, 'patterns');

// Subset of patterns to be tested
const data = {
  patterns: patterns.slice(0, 5),
  // Get pattern names only
  patternNames() {
    return this.patterns.map(pattern => pattern.name);
  },
  // Get pattern names formatted as "formal-invitation"
  patternNamesFormatted() {
    return this.patternNames().map(name => formatName(name));
  }
};

module.exports = {
  patterns,
  distDir,
  dist,
  data,
  formatName
};
