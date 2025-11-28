import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Header = () => {
    return (_jsx("header", { children: _jsxs("nav", { children: [_jsx(Link, { to: "/users", children: "Users List" }), _jsx(Link, { to: "/users/create", children: "Create User" })] }) }));
};
export default Header;
//# sourceMappingURL=Header.js.map