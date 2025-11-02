import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {
  const navigate = useNavigate();

  const createTaskHandler = () => {
    navigate("/tasks/create");
  };

  return (
    <div className={"homepage"}>
      <div className="wrapper">
        <ul className="task_list">
          <li className="item">Task 1</li>
          <li className="item"> Task 2</li>
          <li className="item">Task 3</li>
          <li className="item">Task 4</li>
          <li className="item">Task 5</li>
        </ul>

        <button onClick={createTaskHandler} className={"create-task"}>
          Create Task
        </button>
      </div>
    </div>
  );
};
export default Homepage;
