import { setTodos } from '@/components/state';

export default function editHandler(req, res) {
  if (req.method === 'POST') {
    const newTodos = req.body;
    setTodos(newTodos);
    res.status(200).json({ message: 'Updated successfully' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
