import { Router } from "express"
import BlogController from "../controllers/BlogController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", Authenticate.authenticate, BlogController.getBlogs)
router.post("/", Authenticate.authenticate, BlogController.createBlog)
router.get("/:id", Authenticate.authenticate, BlogController.getBlog)
router.put("/:id", Authenticate.authenticate, BlogController.updateBlog)
router.delete("/:id", Authenticate.authenticate, BlogController.deleteBlog)

export default router