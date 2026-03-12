import { useState } from "react";

export default function FilterBar({ onStatusChange, onPriorityChange, onOrderByChange }) {
  const [activeStatus, setActiveStatus] = useState("All");
  const [priority, setPriority] = useState("All Priority");
  const [orderBy, setOrderBy] = useState("None");
  const [openDropdown, setOpenDropdown] = useState(null);

  const statuses = ["All", "Pending", "Completed"];
  const priorities = ["All Priority", "High", "Medium", "Low"];
  const orders = ["None", "Due Date", "Priority"];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    onStatusChange?.(status); // envoie la valeur au parent
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
    onPriorityChange?.(value);
    setOpenDropdown(null);
  };

  const handleOrderByChange = (value) => {
    setOrderBy(value);
    onOrderByChange?.(value);
    setOpenDropdown(null);
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="flex items-center gap-2 p-4 bg-white rounded-2xl shadow-sm w-full">
        {/* Status Buttons */}
        <div className="flex items-center gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                activeStatus === status
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 mx-1" />

        {/* Priority Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("priority")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            {priority}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-5 ${
                openDropdown === "priority" ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {openDropdown === "priority" && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-10 min-w-[150px] overflow-hidden">
              {priorities.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handlePriorityChange(item);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150
                  ${
                    priority === item
                      ? "bg-indigo-50 text-indigo-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 mx-1" />

        {/* Due Date Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("orderBy")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            {orderBy}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-5 ${
                openDropdown === "orderBy" ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {openDropdown === "orderBy" && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-10 min-w-[150px] overflow-hidden">
              {orders.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handleOrderByChange(item);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150
                  ${
                    orderBy === item
                      ? "bg-indigo-50 text-indigo-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
