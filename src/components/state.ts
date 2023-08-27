interface Announcement {
  createdAt: string;
  content: string;
}

interface Todo {
  announcement: Announcement[];
  startTime: number;
  isPaused: boolean;
  durationInSeconds: number;
  showAnnouncementCreatedTime: boolean;
  announcementFontSize: string;
  timeFontSize: string;
  language: string;
}

let todos: Todo = {
  announcement: [
    {
      createdAt: '2023-07-25 12:00',
      content: 'Contest will start on August 26, 2023, at 13:00',
    },
    {
      createdAt: '2023-07-26 15:00',
      content: '**Make sure to read the rules and guidelines**',
    },
    {
      createdAt: '2023-07-27 10:00',
      content:
        '**The contest is now open for registration, the password for each pc is `ioi`**',
    },
  ],
  startTime: new Date('2023-08-26 13:00').getTime(),
  isPaused: false,
  durationInSeconds: 5 * 3600,
  showAnnouncementCreatedTime: true,
  announcementFontSize: '50px',
  timeFontSize: '200px',
  language: 'en',
};

export function getTodos() {
  return todos;
}

export function setTodos(newTodos) {
  todos = newTodos;
}
