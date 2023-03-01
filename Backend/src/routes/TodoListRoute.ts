import { Router } from "express"
import ToDoListController from "../controllers/ToDoListController"

const router = Router()

router.get("/", ToDoListController.getToDoLists)
router.post("/", ToDoListController.createToDoList)
router.get("/:id", ToDoListController.getToDoList)
router.put("/:id", ToDoListController.updateToDoList)
router.delete("/:id", ToDoListController.deleteToDoList)

export default router