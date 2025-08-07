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

    const formatDateForMySQL = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return d.toISOString().slice(0, 19).replace("T", " ");
    };

    const editedTask = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      deadline: formatDateForMySQL(task.deadline),
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

  function formatForInput(val) {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d)) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  if (loading) return <p className="task-detail__loading">Loading task...</p>;

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <section className="task-detail">
          <h2>Task Details</h2>
          {error && <p className="task-detail__error">{error}</p>}

          <div className="task-detail__form">
            {/* Title */}
            <div className="task-detail__field">
              <span className="task-detail__label">Title</span>
              <input
                type="text"
                placeholder="Add a task title"
                value={task.title || ""}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </div>

            {/* Status (your snippet) */}
            <div className="task-detail__field">
              <span className="task-detail__label">Status</span>
              <select
                id="status"
                value={task.status || "pending"}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div className="task-detail__field">
              <span className="task-detail__label">Priority</span>
              <select
                value={task.priority || ""}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
              >
                <option value="" disabled hidden>
                  Select priority
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="task-detail__field">
              <span className="task-detail__label">Deadline</span>
              <input
                type="datetime-local"
                value={formatForInput(task.deadline)}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              />
            </div>

            {/* Comments */}
            <div className="task-detail__field">
              <span className="task-detail__label">Description</span>
              <textarea
                placeholder="Add any comments to your task"
                value={task.description || ""}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </div>
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
                  console.error("Error calling onClose:", err);
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
