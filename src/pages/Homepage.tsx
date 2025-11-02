import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiController } from "../api/apiController.tsx";
import type { Task } from "../types.tsx";

const Homepage = () => {
  const navigate = useNavigate();
  const api = new ApiController();

  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await api.getAllTasks();

      setTaskList(tasks);
    };

    fetchTasks(); // <-- обов'язково викликаємо функцію
  }, []);

  const createTaskHandler = () => {
    navigate("/tasks/create");
  };

  return (
    <div className={"homepage"}>
      <div className="wrapper">
        <ul className="task_list">
          {taskList.length > 0 ? (
            taskList.map((task) => <li>{task.id}</li>)
          ) : (
            <li className={"empty"}>Task list is empty</li>
          )}
        </ul>

        <button onClick={createTaskHandler} className={"create-task"}>
          Create Task
        </button>
      </div>
    </div>
  );
};
export default Homepage;
