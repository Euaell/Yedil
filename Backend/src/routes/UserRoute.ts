import { Router } from "express"
import UserController from "../controllers/UserController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", UserController.getUsers)
router.post("/", UserController.createUser)

router.post("/login", UserController.loginUser)
router.get("/logout", Authenticate.authenticate, UserController.logoutUser)
router.get("/verifyuser", Authenticate.authenticate, UserController.verifyUser)

router.get("/:id", UserController.getUser)

// TODO: check if the user is an admin or the user himself
router.put("/:id", UserController.updateUser)

// TODO: add a separate authorization middleware,
// 		 which will check if the user is an admin or the user himself
router.delete("/:id", Authenticate.authenticate, UserController.deleteUser)

export default router