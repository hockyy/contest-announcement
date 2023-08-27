// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datetime-picker/dist/DateTimePicker.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-calendar/dist/Calendar.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-clock/dist/Clock.css';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DateTimePicker from 'react-datetime-picker';
import { toast, ToastContainer } from 'react-toastify';

import Announcement from '@/components/Announcement';
import { BeautifulButton } from '@/components/BeautifulButton';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const UpdatePage = () => {
  const [todos, setTodos] = useState({
    announcement: [],
    startTime: new Date(),
    isPaused: false,
    durationInSeconds: 0,
  });

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [announcement, setAnnouncement] = useState([]);
  const [showCreatedTime, setShowCreatedTime] = useState(false);
  const [announcementJSON, setAnnouncementJSON] = useState('');
  const [isJSONValid, setIsJSONValid] = useState(true);
  const [fontSize, setFontSize] = useState('30px');
  const [language, setLanguage] = useState('en');

  const handleAnnouncementJSONChange = (e) => {
    const newJSON = e.target.value;
    try {
      const parsed = JSON.parse(newJSON);
      setAnnouncement(parsed);
      setIsJSONValid(true);
    } catch (err) {
      console.log(err);
      setIsJSONValid(false);
    }
    setAnnouncementJSON(newJSON);
  };

  const fetchData = async () => {
    const response = await axios.get('/api/get');
    toast('OK resetted');
    setTodos(response.data);
    setStartTime(new Date(response.data.startTime));
    setDuration(response.data.durationInSeconds);
    setFontSize(response.data.fontSize);
    setIsPaused(response.data.isPaused);
    setAnnouncementJSON(JSON.stringify(response.data.announcement, null, 2));
    handleAnnouncementJSONChange({
      target: { value: JSON.stringify(response.data.announcement, null, 2) },
    });
    setShowCreatedTime(response.data.showCreatedTime);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!isJSONValid) return;
    const updatedTodos = {
      ...todos,
      startTime: startTime.getTime(),
      durationInSeconds: duration,
      isPaused,
      announcement,
      showCreatedTime,
      fontSize,
      language,
    };

    await axios
      .post('/api/edit', updatedTodos)
      .then((response) => {
        toast('OK updated');
      })
      .catch((error) => {
        toast(error.toString);
      }); // Replace with your actual API endpoint
  };

  return (
    <Main meta={<Meta title="Edit page" description="Edit page" />}>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={'flex flex-col items-center justify-center'}>
        <div className="container m-4 mx-auto bg-white p-4 text-black">
          <h1 className="mb-4 text-2xl">Update Settings</h1>

          {/* Start Time */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Start Time
            </label>
            <DateTimePicker onChange={setStartTime} value={startTime} />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Duration (seconds)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>

          {/* Font Size */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Font Size of Announcements
            </label>
            <input
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>

          {/* Font Size */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Language Option
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>

          {/* Is Paused */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Is Paused
            </label>
            <input
              type="checkbox"
              checked={isPaused}
              onChange={() => setIsPaused(!isPaused)}
              className="mr-2"
            />
            Pause
          </div>

          {/* Set show created time */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Show created time
            </label>
            <input
              type="checkbox"
              checked={showCreatedTime}
              onChange={() => setShowCreatedTime(!showCreatedTime)}
              className="mr-2"
            />
            Show Created Time
          </div>

          {/* Announcement JSON editor */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Announcement JSON
            </label>
            <textarea
              value={announcementJSON}
              onChange={handleAnnouncementJSONChange}
              className="h-40 w-full rounded border"
            />
          </div>

          {/* Update Button */}
          <BeautifulButton
            disabled={!isJSONValid}
            buttonType={'primary'}
            message={'Update'}
            onClick={handleUpdate}
          />
          <BeautifulButton
            buttonType={'secondary'}
            message={'Reset Pending Changes'}
            onClick={fetchData}
          />
        </div>
        <div
          id="preview-header"
          className={'mb-2 flex flex-col items-center justify-center gap-4'}
        >
          <strong style={{ fontSize: '30px' }}>📢 Announcement Preview</strong>
        </div>
        <div>
          <Announcement
            announcement={announcement}
            fontSize={fontSize}
            showCreatedTime={showCreatedTime}
          ></Announcement>
        </div>
      </div>
    </Main>
  );
};

export default UpdatePage;
