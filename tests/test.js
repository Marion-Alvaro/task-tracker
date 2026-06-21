const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'task-cli-test-'));
process.chdir(tmpDir);

const taskManager = require('../src/taskManager');
const { TaskNotFoundError } = require('../src/errors');

const added = taskManager.addTask('Buy milk');
assert.strictEqual(added.status, 'todo');

const listed = taskManager.listTasks();
assert.strictEqual(listed.length, 1);
assert.strictEqual(listed[0].description, 'Buy milk');

const updated = taskManager.updateTask(added.id, 'Buy oat milk');
assert.strictEqual(updated.description, 'Buy oat milk');

taskManager.setStatus(added.id, 'done');
assert.strictEqual(taskManager.listTasks('done').length, 1);
assert.strictEqual(taskManager.listTasks('todo').length, 0);

taskManager.deleteTask(added.id);
assert.strictEqual(taskManager.listTasks().length, 0);

assert.throws(() => taskManager.deleteTask(999), TaskNotFoundError);

fs.rmSync(tmpDir, { recursive: true, force: true });

console.log('All tests passed.');
