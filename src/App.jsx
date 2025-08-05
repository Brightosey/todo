import "./App.scss";
import TaskInput from "./Components/TaskInput/TaskInput";
import TaskItem from "./Components/TaskItem/TaskItem";
import Calendar from "./Components/Calendar/Calendar";
import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchTask = async() => {
    try {
      const response = await axios.get(`${backendUrl}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.log({message: "Error fetching task", error});
    }
  }

  useEffect(() => {
    fetchTask();
  },[]);

  return (
    <section className="app">
     {/*  <aside className="app__sidebar">
        <Calendar/>
      </aside> */}

      <section className="app__main">
        <TaskInput  fetchTask={fetchTask} />
        <TaskItem tasks={tasks} loading={loading} fetchTask={fetchTask} />
      </section>
    </section>
  );
}

export default App;
