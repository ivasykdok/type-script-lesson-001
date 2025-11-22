import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Task } from "../types.tsx";
import api from "../api/apiService.tsx";


const Homepage = () => {
  const navigate = useNavigate();

  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await api.fetchAllTasks();

      setTaskList(tasks);
    };

    fetchTasks();
  }, []);

  const navigateHandler = (id: string) => {
    navigate(`/tasks/${id}`);
  };

  const createTaskHandler = () => {
    navigate("/tasks/create");
  };

  return (
    <div className={"homepage"}>
      <div className="wrapper">
        <ul className="task_list">
          {taskList.length > 0 ? (
            taskList.map((task) => {
              const date = new Date(task.createdAt).toLocaleDateString("uk-UA");
              const deadline = task.deadline
                ? new Date(task.deadline).toLocaleDateString("uk-UA")
                : "—";
              return (
                <li
                  key={task.id}
                  className={"item"}
                  onClick={() => navigateHandler(task.id)}
                >
                  <span>{date}</span>
                  <span>{task.title}</span>
                  <span>{task.description}</span>
                  <span>{deadline}</span>
                  <span>{task.taskStatus}</span>
                  <span>{task.priority}</span>
                </li>
              );
            })
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
