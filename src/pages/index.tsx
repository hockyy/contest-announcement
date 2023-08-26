import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function MyComponent() {
  const [todos, setTodos] = useState({
    announcement: [],
    startTime: null, // You could set a future start time here
    isPaused: false,
    durationInSeconds: 5 * 3600
  });

  const [timeLeft, setTimeLeft] = useState('0:00:00');
  const [statusMessage, setStatusMessage] = useState(
    'The contest will start in:'
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('/api/get'); // Adjust to your endpoint
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
    const intervalId = setInterval(fetchTodos, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = Date.now();

      if (!todos.startTime || currentTime < todos.startTime) {
        // Contest has not started yet
        const timeUntilStart = todos.startTime ? (todos.startTime - currentTime) / 1000 : 0;
        const hours = Math.floor(timeUntilStart / 3600);
        const minutes = Math.floor((timeUntilStart % 3600) / 60);
        const seconds = Math.floor(timeUntilStart % 60);
        setTimeLeft(`${String(hours).padStart(1, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        setStatusMessage('The contest will start in:');
      } else {
        const timeElapsedInSeconds = Math.floor((currentTime - todos.startTime) / 1000);

        if (timeElapsedInSeconds >= todos.durationInSeconds) {
          // Contest is done
          setStatusMessage('Contest is done.');
          setTimeLeft('0:00:00');
        } else {
          // Contest has started
          if (!todos.isPaused) {
            const timeRemainingInSeconds = todos.durationInSeconds - timeElapsedInSeconds;

            const hours = Math.floor(timeRemainingInSeconds / 3600);
            const minutes = Math.floor((timeRemainingInSeconds % 3600) / 60);
            const seconds = timeRemainingInSeconds % 60;

            setTimeLeft(`${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
            setStatusMessage('Time left:');
          }
        }
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [todos]);

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h6 id='status-message' className='mb-2'>
        {statusMessage}
      </h6>
      {/* Header */}
      <div id='header' className='text-center'>
        <h6 id='title' className='mb-0'>
          {todos.isPaused ? '(Paused)' : '(Active)'}
        </h6>
        <h1 id='timeLeft' className={'text-3xl'}>{timeLeft}</h1>
      </div>
    </div>
  );
}
