import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import UsersPage from "./pages/users/UsersPage";
import CreateUserPage from "./pages/users/CreateUserPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import CreateTaskPage from "./pages/tasks/CreateTaskPage";
import TaskDetailsPage from "./pages/tasks/TaskDetailsPage";
import TasksPage from "./pages/tasks/TasksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/create",
        element: <CreateUserPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetailsPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/tasks/create",
        element: <CreateTaskPage />,
      },
      {
        path: "/tasks/:id",
        element: <TaskDetailsPage />,
      },
    ],
  },
]);
export default router;
