import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Announcement from '@/components/Announcement';
import { StringConstants } from '@/components/StringConstants';

export default function MyComponent() {
  const [todos, setTodos] = useState({
    announcement: [],
    startTime: null, // You could set a future start time here
    isPaused: false,
    durationInSeconds: 5 * 3600,
    showCreatedTime: false,
    fontSize: '30px',
    language: 'en',
  });

  const [announcementJSON, setAnnouncementJSON] = useState('');
  const [isJSONValid, setIsJSONValid] = useState(true);

  const [timeLeft, setTimeLeft] = useState('0:00:00');
  const [statusMessage, setStatusMessage] = useState(
    StringConstants.contestWillStart[todos.language]
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
        const timeUntilStart = todos.startTime
          ? (todos.startTime - currentTime) / 1000
          : 0;
        const hours = Math.floor(timeUntilStart / 3600);
        const minutes = Math.floor((timeUntilStart % 3600) / 60);
        const seconds = Math.floor(timeUntilStart % 60);
        setTimeLeft(
          `${String(hours).padStart(1, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`
        );
        setStatusMessage(StringConstants.contestWillStart[todos.language]);
      } else if (!todos.isPaused) {
        const timeElapsedInSeconds = Math.floor(
          (currentTime - todos.startTime) / 1000
        );

        if (timeElapsedInSeconds >= todos.durationInSeconds) {
          // Contest is done
          setStatusMessage(StringConstants.contestDone[todos.language]);
          setTimeLeft('0:00:00');
        } else {
          const timeRemainingInSeconds =
            todos.durationInSeconds - timeElapsedInSeconds;

          const hours = Math.floor(timeRemainingInSeconds / 3600);
          const minutes = Math.floor((timeRemainingInSeconds % 3600) / 60);
          const seconds = timeRemainingInSeconds % 60;

          setTimeLeft(
            `${hours}:${String(minutes).padStart(2, '0')}:${String(
              seconds
            ).padStart(2, '0')}`
          );
          setStatusMessage(StringConstants.timeLeft[todos.language]);
        }
      }
    }, 80);

    return () => clearInterval(timerId);
  }, [todos]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        id="status-message"
        className={'flex flex-col items-center justify-center gap-4 pt-5'}
      >
        {todos.isPaused ? (
          <div
            className="rounded bg-red-500 px-2 py-1 text-white"
            style={{ fontSize: '30px' }}
          >
            Paused
          </div>
        ) : null}
        <strong style={{ fontSize: '30px' }}>⏳ {statusMessage}</strong>
      </div>
      {/* Header */}
      <div id="timeLeft" className={'m-0 p-0'} style={{ fontSize: '200px' }}>
        {timeLeft}
      </div>
      <div
        id="announcement header"
        className={'mb-2 flex flex-col items-center justify-center gap-4'}
      >
        <strong style={{ fontSize: '30px' }}>📢 Announcement</strong>
      </div>
      <Announcement
        fontSize={todos.fontSize}
        announcement={todos.announcement}
        showCreatedTime={todos.showCreatedTime}
      />
    </div>
  );
}
