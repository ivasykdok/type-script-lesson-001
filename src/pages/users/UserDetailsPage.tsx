import { useNavigate, useParams } from "react-router-dom";
import { userApi } from "../../api/usersApi";
import { useEffect, useState } from "react";
import type { UserCreate } from "./types/User.tsx";
import UpdateUserInfo from "../../components/UpdateUserInfo";
import { Task } from "../../models/task.model";
import { taskApi } from "../../api/tasksApi";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [update, setUpdate] = useState<boolean>(false);
  const [user, setUser] = useState<UserCreate | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (id) {
      const findUserAndTasks = async () => {
        const userResult = await userApi.findUserById(id);

        if (userResult) {
          setUser(userResult);

          const allTasks: Task[] = await taskApi.fetchAllTasks();
          const userTasks = allTasks.filter(
            (task: Task) => task.userId === userResult.id,
          );

          setTasks(userTasks);
        }
      };

      findUserAndTasks();
    }
  }, [id, navigate]);

  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);

  const deleteUserHandler = async (id: string) => {
    try {
      await userApi.deleUserById(id);

      navigate(`/users`);
    } catch (error) {
      console.error(new Error(`Remove user is error: ${error}`));
      return null;
    }
  };

  const updateHandler = () => {
    setUpdate(!update);
  };

  const showAllTasksHandler = () => {
    navigate(`/tasks`);
  };

  const goToCreateTaskPageHandler = () => {
    navigate(`/tasks/create?userId=${id}`);
  };

  const goToTaskDetails = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="user-info">
        <div className="user-data">
          <h1>
            {user?.firstName} {user?.lastName}
          </h1>

          <div className="registered">
            <span>Registered:</span>
            <span>{new Date(user?.createdAt ?? "").toLocaleString()}</span>
          </div>

          <div className="last-updated">
            <span>Last updated:</span>
            <span>{new Date(user?.updatedAt ?? "").toLocaleString()}</span>
          </div>

          <div className="email">
            <span>Email:</span>
            <span>{user?.email}</span>
          </div>

          <div className="delete-box">
            <button className="update" onClick={() => updateHandler()}>
              UPDATE MY DATA
            </button>
            <button
              className="delete"
              onClick={() => user && deleteUserHandler(user?.id)}
            >
              DELETE USER
            </button>
          </div>
        </div>

        <div className="tasks-list">
          <div className="wrap">
            <h3>My Tasks</h3>

            <div className="task-wrapper">
              <div
                className="create-task"
                onClick={() => goToCreateTaskPageHandler()}
              >
                Create Task
              </div>

              <div className="all" onClick={() => showAllTasksHandler()}>
                Show All
              </div>
            </div>
          </div>

          {tasks.length > 0 ? (
            <ul className="tasks-list">
              {tasks.slice(0, 4).map((task: Task) => (
                <li
                  className="task-item"
                  onClick={() => goToTaskDetails(task.id)}
                  key={task.id}
                >
                  {task.title} - {task.id}
                </li>
              ))}

              {tasks.length > 4 && (
                <li className="more" onClick={() => showAllTasksHandler()}>
                  more
                </li>
              )}
            </ul>
          ) : (
            <div className="task-list-empty">Task list is empty</div>
          )}
        </div>
      </div>
      {update && user && (
        <UpdateUserInfo data={user} setUpdate={setUpdate} setUser={setUser} />
      )}
    </>
  );
};
export default UserDetailsPage;
