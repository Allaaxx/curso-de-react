import { useEffect, useState } from "react";
import Task from "./components/Tasks";
import AddTask from "./components/AddTask";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // // useEffect(() => {
  // //   // eslint-disable-next-line no-unused-vars
  // //   async function fetchTasks() {
  // //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', 
  // //     {
  // //       method: 'GET',
  // //     }
  // //   ); 
  
  // //     const data = await response.json();

  // //     setTasks(data);
  // //   }
  //   // Chamar API retornando as tarefas
  //   // fetchTasks();
  // }, []);

  function onTaskClick(tasksId) {
    const newTasks = tasks.map((tasks) => {
      if (tasks.id === tasksId) {
        return {
          ...tasks,
          isCompleted: !tasks.isCompleted,
        };
      }
      return tasks;
    });
    setTasks(newTasks);
  }

  function onTaskDelete(tasksId) {
    const newTasks = tasks.filter((task) => task.id !== tasksId);
    setTasks(newTasks);
  }

  function onTaskAdd(title, description) {
    const newTasks = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTasks]);
  }
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onTaskAdd={onTaskAdd} />
        <Task
          tasks={tasks}
          onTaskClick={onTaskClick}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
