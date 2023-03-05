import { Router } from "express"
import ToDoListController from "../controllers/ToDoListController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", Authenticate.authenticate, ToDoListController.getToDoLists)
router.post("/", Authenticate.authenticate, ToDoListController.createToDoList)
router.get("/:id", Authenticate.authenticate, ToDoListController.getToDoList)

// TODO: check if the user is an admin or the user himself
router.put("/tasks/:id", Authenticate.authenticate, ToDoListController.updateToDoListTasks)
router.put("/:id", Authenticate.authenticate, ToDoListController.updateToDoList)
router.delete("/:id", Authenticate.authenticate, ToDoListController.deleteToDoList)

export default router