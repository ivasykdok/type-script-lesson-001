import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskApi } from "../../api/tasksApi";
import { TaskCreate } from "./types/Task";
import { UserCreate } from "../users/types/User";
import { userApi } from "../../api/usersApi";
import UpdateUserInfo from "../../components/UpdateUserInfo";

const TaskDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserCreate | null>(null);
  const [task, setTasks] = useState<TaskCreate | null>(null);
  const [update, setUpdate] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const findUserAndTasks = async () => {
        const taskResult = await taskApi.findTaskById(id);

        if (taskResult) {
          setTasks(taskResult);
          const user = await userApi.findUserById(taskResult.userId);
          setUser(user);
        }
      };

      findUserAndTasks();
    }
  }, [id]);

  const goBackHandler = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const deleteTaskHandler = async () => {
    if (!task) return;

    try {
      await taskApi.deleteTaskById(task.id);
      navigate(`/users/${task.userId}`);
    } catch (error) {
      console.error(new Error(`Remove task error: ${error}`));
    }
  };

  const updateTaskHandler = () => {
    setUpdate(true);
  };

  return (
    <div>
      <div className="user">
        {user && (
          <>
            <div className="back" onClick={() => goBackHandler(user.id)}>
              Back
            </div>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
          </>
        )}
      </div>

      {task && (
        <>
          <div className="task-details-buttons">
            <button className="update" onClick={updateTaskHandler}>
              Update Task
            </button>
            <button className="delete" onClick={deleteTaskHandler}>
              Delete Task
            </button>
          </div>
          <div className="task-details">
            <span>{task.title}</span>
            <span>{task.description}</span>
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              <span>Created: </span>
              <span>{new Date(task.createdAt).toLocaleString("uk-UA")}</span>
            </span>
          </div>
        </>
      )}

      {update && user && (
        <UpdateUserInfo data={user} setUpdate={setUpdate} setUser={setUser} />
      )}
    </div>
  );
};
export default TaskDetailsPage;
