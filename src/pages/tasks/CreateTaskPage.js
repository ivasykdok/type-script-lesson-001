import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { priorities, statuses, taskCreateSchema, } from "./types/Task";
import { taskApi } from "../../api/tasksApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
const CreateTaskPage = () => {
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("todo");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    if (!userId)
        throw new Error("userId is required in query params");
    const { register, reset, handleSubmit, formState: { isValid, errors }, } = useForm({
        mode: "onTouched",
        resolver: zodResolver(taskCreateSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });
    const onSubmit = async (data) => {
        const payload = {
            ...data,
            userId,
            priority,
            status,
            deadline: data.deadline && data.deadline.trim() !== ""
                ? new Date(data.deadline + ":00").toISOString()
                : undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const newTask = await taskApi.createTaskData(payload);
        if (newTask) {
            reset();
            navigate(`/users/${userId}`);
        }
    };
    return (_jsx("div", { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx("h1", { children: "Create Task" }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "title", children: "Title:" }), _jsx("input", { id: "title", type: "text", ...register("title") }), errors.title && _jsx("div", { className: "error", children: errors.title.message })] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "description", children: "Description:" }), _jsx("textarea", { id: "description", ...register("description") }), errors.description && (_jsx("div", { className: "error", children: errors.description.message }))] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "priority", children: "Priority:" }), _jsx("select", { id: "priority", value: priority, onChange: (e) => setPriority(e.target.value), children: priorities.map((priority) => (_jsx("option", { value: priority, children: priority }, priority))) })] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "status", children: "Status:" }), _jsx("select", { id: "status", value: status, onChange: (e) => setStatus(e.target.value), children: statuses.map((status) => (_jsx("option", { value: status, children: status }, status))) })] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "deadline", children: "Deadline:" }), _jsx("input", { id: "deadline", type: "datetime-local", ...register("deadline") }), errors.deadline && (_jsx("div", { className: "error", children: errors.deadline.message }))] }), _jsx("button", { type: "submit", disabled: !isValid, children: "Save" })] }) }));
};
export default CreateTaskPage;
//# sourceMappingURL=CreateTaskPage.js.map