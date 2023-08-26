// pages/api/edit.js

import { getTodos, setTodos } from '@/components/state';

export default function editHandler(req, res) {
  if (req.method === 'POST') {
    const { action, value } = req.body;
    const todos = getTodos();

    if (action === 'add') {
      todos.announcement.push(value);
    } else if (action === 'remove') {
      todos.announcement = todos.announcement.filter((item) => item !== value);
    } else if (action === 'pause') {
      todos.isPaused = true;
    } else if (action === 'resume') {
      todos.isPaused = false;
    }

    setTodos(todos);

    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).json({ status: 'Method not allowed' });
  }
}
