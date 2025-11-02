import { Link } from "react-router-dom";

const Task = () => {
  return (
    <div>
      <nav>
        <Link className={"go-home"} to={"/"}>
          Home
        </Link>
      </nav>

      <div className="h2"></div>
    </div>
  );
};
export default Task;
