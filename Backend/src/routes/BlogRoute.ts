import { Router } from "express"
import BlogController from "../controllers/BlogController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", BlogController.getBlogs)
router.get("/myBlogs", Authenticate.authenticate, BlogController.getBlogsByUser)
router.post("/", Authenticate.authenticate, BlogController.createBlog)
router.get("/:id", Authenticate.authenticate, BlogController.getBlog)
router.put("/:id", Authenticate.authenticate, BlogController.updateBlog)
router.delete("/:id", Authenticate.authenticate, BlogController.deleteBlog)

export default router