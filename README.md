# task-tracker
A simple cli project that let's you create task or to do list

## Project page
Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

## Requirements
- Node.js >= 14

No install step needed — this project has zero npm dependencies.

## Usage
Clone or fork the repo, then run commands directly with Node:

```bash
node task-cli.js add "Buy milk"
node task-cli.js list
node task-cli.js list todo            # or: in-progress, done
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 1
node task-cli.js update 1 "Buy oat milk"
node task-cli.js delete 1
```

### Optional: install as a global `task-cli` command
```bash
npm link
task-cli add "Buy milk"
```

## Project structure
```
task-tracker/
├── task-cli.js          # entry point
├── src/
│   ├── args.js          # CLI argument parsing
│   ├── command.js       # command dispatch + output formatting
│   ├── errors.js        # custom error types
│   ├── store.js         # tasks.json read/write
│   └── taskManager.js   # core task business logic
├── tests/
│   └── test.js          # smoke tests
├── package.json
└── README.md
```

## Data storage
Tasks are stored in a `tasks.json` file created in whatever directory you run
the command from — run it from the project root to keep one consistent file.

## Running tests
```bash
npm test
```