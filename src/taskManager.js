const { loadTasks, saveTasks } = require('./store');
const { ValidationError, TaskNotFoundError } = require('./errors');

const STATUSES = ['todo', 'in-progress', 'done'];

function nextId(tasks) {
  return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

function findTaskOrThrow(tasks, id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new TaskNotFoundError(id);
  }
  return task;
}

function addTask(description) {
  if (!description || !description.trim()) {
    throw new ValidationError('Description cannot be empty');
  }
  const tasks = loadTasks();
  const now = new Date().toISOString();
  const task = {
    id: nextId(tasks),
    description: description.trim(),
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function updateTask(id, description) {
  if (!description || !description.trim()) {
    throw new ValidationError('Description cannot be empty');
  }
  const tasks = loadTasks();
  const task = findTaskOrThrow(tasks, id);
  task.description = description.trim();
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  return task;
}

function deleteTask(id) {
  const tasks = loadTasks();
  findTaskOrThrow(tasks, id);
  saveTasks(tasks.filter((t) => t.id !== id));
}

function setStatus(id, status) {
  if (!STATUSES.includes(status)) {
    throw new ValidationError(`Status must be one of: ${STATUSES.join(', ')}`);
  }
  const tasks = loadTasks();
  const task = findTaskOrThrow(tasks, id);
  task.status = status;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  return task;
}

function listTasks(filterStatus) {
  const tasks = loadTasks();
  if (!filterStatus) {
    return tasks;
  }
  if (!STATUSES.includes(filterStatus)) {
    throw new ValidationError(`Status must be one of: ${STATUSES.join(', ')}`);
  }
  return tasks.filter((t) => t.status === filterStatus);
}

module.exports = { addTask, updateTask, deleteTask, setStatus, listTasks, STATUSES };
