import { Router } from "express"
import UserController from "../controllers/User"

const router = Router()

router.get("/", UserController.getUsers)
router.get("/:id", UserController.getUser)

export default router