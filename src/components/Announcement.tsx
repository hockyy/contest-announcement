import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactMarkdown from 'react-markdown';

const Announcement = ({ announcement }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={'flex flex-col'} style={{ width: '60vw' }}>
      {announcement.map((item, index) => (
        <div
          key={index}
          className="mb-2 flex flex-row items-center justify-start gap-5 rounded bg-gray-100 px-4 py-1 text-blue-800"
          style={{ fontSize: '30px', fontWeight: '500' }}
        >
          <div
            className={
              'my-2 border-2 bg-gray-300 px-3 py-1 text-center font-bold'
            }
          >
            {formatTime(item.createdAt)}
          </div>
          <ReactMarkdown
            components={{
              strong: ({ node, ...props }) => (
                <strong style={{ fontWeight: '800' }} {...props} />
              ),
              p: ({ node, ...props }) => (
                <p style={{ fontWeight: '600' }} {...props} />
              ),

              code: ({ node, inline, className, children, ...props }) => {
                // Style inline `code`
                if (inline) {
                  return (
                    <code
                      style={{
                        padding: '0.2em 0.4em',
                        margin: 0,
                        fontSize: '85%',
                        backgroundColor: 'rgba(48,48,58,0.14)',
                        borderRadius: '3px',
                      }}
                    >
                      {children}
                    </code>
                  );
                }
                // Handle block code if you'd like
                return null;
              },
            }}
          >
            {item.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
