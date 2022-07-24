import express  from 'express'
import storageController from '../controllers/storage.controller'
import { multerSingle } from '../utils/storage'

const router = express.Router()

router.get('/',    storageController.index)
router.get('/:id', storageController.show)
router.post('/',   multerSingle('file'), storageController.store)

export default { prefix: "storage", router }