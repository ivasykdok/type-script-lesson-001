import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import CreateTask from "./tasks/CreateTask.tsx";
import Task from "./components/Task.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/tasks/create",
        element: <CreateTask />,
      },
      {
        path: "/tasks/:id",
        element: <Task />,
      },
    ],
  },
]);
export default router;
