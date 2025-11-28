import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import { userApi } from "../../api/usersApi";
import { useEffect, useState } from "react";
import UpdateUserInfo from "../../components/UpdateUserInfo";
import { taskApi } from "../../api/tasksApi";
const UserDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        if (id) {
            const findUserAndTasks = async () => {
                const userResult = await userApi.findUserById(id);
                if (userResult) {
                    setUser(userResult);
                    const allTasks = await taskApi.fetchAllTasks();
                    const userTasks = allTasks.filter((task) => task.userId === userResult.id);
                    setTasks(userTasks);
                }
            };
            findUserAndTasks();
        }
    }, [id, navigate]);
    useEffect(() => {
        console.log("tasks", tasks);
    }, [tasks]);
    const deleteUserHandler = async (id) => {
        try {
            await userApi.deleUserById(id);
            navigate(`/users`);
        }
        catch (error) {
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
    const goToTaskDetails = (taskId) => {
        navigate(`/tasks/${taskId}`);
    };
    if (!user) {
        return _jsx("div", { className: "loading", children: "Loading..." });
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "user-info", children: [_jsxs("div", { className: "user-data", children: [_jsxs("h1", { children: [user?.firstName, " ", user?.lastName] }), _jsxs("div", { className: "registered", children: [_jsx("span", { children: "Registered:" }), _jsx("span", { children: new Date(user?.createdAt ?? "").toLocaleString() })] }), _jsxs("div", { className: "last-updated", children: [_jsx("span", { children: "Last updated:" }), _jsx("span", { children: new Date(user?.updatedAt ?? "").toLocaleString() })] }), _jsxs("div", { className: "email", children: [_jsx("span", { children: "Email:" }), _jsx("span", { children: user?.email })] }), _jsxs("div", { className: "delete-box", children: [_jsx("button", { className: "update", onClick: () => updateHandler(), children: "UPDATE MY DATA" }), _jsx("button", { className: "delete", onClick: () => user && deleteUserHandler(user?.id), children: "DELETE USER" })] })] }), _jsxs("div", { className: "tasks-list", children: [_jsxs("div", { className: "wrap", children: [_jsx("h3", { children: "My Tasks" }), _jsxs("div", { className: "task-wrapper", children: [_jsx("div", { className: "create-task", onClick: () => goToCreateTaskPageHandler(), children: "Create Task" }), _jsx("div", { className: "all", onClick: () => showAllTasksHandler(), children: "Show All" })] })] }), tasks.length > 0 ? (_jsxs("ul", { className: "tasks-list", children: [tasks.slice(0, 4).map((task) => (_jsxs("li", { className: "task-item", onClick: () => goToTaskDetails(task.id), children: [task.title, " - ", task.id] }, task.id))), tasks.length > 4 && (_jsx("li", { className: "more", onClick: () => showAllTasksHandler(), children: "more" }))] })) : (_jsx("div", { className: "task-list-empty", children: "Task list is empty" }))] })] }), update && user && (_jsx(UpdateUserInfo, { data: user, setUpdate: setUpdate, setUser: setUser }))] }));
};
export default UserDetailsPage;
//# sourceMappingURL=UserDetailsPage.js.map