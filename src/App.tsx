import { motion } from "motion/react";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import type { Task } from "./models/task";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";

const TASKS_STORAGE_KEY = "tasks";

function App() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!storedTasks) return [];

      const parsedTasks: Task[] = JSON.parse(storedTasks);
      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
      console.error("Erreur lors de la lecture du localStorage :", error);
      return [];
    }
  });
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All Priority",
    orderBy: "None",
  });

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement dans le localStorage :",
        error,
      );
    }
  }, [tasks]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // if (!normalizedQuery) {
    //   return tasks;
    // }

    const filtered = tasks.filter((task) => {
      const matchStatus =
        filters.status === "All" ||
        (filters.status === "Completed" ? task.completed : !task.completed);

      const matchPriority =
        filters.priority === "All Priority" ||
        task.priority === filters.priority;

      const title = task.title.toLowerCase();
      const description = task.description?.toLowerCase() ?? "";

      const matchText =
        !normalizedQuery ||
        title.includes(normalizedQuery) ||
        description.includes(normalizedQuery);

      return matchStatus && matchPriority && matchText;
    });

    if (filters.orderBy === "Priority") {
      return [...filtered].sort((a, b) => {
        const priorityOrder = {
          High: 3,
          Medium: 2,
          Low: 1,
        };

        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    }

    if (filters.orderBy === "Due Date") {
      return [...filtered].sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    return filtered;
  }, [tasks, searchQuery, filters]);

  const onSubmit = (task) => {
    setTasks((prev) => [...prev, task]);
    setAddModalOpen(false);
  };

  const onDelete = (id: Task["id"]) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: Task["id"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#1F2937] mb-3">
            My Tasks
          </h1>
          <p className="text-lg text-gray-500">
            Stay organized and get things done
          </p>
        </motion.div>

        <div className="flex justify-center items-center w-full">
          <button
            className="flex items-center gap-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-base px-6 py-3 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => setAddModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Task
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
        <FilterBar
          onStatusChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value }))
          }
          onPriorityChange={(value) =>
            setFilters((prev) => ({ ...prev, priority: value }))
          }
          onOrderByChange={(value) =>
            setFilters((prev) => ({ ...prev, orderBy: value }))
          }
        />
        <TaskForm
          isOpen={addModalOpen}
          mode="create"
          onClose={() => setAddModalOpen(false)}
          onSubmit={onSubmit}
        />
        <TaskList
          tasks={filteredTasks}
          onDelete={onDelete}
          toggleTask={toggleTask}
        />
      </div>
    </div>
  );
}

export default App;
