interface Announcement {
  createdAt: number;
  content: string;
}

interface Todo {
  announcement: Announcement[];
  startTime: number;
  isPaused: boolean;
  durationInSeconds: number;
}

let todos: Todo = {
  announcement: [
    {
      createdAt: new Date('2023-07-25 12:00').getTime(),
      content: 'Contest will start on August 26, 2023, at 13:00',
    },
    {
      createdAt: new Date('2023-07-26 09:00').getTime(),
      content: '**Make sure to read the rules and guidelines**',
    },
    {
      createdAt: new Date('2023-07-27 10:00').getTime(),
      content:
        '**The contest is now open for registration, the password for each pc is `ioi`**',
    },
  ],
  startTime: new Date('2023-08-26 13:00').getTime(),
  isPaused: false,
  durationInSeconds: 5 * 3600,
};

export function getTodos() {
  return todos;
}

export function setTodos(newTodos) {
  todos = newTodos;
}
