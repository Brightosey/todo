import { useState } from "react";

function useTask() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, description, priority) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status: pending,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => {
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "pending"
                  ? "in-progress"
                  : task.status === "in-progress"
                  ? "completed"
                  : "pending",
            }
          : task
      );
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    setTasks,
  };
}

export default useTask;
