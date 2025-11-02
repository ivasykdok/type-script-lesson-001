import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiController } from "../api/apiController.tsx";
import type { Task } from "../types.tsx";

const Task = () => {
  const api = new ApiController();

  const { id } = useParams<{ id: string }>();

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const findTask = async () => {
        const result = await api.findTaskById(id);

        if (result) {
          setTask(result);
        }
      };

      findTask();
    }
  }, [id]);



  return (
    <div className="my-task">
      <nav>
        <Link className="go-home" to="/">
          Home
        </Link>
      </nav>

      {!task ? (
        <div className="empty">This task is not found!</div>
      ) : (
        (() => {
          const date = new Date(task.createdAt).toLocaleDateString("uk-UA");
          const deadline = task.deadline
            ? new Date(task.deadline).toLocaleDateString("uk-UA")
            : "—";

          return (
            <div className="content">
              <div className="headding">
                <h2 className="title">Title: {task.title}</h2>

                <div className="date">
                  <div className="created">Created: {date}</div>
                  <div className="deadline">Deadline: {deadline}</div>
                </div>
              </div>

              <div className="description">
                <div>Description:</div>
                {task.description}
              </div>

              <button className={'remove'}>Remove</button>
            </div>
          );
        })()
      )}
    </div>
  );
};
export default Task;
