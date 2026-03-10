import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Task } from "../models/task";
import { v4 as uuidv4 } from 'uuid';

const options = ["Low", "Medium", "High"];

type TaskModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValues?: Partial<Pick<Task, "title" | "description" | "priority" | "dueDate">>;
  onClose: () => void;
  onSubmit: (values: Omit<Task, "id">) => void; // ou Task si tu veux renvoyer l'id aussi
};

const PrioritySelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Fermer si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-64">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 font-medium hover:border-gray-300 transition-colors cursor-pointer"
      >
        <span>{value}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="font-medium">{option}</span>
              {value === option && (
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const defaultValues = {
  title: "",
  description: "",
  dueDate: "",
};

export default function TaskForm({ isOpen, mode, initialValues, onClose, onSubmit }: TaskModalProps) {
  const isEdit = mode === "edit";

  const [priority, setPriority] = useState(initialValues?.priority || "Medium");
  const mergedInitial = useMemo(
    () => ({ ...defaultValues, ...(initialValues ?? {}) }),
    [initialValues]
  );

  const [form, setForm] = useState(mergedInitial);

  useEffect(() => {
    if (!isOpen) return;
    setForm(mergedInitial);
  }, [isOpen, mergedInitial]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // petit contrôle minimal
    if (!form.title.trim()) return;

    onSubmit({
      id: uuidv4(),
      title: form.title.trim(),
      description: form.description.trim(),
      priority: priority,
      dueDate: form.dueDate,
      completed: false
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors text-xl font-light cursor-pointer"
            onClick={onClose}
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {!isEdit ? "Create New Task" : "Edit New Task"}
            </h2>
            <p className="text-gray-400 text-sm">
              {!isEdit
                ? "Add a new task to your list. Fill in the details below."
                : "Update the task details below."}
            </p>
          </div>

          {/* Task Title */}
          <div className="w-full mb-5">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Task Title <span className="text-[#4F46E5]">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter task title..."
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#4F46E5] transition-colors"
            />
          </div>

          {/* Description */}
          <div className="w-full mb-5">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description
            </label>
            <textarea
              placeholder="Add more details about this task..."
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Priority & Due Date */}
          <div className="flex gap-4 mb-8">
            {/* Priority */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Priority
              </label>
              <PrioritySelect value={priority} onChange={setPriority} />
            </div>

            {/* Due Date */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-400 focus:outline-none focus:border-[#4F46E5] transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              className="flex-1 border border-gray-200 rounded-2xl py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
            className="flex-1 flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-2xl py-3 transition-colors cursor-pointer shadow-md"
            onClick={handleSubmit}>
              {!isEdit ? (
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              )}

              <span>{isEdit ? "Save Changes" : "Add Task"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
