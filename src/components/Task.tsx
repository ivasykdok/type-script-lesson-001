import { Link, useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <nav>
        <Link className={"go-home"} to={"/"}>
          Home
        </Link>
      </nav>

      <div className={"content"}>
        <h2>{id}</h2>
      </div>
    </div>
  );
};
export default Task;
