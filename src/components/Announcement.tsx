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
          className="mb-2 flex flex-row items-center justify-start gap-2 rounded bg-gray-100 p-4 text-blue-800"
        >
          {/* Markdown content */}
          <div className={'border-2 bg-gray-300 p-2'}>
            ⏰ {formatTime(item.createdAt)}
          </div>
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
