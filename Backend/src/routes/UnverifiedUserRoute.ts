import { Router } from "express"
import UnverifiedUserController from "../controllers/UnverifiedUserController"

const router = Router()

router.get("/", UnverifiedUserController.getUnverifiedUsers)
router.post("/", UnverifiedUserController.createUnverifiedUser)
router.get("/:id", UnverifiedUserController.getUnverifiedUser)
router.post("/verify", UnverifiedUserController.verifyUnverifiedUser)
router.delete("/:id", UnverifiedUserController.deleteUnverifiedUser)

export default router