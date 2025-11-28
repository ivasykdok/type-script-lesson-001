import { Router } from "express";
import { createUser, deleteUser, findUserById, getUsers, updateUser, } from "../controller/user.controller";
const router = Router();
router.use((req, res, next) => {
    console.log(`Users route middleware: ${req.method} ${req.url}`);
    next();
});
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", findUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
export default router;
//# sourceMappingURL=user.routes.js.map