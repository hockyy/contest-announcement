import React from 'react';
import ReactMarkdown from 'react-markdown';

const Announcement = ({ announcement }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      {announcement.map((item, index) => (
        <div
          key={index}
          className="mb-2 flex flex-row items-center justify-start gap-2 rounded bg-gray-100 px-4 py-1 text-blue-800"
          style={{ fontSize: '30px' }}
        >
          {/* Markdown content */}
          <div className={'border-2 bg-gray-300 px-3 py-1 my-2 font-bold'}>
            ⏰ {formatTime(item.createdAt)}
          </div>
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
