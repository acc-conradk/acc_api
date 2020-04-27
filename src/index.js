// Set options as a parameter, environment variable, or rc file.
/** @type {*} */
const m = module;
require = require('esm')(m);
module.exports = require('./server.js');
