import { addUser, getAllUsers, fetchUserById, updateUserData, } from "../service/user.service";
import { User } from "../models/user.model";
// GET /users
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers(req.query);
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// PUT /users/:id
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await updateUserData(numericId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// GET /users/:id
export const findUserById = async (req, res) => {
    try {
        const numericId = Number(req.params.id);
        if (isNaN(numericId)) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await fetchUserById(numericId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// POST /users
export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUser = await addUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// DELETE /users/:id
export const deleteUser = async (req, res) => {
    try {
        const numericId = Number(req.params.id);
        if (isNaN(numericId)) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await User.findByPk(numericId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).json({
            message: "User successfully deleted",
            result: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=user.controller.js.map