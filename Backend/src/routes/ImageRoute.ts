import { Router } from "express"
import ImageController from "../controllers/ImageController"
import {ImageUpload} from "../middlewares/ImageUploader";
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.post("/", Authenticate.authenticate, ImageUpload.single("Thumb-nail"), ImageController.uploadImage)
export default router