import { Router } from "express";
import { addEditUser, deleteUser, getSingleUser, getUsers } from "../controller/UserController.js";

const UserRouter = Router();
UserRouter.route("/add-edit-user").post(addEditUser)
UserRouter.route("/get").get(getUsers)
UserRouter.route("/get-user-by-id/:id").get(getSingleUser)
UserRouter.route("/delete").post(deleteUser)

export default UserRouter;