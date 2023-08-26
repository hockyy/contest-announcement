// pages/api/get.js

import { getTodos } from '@/components/state';

export default function getHandler(req, res) {
  const todos = getTodos();
  res.status(200).json(todos);
}
