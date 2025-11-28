import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskApi } from "../../api/tasksApi";
import { userApi } from "../../api/usersApi";
import UpdateUserInfo from "../../components/UpdateUserInfo";
const TaskDetailsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [task, setTasks] = useState(null);
    const [update, setUpdate] = useState(false);
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
    const goBackHandler = (userId) => {
        navigate(`/users/${userId}`);
    };
    const deleteTaskHandler = async () => {
        if (!task)
            return;
        try {
            await taskApi.deleteTaskById(task.id);
            navigate(`/users/${task.userId}`);
        }
        catch (error) {
            console.error(new Error(`Remove task error: ${error}`));
        }
    };
    const updateTaskHandler = () => {
        setUpdate(true);
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "user", children: user && (_jsxs(_Fragment, { children: [_jsx("div", { className: "back", onClick: () => goBackHandler(user.id), children: "Back" }), _jsxs("h1", { children: [user.firstName, " ", user.lastName] })] })) }), task && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "task-details-buttons", children: [_jsx("button", { className: "update", onClick: updateTaskHandler, children: "Update Task" }), _jsx("button", { className: "delete", onClick: deleteTaskHandler, children: "Delete Task" })] }), _jsxs("div", { className: "task-details", children: [_jsx("span", { children: task.title }), _jsx("span", { children: task.description }), _jsxs("span", { style: { display: "flex", justifyContent: "flex-end" }, children: [_jsx("span", { children: "Created: " }), _jsx("span", { children: new Date(task.createdAt).toLocaleString("uk-UA") })] })] })] })), update && user && (_jsx(UpdateUserInfo, { data: user, setUpdate: setUpdate, setUser: setUser }))] }));
};
export default TaskDetailsPage;
//# sourceMappingURL=TaskDetailsPage.js.map