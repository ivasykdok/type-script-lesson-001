import { UserCreate } from "../pages/users/types/User";
import React from "react";
type UpdateUserInfoProps = {
    data: UserCreate;
    setUpdate: (value: boolean) => void;
    setUser: React.Dispatch<React.SetStateAction<UserCreate | null>>;
};
declare const UpdateUserInfo: ({ data, setUpdate, setUser }: UpdateUserInfoProps) => import("react/jsx-runtime").JSX.Element;
export default UpdateUserInfo;
//# sourceMappingURL=UpdateUserInfo.d.ts.map