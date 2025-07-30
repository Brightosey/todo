import "./TaskItem.scss";
import Change from "../../assets/Icon/change.png";
import Trash from "../../assets/Icon/trash.png";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskDetailModal from "../TaskDetailModal/TaskDetailModal";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function TaskItem() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const toggleStatus = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!tasks) return;
    const nextStatus =
      task.status === "pending"
        ? "in-progress"
        : task.status === "in-progress"
        ? "completed"
        : "pending";

    try {
      const response = await axios.patch(`${backendUrl}/api/tasks/${id}`, {
        status: nextStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
      );
    } catch (error) {
      console.log("Error patching task", error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tasks`);
      console.log("Fetched tasks:", response.data);
      /* const sortedTask = [...response.data].sort((a, b) =>
        a.status.localeCompare(b.status)
      ); */
      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Selected task ID:", selectedTaskId);
    fetchTask();
  }, [selectedTaskId]);

  const deleteTask = async (id) => {
    if (!tasks) return;
    try {
      await axios.delete(`${backendUrl}/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  if (tasks.length === 0) {
    return <p className="task-item__empty">No tasks available.</p>;
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li
            className="task-item"
            key={task.id}
            onClick={() => setSelectedTaskId(task.id)}
          >
            <div className="task-item__header">
              <p className="task-item__title">{task.title}</p>
              <p
                className={`task-item__status task-item__status--${task.status}`}
              >
                {task.status}
              </p>
              <p
                className={`task-item__priority task-item__priority--${task.priority}`}
              >
                {task.priority}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {selectedTaskId && (
        <TaskDetailModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          refreshTask={fetchTask}
        />
      )}
    </>
  );
}

export default TaskItem;
