import "./Filter.scss";
import { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";

function Filter({ tasks }) {
  const [filter, setFilter] = useState("all");

  const categories = ["all", "pending", "in-progress", "completed"];

  const filterTask =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <section className="filter">
      <div className="filter__tabs">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`filter__tab ${
              filter === category ? "filter__tab--active" : ""
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="filter__tasks">
        {filterTask.length === 0 ? (
          <p className="filter__empty">No Task Found.</p>
        ) : (
         <TaskItem tasks={filterTask} />
        )}
      </div>
    </section>
  );
}

export default Filter;
