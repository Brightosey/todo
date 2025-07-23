import "./TaskInput.scss";
import { useState } from "react";

function TaskInput() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput("");
  };

  return (
    <section className="task-input">
      <form className="task-input__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new task"
          name="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="task-input__field"
        />
        <button type="submit" className="task-input__button">
          Add
        </button>
      </form>
    </section>
  );
}

export default TaskInput;
