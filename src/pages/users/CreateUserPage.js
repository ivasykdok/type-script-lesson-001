import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCreateSchema } from "./types/User";
import { useNavigate } from "react-router-dom";
import { userApi } from '../../api/usersApi';
const CreateUserPage = () => {
    const navigate = useNavigate();
    const { register, reset, handleSubmit, formState: { isValid, errors }, } = useForm({
        mode: "onTouched",
        resolver: zodResolver(userCreateSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
    });
    const onSubmit = async (data) => {
        const payload = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        const newUser = await userApi.createUserData(payload);
        console.log("%c newUser ", "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;", newUser);
        if (newUser) {
            reset();
            navigate("/users");
        }
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "Create User" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx("h2", { children: "User Data" }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "firstName", children: "First name:" }), _jsx("input", { id: "firstName", type: "text", ...register("firstName") }), errors.firstName && (_jsx("div", { className: "error", children: errors.firstName.message }))] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "lastName", children: "Last name:" }), _jsx("input", { id: "lastName", type: "text", ...register("lastName") }), errors.lastName && (_jsx("div", { className: "error", children: errors.lastName.message }))] }), _jsxs("div", { className: "form-item-wrap", children: [_jsx("label", { htmlFor: "email", children: "Email:" }), _jsx("input", { id: "email", type: "email", ...register("email") }), errors.email && _jsx("div", { className: "error", children: errors.email.message })] }), _jsx("button", { type: "submit", disabled: !isValid, children: "Save" })] })] }));
};
export default CreateUserPage;
//# sourceMappingURL=CreateUserPage.js.map