const taskManager = require('./taskManager');
const { ValidationError, TaskNotFoundError } = require('./errors');

function formatTask(task) {
  return `[${task.id}] (${task.status}) ${task.description}`;
}

const handlers = {
  add([description]) {
    const task = taskManager.addTask(description);
    console.log(`Added task (ID: ${task.id})`);
  },

  update([id, description]) {
    const task = taskManager.updateTask(Number(id), description);
    console.log(`Updated task ${task.id}`);
  },

  delete([id]) {
    taskManager.deleteTask(Number(id));
    console.log(`Deleted task ${id}`);
  },

  'mark-in-progress'([id]) {
    taskManager.setStatus(Number(id), 'in-progress');
    console.log(`Marked task ${id} as in-progress`);
  },

  'mark-done'([id]) {
    taskManager.setStatus(Number(id), 'done');
    console.log(`Marked task ${id} as done`);
  },

  list([filterStatus]) {
    const tasks = taskManager.listTasks(filterStatus);
    if (tasks.length === 0) {
      console.log('No tasks found.');
      return;
    }
    tasks.forEach((task) => console.log(formatTask(task)));
  },
};

function runCommand({ command, args }) {
  const handler = handlers[command];
  if (!handler) {
    console.error(`Unknown command: ${command ?? '(none)'}`);
    console.error('Available commands: add, update, delete, mark-in-progress, mark-done, list');
    process.exitCode = 1;
    return;
  }

  try {
    handler(args);
  } catch (err) {
    if (err instanceof ValidationError || err instanceof TaskNotFoundError) {
      console.error(`Error: ${err.message}`);
      process.exitCode = 1;
    } else {
      throw err;
    }
  }
}

module.exports = { runCommand };
