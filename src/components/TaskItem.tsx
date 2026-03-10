import React from "react";
import type { Task } from "../models/task";

const priorityColors = {
  Low: "bg-green-100 text-green-600",
  Medium: "bg-yellow-100 text-yellow-600",
  High: "bg-red-100 text-red-600",
};

type TaskItemProps = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  toggleTask: () => void;
};

export default function TaskItem({ task, onEdit, onDelete, toggleTask }: TaskItemProps) {

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 w-full">
      {/* Left Section */}
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={toggleTask}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 transition-colors duration-200 ${
            task.completed
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300 bg-white"
          }`}
        >
          {task.completed && (
            <svg
              className="w-full h-full text-white p-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
        {/* Text Content */}
        <div className="flex flex-col gap-1">
          <span
            className={`font-semibold text-gray-800 text-sm ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </span>
          <span
            className={`text-sm text-gray-500 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.description}
          </span>
          {task.priority && (
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full w-fit ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
          )}
          <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            <span>{task.dueDate}</span>
          </div>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
