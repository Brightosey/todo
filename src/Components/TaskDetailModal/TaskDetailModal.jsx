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

  const formatForInput = (val) => {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d)) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  if (loading) return <p className="edit-task__loading">Loading task...</p>;

  return (
    <div className="edit-task__overlay" onClick={onClose}>
      <div className="edit-task__modal" onClick={(e) => e.stopPropagation()}>
        <button className="edit-task__close" onClick={onClose}>&times;</button>
        <h2 className="edit-task__heading">Edit Task</h2>

        {error && <p className="edit-task__error">{error}</p>}

        <form className="edit-task__form">
          <div className="edit-task__form-field">
            <label className="edit-task__form-field--label">Title</label>
            <input
              type="text"
              value={task.title || ""}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Task title"
            />
          </div>

          <div className="edit-task__form-field">
            <label className="edit-task__form-field--label">Status</label>
            <select
              value={task.status || "pending"}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="edit-task__form-field">
            <label className="edit-task__form-field--label">Priority</label>
            <select
              value={task.priority || ""}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="" disabled hidden>Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="edit-task__form-field">
            <label className="edit-task__form-field--label">Deadline</label>
            <input
              type="datetime-local"
              value={formatForInput(task.deadline)}
              onChange={(e) => setTask({ ...task, deadline: e.target.value })}
            />
          </div>

          <div className="edit-task__form-field">
            <label className="edit-task__form-field--label">Description</label>
            <textarea
              value={task.description || ""}
              placeholder="Add details or notes"
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </div>
        </form>

        <div className="edit-task__actions">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleDelete}>Delete</button>
          <button type="button" onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;
