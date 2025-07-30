import "./TaskDetailModal.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function TaskDetailModal({ onClose, taskId, refreshTask }) {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        setError("Failed to load task.");
        console.log({ message: `Error getting task with ${taskId}`, error });
      } finally {
        setLoading(false);
      }
    };
    getTask();
  }, [taskId]);

  const handleDelete = async () => {
    if (!task) return;
    try {
      await axios.delete(`${backendUrl}/api/tasks/${taskId}`);
      if (refreshTask) refreshTask();
      if (onClose) onClose();
    } catch (error) {
      console.log({ message: "Error deleting task", error });
      setError("Error deleting task.");
    }
  };

  const handleSave = async () => {
    const editedTask = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    };
    try {
      await axios.patch(`${backendUrl}/api/tasks/${taskId}`, editedTask);
      if (refreshTask) refreshTask();
      if (onClose) onClose();
    } catch (error) {
      console.log({ message: "Error saving task", error });
      setError("Error saving task.");
    }
  };

  if (loading) return <p className="task-detail__loading">Loading task...</p>;

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <section className="task-detail">
          <h2>Edit Task</h2>

          {error && <p className="task-detail__error">{error}</p>}

          <div className="task-detail__form">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={task.title || ""}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />

            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={task.status || "pending"}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              type="text"
              value={task.priority || ""}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={task.description || ""}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>

          <div className="task-detail__actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
            <button
              onClick={() => {
                console.log("🟡 Back clicked");
                try {
                  onClose();
                } catch (err) {
                  console.error("❌ Error calling onClose:", err);
                }
              }}
            >
              Back
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TaskDetailModal;
