import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users.tsx";
import CreateUser from "./pages/CreateUser.tsx";
import UserDetails from "./pages/UserDatails.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
      {
        path: "/users/:id",
        element: <UserDetails />,
      },
    ],
  },
]);

export default router;
