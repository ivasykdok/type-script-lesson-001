import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { children: _jsx(Outlet, {}) })] }));
};
export default Layout;
//# sourceMappingURL=Layout.js.map