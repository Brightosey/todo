import "./TaskItem.scss";
import Change from "../../assets/Icon/change.png";
import Trash from "../../assets/Icon/trash.png";
import { useState } from "react";

function TaskItem() {
  const [tasks, setTasks] = useState({});
  const [isDelete, setIsDelete] = useState(false);

  const createTask = () => {
    setTasks({
      id: Date.now(),
      title: "Sample Task",
      description: "Sample description",
      priority: "medium",
      status: "pending",
    });
  };

  const toggleStatus = (id) => {
    setTasks((prev) => ({
      ...prev,
      status:
        prev.status === "pending"
          ? "in-progress"
          : prev.status === "in-progress"
          ? "completed"
          : "pending",
    }));
  };

  const deleteTask = () => {
    setIsDelete(true);
  };

  if (isDelete) return null;

  return (
    <ul>
      {tasks.title && (
        <li className="task-item">
          <div className="task-item__header">
            <p className="task-item__title">{tasks.title}</p>
            <p
              className={`task-item__status task-item__status--${tasks.status}`}
            >
              {tasks.status}
            </p>
            <p
              className={`task-item__priority task-item__priority--${tasks.priority}`}
            >
              {tasks.priority}
            </p>
          </div>

          <div className="task-item__description">
            <p>{tasks.description}</p>
          </div>

          <div className="task-item__actions">
            <button
              className="task-item__button task-item__button--change"
              onClick={toggleStatus}
            >
              Change Status <img src={Change} alt="change" />
            </button>
            <button
              className="task-item__button task-item__button--delete"
              onClick={deleteTask}
            >
              <img src={Trash} alt="trash" />
            </button>
          </div>
        </li>
      )};
    </ul>
  );
}

export default TaskItem;
