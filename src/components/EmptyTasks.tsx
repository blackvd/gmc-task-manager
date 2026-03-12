import React from 'react';

const EmptyTasks = () => {
  return (
    <>
      <div className="bg-white rounded-2xl px-20 py-12 flex flex-col items-center gap-6 shadow-sm w-full">
        {/* Icon Container */}
        <div className="w-20 h-20 rounded-full bg-slate-100 flex justify-center items-center">
          {/* Task List Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Checkbox */}
            <rect
              x="3"
              y="5"
              width="5"
              height="5"
              rx="1"
              stroke="#9ca3af"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Checkmark */}
            <path
              d="M4.5 7.5L5.5 8.5L7 6.5"
              stroke="#9ca3af"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lines */}
            <line x1="10" y1="7" x2="20" y2="7" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="12" x2="20" y2="12" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="17" x2="20" y2="17" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
            {/* Second checkbox outline */}
            <rect
              x="3"
              y="10"
              width="5"
              height="5"
              rx="1"
              stroke="#9ca3af"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Message */}
        <p className="text-slate-500 text-sm text-center font-medium">
          You have no tasks yet. Add one to get started.
        </p>
      </div>
    </>
  );
};

export default EmptyTasks;
