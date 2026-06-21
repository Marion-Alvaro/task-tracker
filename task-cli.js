#!/usr/bin/env node
const { parseArgs } = require('./src/args');
const { runCommand } = require('./src/command');

runCommand(parseArgs(process.argv.slice(2)));
