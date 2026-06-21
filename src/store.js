const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) {
    return [];
  }
  const raw = fs.readFileSync(TASKS_FILE, 'utf8');
  return raw.trim() === '' ? [] : JSON.parse(raw);
}

function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks, TASKS_FILE };
