import { UserCreate, UserCreateData } from "../pages/users/types/User";
declare class UsersApi {
    private apiUrl;
    constructor(apiUrl?: string);
    findUserById: (id: string) => Promise<UserCreate | null>;
    fetchAllUsers: () => Promise<UserCreate[]>;
    updateUserInfo: (id: string, userData: UserCreateData) => Promise<UserCreate | null>;
    createUserData: (userData: UserCreateData) => Promise<UserCreate | null>;
    deleUserById: (id: string) => Promise<boolean>;
}
export declare const userApi: UsersApi;
export {};
//# sourceMappingURL=usersApi.d.ts.map