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
          className="relative mb-2 rounded bg-gray-100 p-2 text-blue-800"
        >
          {/* Markdown content */}
          <ReactMarkdown>{item.content}</ReactMarkdown>

          {/* Time bubble */}
          <div className="absolute right-0 top-0 rounded-full bg-blue-500 px-2 py-1 text-xs text-white">
            {formatTime(item.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
