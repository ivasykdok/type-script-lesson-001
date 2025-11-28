import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { userCreateSchema, } from "../pages/users/types/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userApi } from "../api/usersApi";
const UpdateUserInfo = ({ data, setUpdate, setUser }) => {
    const id = data.id;
    const { register, reset, handleSubmit, formState: { isValid, errors }, } = useForm({
        mode: "onTouched",
        resolver: zodResolver(userCreateSchema),
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        },
    });
    const onSubmit = async (formData) => {
        try {
            const payload = {
                ...formData,
                createdAt: data.createdAt,
                updatedAt: new Date().toISOString(),
            };
            const updatedUser = await userApi.updateUserInfo(id, payload);
            if (updatedUser) {
                reset(updatedUser);
                setUpdate(false);
                setUser(updatedUser);
            }
        }
        catch (error) {
            console.error("Failed to update user:", error);
        }
    };
    const closeUpdateHandler = () => {
        setUpdate(false);
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Update User Info" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx("div", { className: "close", onClick: () => closeUpdateHandler(), children: "X" }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "firstName", children: "First name:" }), _jsx("input", { id: "firstName", type: "text", ...register("firstName") }), errors.firstName && (_jsx("div", { className: "error", children: errors.firstName.message }))] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "lastName", children: "Last name:" }), _jsx("input", { id: "lastName", type: "text", ...register("lastName") }), errors.lastName && (_jsx("div", { className: "error", children: errors.lastName.message }))] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "email", children: "Email:" }), _jsx("input", { id: "email", type: "email", ...register("email") }), errors.email && _jsx("div", { className: "error", children: errors.email.message })] }), _jsx("button", { type: "submit", disabled: !isValid, children: "Save" })] })] }));
};
export default UpdateUserInfo;
//# sourceMappingURL=UpdateTaskInfo.js.map