import "./App.scss";
import Header from "./Components/Header/Header";
import TaskInput from "./Components/TaskInput/TaskInput";
import TaskItem from "./Components/TaskItem/TaskItem";
import Filter from "./Components/Filter/Filter";
import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tasks`);
      console.log("Fetched tasks:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.log({ message: "Error fetching task", error });
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <section className="app">
      <section className="app__main">
        <Header />
        <TaskInput fetchTask={fetchTask} />
        <Filter tasks={tasks} loading={loading} fetchTask={fetchTask} />
        {/* <TaskInput fetchTask={fetchTask} /> */}
        <div className="app__item">
          {/* <TaskItem tasks={tasks} loading={loading} fetchTask={fetchTask} /> */}
        </div>
      </section>
    </section>
  );
}

export default App;
