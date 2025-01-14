import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './index.css';
import Header from './components/Header';
import Task from './components/Tasks';
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json()
    return (data);
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()
    return (data);
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);


  //add a new task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json();
    setTasks([...tasks, data]);



    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask])
  };



  // delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id))
  };

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header setShowAddTask={setShowAddTask} showAddTask={showAddTask} />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (<Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : (<p>No Tasks left</p>)}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
