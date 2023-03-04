import { Router } from 'express'
import TagController from '../controllers/TagController'

const router = Router()

router.post('/', TagController.createTag)
router.get('/', TagController.getTags)
router.get('/:Name', TagController.getTag)
router.put('/:Name', TagController.updateTag)
router.delete('/:Name', TagController.deleteTag)

export default router