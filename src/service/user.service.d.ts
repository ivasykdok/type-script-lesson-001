import { User, UserCreationAttributes } from "../models/user.model";
interface Filters {
    active?: boolean;
    lastLoginAt?: Date;
}
export declare const getAllUsers: (filters?: Filters) => Promise<User[]>;
export declare const addUser: (data: UserCreationAttributes) => Promise<User>;
export declare const fetchUserById: (id: number) => Promise<User | null>;
export declare const deleteUserData: (id: number) => Promise<true | null>;
export declare const updateUserData: (id: number, userData: Partial<User>) => Promise<User>;
export {};
//# sourceMappingURL=user.service.d.ts.map