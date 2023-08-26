// state.js
let todos = {
  announcement: ['Item 1', 'Item 2'],
  startTime: new Date('2023-08-26 18:00').getTime(),
  isPaused: false,
  durationInSeconds: 5 * 3600,
};

export function getTodos() {
  return todos;
}

export function setTodos(newTodos) {
  todos = newTodos;
}
