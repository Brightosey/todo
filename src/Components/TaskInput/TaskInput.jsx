import "./TaskInput.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function TaskInput({ fetchTask }) {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !priority || !status) {
      alert("please select a priority");
      return;
    }

    const newTask = {
      title: input,
      description,
      priority,
      status,
      deadline,
    };

    try {
      await axios.post(`${backendUrl}/api/tasks`, newTask);

      setInput("");
      setDescription("");
      setPriority("");

      fetchTask?.();

      setShowForm(false);
    } catch (error) {
      console.log({ message: "Failed to post task", error });
    }
  };

  return (
    <section className="task-input">
      {!showForm && (
        <div className="task-input__container">
          <h1 className="task-input__heading">Task</h1>
          <button
            className="task-input__open-btn"
            onClick={() => setShowForm(true)}
          >
            Add Task
          </button>
        </div>
      )}

      {showForm && (
        <>
          <div
            className="task-input__overlay"
            onClick={() => setShowForm(false)}
          ></div>

          <div className="task-input__modal">
            <button
              className="task-input__close"
              onClick={() => setShowForm(false)}
              aria-label="close"
            >
              &times;
            </button>
            <form className="task-input__form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Add a new Task"
                name="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="task-input__field task-input__field--title"
              />

              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                className="task-input__field task-input__field--description"
              />

              <div className="task-input__container">
                <div className="task-input__group">
                  <label htmlFor="status" className="task-input__label">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="task-input__select"
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="task-input__group">
                  <label htmlFor="status" className="task-input__label">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="task-input__select"
                  >
                    <option value="" disabled>
                      Select priority
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="task-input__group">
                  <label htmlFor="status" className="task-input__label">
                    Deadline:
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <button type="submit" className="task-input__button">
                Add
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  );
}

export default TaskInput;
