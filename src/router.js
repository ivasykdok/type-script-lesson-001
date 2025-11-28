import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(Layout, {}),
        children: [
            {
                path: "/users",
                element: _jsx(UsersPage, {}),
            },
            {
                path: "/users/create",
                element: _jsx(CreateUserPage, {}),
            },
            {
                path: "/users/:id",
                element: _jsx(UserDetailsPage, {}),
            },
            {
                path: "/tasks",
                element: _jsx(TasksPage, {}),
            },
            {
                path: "/tasks/create",
                element: _jsx(CreateTaskPage, {}),
            },
            {
                path: "/tasks/:id",
                element: _jsx(TaskDetailsPage, {}),
            },
        ],
    },
]);
export default router;
//# sourceMappingURL=router.js.map