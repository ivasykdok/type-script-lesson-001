import AppError from "../error";
class UsersApi {
    apiUrl;
    constructor(apiUrl = "http://localhost:3000/users") {
        this.apiUrl = apiUrl;
    }
    findUserById = async (id) => {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`User with id ${id} not found (status: ${response.status})`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(new Error(`Find user is error: ${error}`));
            return null;
        }
    };
    fetchAllUsers = async () => {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        }
        catch (error) {
            console.error("Error getUsersData:", error);
            return [];
        }
    };
    updateUserInfo = async (id, userData) => {
        try {
            const user = await this.findUserById(id);
            if (!user) {
                console.warn(`User with id ${id} not found`);
                return null;
            }
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error(`Failed to update user with id ${id} (status: ${response.status})`);
            }
            const updatedUser = await response.json();
            return updatedUser;
        }
        catch (error) {
            console.error(`Update user error:`, error);
            return null;
        }
    };
    createUserData = async (userData) => {
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };
    deleUserById = async (id) => {
        try {
            const user = await this.findUserById(id);
            if (!user) {
                throw new AppError("User not found", 404);
            }
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user with id ${id} (status: ${response.status})`);
            }
            return true;
        }
        catch (error) {
            console.error(new Error(`Created task is error: ${error}`));
            return false;
        }
    };
}
export const userApi = new UsersApi();
//# sourceMappingURL=usersApi.js.map