function parseArgs(argv) {
  const [command, ...args] = argv;
  return { command, args };
}

module.exports = { parseArgs };
