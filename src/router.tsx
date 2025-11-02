import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Homepage from "./pages/Homepage.tsx";

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
        path: "/tasks",
        element: <div>Task List</div>,
      },
      {
        path: "/tasks/create",
        element: <div>Task Create</div>,
      },
      {
        path: "/tasks/:id",
        element: <div>One task</div>,
      },
    ],
  },
]);
export default router;
