import "./TaskInput.scss";
import { useState } from "react";

function TaskInput() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      title: input,
      description,
      priority,
      status: "pending",
    };

    setInput("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <section className="task-input">
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

        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="task-input__select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit" className="task-input__button">
          Add
        </button>
      </form>
    </section>
  );
}

export default TaskInput;
