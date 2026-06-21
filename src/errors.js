class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class TaskNotFoundError extends Error {
  constructor(id) {
    super(`Task ${id} not found`);
    this.name = 'TaskNotFoundError';
  }
}

module.exports = { ValidationError, TaskNotFoundError };
