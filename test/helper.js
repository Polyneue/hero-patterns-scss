const fs = require('fs');
const rimraf = require('rimraf');
const { promisify } = require('util');
const { distDir, distPatterns, distPartials } = require('./utilities');

// Async Utilities
const mkdirAsync = promisify(fs.mkdir);
const asyncRimraf = promisify(rimraf);

// Create temporary dist directory
before(async function () {
  console.log('Creating temporary dist directory.');
  try {
    await mkdirAsync(distDir);
    await mkdirAsync(distPatterns);
    await mkdirAsync(distPartials);
  } catch (err) {
    throw err;
  }
});

// Handle clean up of temp folder
after(async function () {
  console.log('Cleaning up generated patterns.');
  try {
    await asyncRimraf(distDir);
  } catch (err) {
    throw err;
  }
});
