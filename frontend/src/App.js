import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "./index.css";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fetchAllTasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:3000/addTask", { task: taskInput });
      setTaskInput("");
      fetchTasks(); // Fetch tasks again after adding a new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white-200">
  <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
    <div className="mb-4">
      <h1 className="text-black font-bold text-center text-4xl mb-4">
        Note App
      </h1>
      <div className="flex mt-2">
        <input
          className="shadow appearance-none border rounded w-full py-1 px-3 mr-4 text-grey-darker"
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={handleTaskInputChange}
        />
        <button
          className="flex items-center px-4 py-2 bg-[rgb(146,64,14)] text-white font-semibold rounded-lg hover:bg-[rgb(160,70,15)] focus:outline-none focus:ring-2 focus:ring-[rgb(146,64,14)]"
          onClick={handleAddTask}
        >
          Add Item
        </button>
      </div>

      <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 bg-white">
          <li className="font-bold mb-2 list-none">Notes</li>
          <hr className="my-2" />
        </div>
        <div>
          
        </div>
        <ul>
          {tasks.map((task, index) => (
            <div key={index}>
              <li className="mb-2">{task.task}</li>
              <hr className="my-2" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>

  );
}

export default App;
