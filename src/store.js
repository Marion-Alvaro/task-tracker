const fs = require('fs');
const path = require('path');
const { ValidationError } = require('./errors');

const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  const raw = fs.readFileSync(TASKS_FILE, 'utf8');
  if (raw.trim() === '') return [];
  try {
    return JSON.parse(raw);
  } catch {
    throw new ValidationError(`${TASKS_FILE} is corrupted or not valid JSON`);
  }
}

function saveTasks(tasks) {
  const tmp = `${TASKS_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(tasks, null, 2));
  fs.renameSync(tmp, TASKS_FILE);
}

module.exports = { loadTasks, saveTasks, TASKS_FILE };
