import React, { useState } from "react";
import type { Task } from "../models/task";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  toggleTask: (id: string) => void;
};

export default function TaskList({ tasks, onDelete, toggleTask }: TaskListProps) {
  const [openModel, setOpenModal] = useState(false);
  const [ selectedTask, setSelectedTask ]= useState<Task | null>(null);

  const onSubmit = (task) => {
    console.log(task);
  };

  const editTask = (task) => {
    setOpenModal(true);
    setSelectedTask(task);
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => editTask(task)}
          onDelete={() => onDelete(task.id)}
          toggleTask={() => toggleTask(task.id)}
        />
      ))}

      <TaskForm
        isOpen={openModel}
        mode="edit"
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
        initialValues={{
            title: selectedTask?.title,
            description: selectedTask?.description,
            priority: selectedTask?.priority,
            dueDate: selectedTask?.dueDate
        }}
      />
    </div>
  );
}
