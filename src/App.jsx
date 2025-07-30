import "./App.scss";
import TaskInput from "./Components/TaskInput/TaskInput";
import TaskItem from "./Components/TaskItem/TaskItem";
import Calendar from "./Components/Calendar/Calendar";


function App() {
  return (
    <section className="app">
      <aside className="app__sidebar">
        <Calendar />
      </aside>

      <section className="app__main">
        <TaskInput />
        <TaskItem />
      </section>
    </section>
  );
}

export default App;
