import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/usersApi";
const UsersPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const getUsersData = async () => {
        try {
            const results = await userApi.fetchAllUsers();
            if (Array.isArray(results)) {
                setUsers(results);
            }
            else {
                console.log("getUsers returned an error object:", results);
            }
        }
        catch (error) {
            console.error(new Error(`Find user is error: ${error}`));
            return null;
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            await getUsersData();
        };
        fetchData();
    }, []);
    const userHandler = (id) => {
        navigate(`/users/${id}`);
    };
    return (_jsxs("div", { className: "users-list", children: [_jsx("h1", { children: "Users List" }), _jsx("ul", { children: users.map((user) => (_jsxs("li", { onClick: () => userHandler(user.id), children: [_jsxs("div", { className: "wrap", children: [user.firstName, " ", user.lastName] }), _jsx("div", { className: "mail", children: user.email })] }, user.id))) })] }));
};
export default UsersPage;
//# sourceMappingURL=UsersPage.js.map